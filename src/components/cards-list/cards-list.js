import React, { Component } from 'react';

import Card from '../card/card';
import Error from '../error/error';
import './cards-list.scss';
import { MoviesApiService } from '../../services/MoviesApiService';

export default class CardsList extends Component {
  state = {
    cards: null,
    loading: true,
    error: false,
  };
  genres;
  api = new MoviesApiService();

  onError() {
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
      .then((movies) => {
        const cards = movies.map((movie) => (
          <li key={movie.id}>
            <Card {...movie} genres={this.genres} loading={this.state.loading} error={this.state.error} />
          </li>
        ));
        this.setState({ cards, loading: false });
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
    const content = <ul className="cards-list">{this.state.cards}</ul>;
    return this.state.error ? errorBox : content;
  }
}
