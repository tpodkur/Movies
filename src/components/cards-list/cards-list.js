import React, { Component } from 'react';

import Card from '../card/card';
import './cards-list.scss';
import { MoviesApiService } from '../../services/MoviesApiService';

export default class CardsList extends Component {
  state = {
    cards: null,
  };
  movieKeyword = 'return';
  genres;

  componentDidMount() {
    const api = new MoviesApiService();
    api.getGenres().then((genres) => {
      this.genres = genres;

      api.getMoviesByKeyword(this.movieKeyword).then((movies) => {
        const cards = movies.map((movie) => (
          <li key={movie.id}>
            <Card {...movie} genres={this.genres} />
          </li>
        ));
        this.setState({ cards });
      });
    });
  }

  render() {
    return <ul className="cards-list">{this.state.cards}</ul>;
  }
}
