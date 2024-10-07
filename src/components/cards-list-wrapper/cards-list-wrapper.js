import React, { Component } from 'react';

import Error from '../error/error';
import CardsList from '../cards-list/cards-list';
import { MoviesApiService } from '../../services/MoviesApiService';

export default class CardsListWrapper extends Component {
  state = {
    movies: [],
    loading: true,
    error: false,
  };
  genres;
  api = new MoviesApiService();

  onError(err) {
    console.log(err);
    this.setState({ error: true, loading: false });
  }

  componentDidMount() {
    this.api
      .getGenres()
      .then((genres) => {
        this.genres = genres;

        this.updateMoviesList();
      })
      .catch(this.onError.bind(this));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchValue === this.props.searchValue) return;
    this.updateMoviesList();
  }

  updateMoviesList() {
    this.api
      .getMoviesByKeyword(this.props.searchValue)
      .then((response) => {
        this.setState({ movies: response.movies, loading: false });
      })
      .catch(this.onError.bind(this));
  }
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
      <CardsList
        movies={this.state.movies}
        genres={this.genres}
        loading={this.state.loading}
        searchValue={this.props.searchValue}
      />
    );

    return this.state.error ? errorBox : content;
  }
}
