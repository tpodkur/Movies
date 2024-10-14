import React from 'react';

import Card from '../card/card';
import './cards-list.scss';

const CardsList = ({ movies, genres, loading, searchValue }) => {
  return (
    <ul className="cards-list">
      {movies.map((movie) => (
        <li key={movie.id}>
          <Card movie={movie} genres={genres} loading={loading} />
        </li>
      ))}

      {searchValue.length === 0 && <p className="cards-list__message">Please enter a query to search for movies ...</p>}
      {searchValue.length !== 0 && movies.length === 0 && (
        <p className="cards-list__message">
          Sorry! Looks like we don&#39;t have any matches for &#34;{searchValue}&#34;
        </p>
      )}
    </ul>
  );
};

export default CardsList;
