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

  formatMovieData(movieServerData) {
    return {
      name: movieServerData.title,
      date: movieServerData.release_date,
      genres: this.genres ? movieServerData.genre_ids.map((id) => this.genres.find((genre) => id === genre.id)) : [],
      description: movieServerData.overview,
      img: movieServerData.backdrop_path,
    };
  }

  componentDidMount() {
    const api = new MoviesApiService();
    api.getGenres().then((genres) => {
      this.genres = genres;

      api.getMoviesByKeyword(this.movieKeyword).then((movies) => {
        const cards = movies.map((movie) => (
          <li key={movie.id}>
            <Card {...this.formatMovieData(movie)} />
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
