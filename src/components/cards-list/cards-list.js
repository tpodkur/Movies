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
  movieKeyword = 'return';
  genres;

  onError() {
    this.setState({ error: true, loading: false });
  }

  componentDidMount() {
    const api = new MoviesApiService();
    api
      .getGenres()
      .then((genres) => {
        this.genres = genres;

        api
          .getMoviesByKeyword(this.movieKeyword)
          .then((movies) => {
            const cards = movies.map((movie) => (
              <li key={movie.id}>
                <Card {...movie} genres={this.genres} loading={this.state.loading} error={this.state.error} />
              </li>
            ));
            this.setState({ cards, loading: false });
          })
          .catch(this.onError.bind(this));
      })
      .catch(this.onError.bind(this));
  }

  render() {
    const errorBox = (
      <div className="cards-error">
        <Error
          message="Something went wrong :("
          description="No movies were found for your search. Please try again later or make sure you entered the correct query."
        />
      </div>
    );
    const content = <ul className="cards-list">{this.state.cards}</ul>;
    return this.state.error ? errorBox : content;
  }
}
