import React, { Component } from 'react';

import Card from '../card/card';
import './cards-list.scss';

export default class CardsList extends Component {
  render() {
    const { movies, genres, loading, searchValue } = this.props;

    return (
      <ul className="cards-list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Card {...movie} genres={genres} loading={loading} />
          </li>
        ))}

        {searchValue.length === 0 && (
          <p className="cards-list__message">Please enter a query to search for movies ...</p>
        )}
        {searchValue.length !== 0 && movies.length === 0 && (
          <p className="cards-list__message">
            Sorry! Looks like we don&#39;t have any matches for &#34;{searchValue}&#34;
          </p>
        )}
      </ul>
    );
  }
}
