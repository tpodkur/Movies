import React, { Component } from 'react';

import Card from '../card/card';
import './cards-list.scss';
import { MoviesApiService } from '../../services/MoviesApiService';

export default class CardsList extends Component {
  state = {
    cards: null,
  };

  componentDidMount() {
    const api = new MoviesApiService();
    api.getMoviesByKeyword('return').then((movies) => {
      const cards = movies.map((movie) => (
        <li key={movie.id}>
          <Card
            name={movie.title}
            date={movie.release_date}
            genres={movie.genre_ids}
            description={movie.overview}
            imgSrc={movie.backdrop_path}
          />
        </li>
      ));
      this.setState({ cards });
    });
  }

  render() {
    return <ul className="cards-list">{this.state.cards}</ul>;
  }
}
