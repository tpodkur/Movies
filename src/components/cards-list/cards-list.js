import React, { Component } from 'react';

import Card from '../card/card';
import './cards-list.scss';
import { MoviesApiService } from '../../services/MoviesApiService';

export default class CardsList extends Component {
  state = {
    cards: null,
  };
  movieKeyword = 'return';

  formatMovieData(movieServerData) {
    return {
      name: movieServerData.title,
      date: movieServerData.release_date,
      genres: movieServerData.genre_ids,
      description: movieServerData.overview,
      img: movieServerData.backdrop_path,
    };
  }

  componentDidMount() {
    const api = new MoviesApiService();
    api.getMoviesByKeyword(this.movieKeyword).then((movies) => {
      const cards = movies.map((movie) => (
        <li key={movie.id}>
          <Card {...this.formatMovieData(movie)} />
        </li>
      ));
      this.setState({ cards });
    });
  }

  render() {
    return <ul className="cards-list">{this.state.cards}</ul>;
  }
}
