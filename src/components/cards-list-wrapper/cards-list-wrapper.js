import React, { Component } from 'react';
import './cards-list-wrapper.scss';

import Error from '../error/error';
import CardsList from '../cards-list/cards-list';
import { MoviesApiService } from '../../services/MoviesApiService';
import Pagination from '../pagination/pagination';

export default class CardsListWrapper extends Component {
  state = {
    movies: [],
    totalMovies: 0,
    page: 1,
    totalPages: 1,
    loading: true,
    error: false,
  };
  api = new MoviesApiService();

  onError(err) {
    console.log(err);
    this.setState({ error: true, loading: false });
  }

  componentDidMount() {
    if (this.props.searchValue.length) {
      this.updateMoviesList(this.props.searchValue, this.state.page);
    } else {
      this.getTopMoviesList(this.state.page);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.updateMoviesList(this.props.searchValue, this.state.page);
    } else if (prevProps.searchValue !== this.props.searchValue) {
      this.updateMoviesList(this.props.searchValue, 1);
    }
  }

  getTopMoviesList(page) {
    this.props.api
      .getTopMovies(page)
      .then((res) => this.updateMovies(res))
      .catch(this.onError.bind(this));
  }

  updateMoviesList(searchValue, page) {
    this.props.api
      .getMoviesByKeyword(searchValue, page)
      .then((res) => this.updateMovies(res))
      .catch(this.onError.bind(this));
  }

  updateMovies({ movies, totalMovies, page, totalPages }) {
    this.fillMoviesRating(movies);
    this.setState({
      movies,
      totalMovies,
      page,
      totalPages,
      loading: false,
    });
  }

  fillMoviesRating(movies) {
    const ids = movies.map((movie) => movie.id);
    const ratedMovies = JSON.parse(localStorage.ratedMovies);
    for (let ratedMovie of ratedMovies) {
      const index = ids.indexOf(ratedMovie.id);
      if (movies[index]) {
        movies[index].rating = ratedMovie.rating;
      }
    }
  }

  onPageChange = (page) => {
    this.setState({ page });
  };

  render() {
    const errorBox = (
      <div className="cards-error">
        <Error
          message="Something went wrong :("
          description="Please try again later or make sure you entered the correct query."
        />
      </div>
    );

    const content = (
      <div className="cards-list-wrapper">
        <CardsList movies={this.state.movies} loading={this.state.loading} searchValue={this.props.searchValue} />
        <div className="cards-list-wrapper__pagination">
          <Pagination
            page={this.state.page}
            totalItemsCount={this.state.totalMovies}
            onPageChange={this.onPageChange}
          />
        </div>
      </div>
    );

    return this.state.error ? errorBox : content;
  }
}
