import React from 'react';

import Card from '../card/card';
import './cards-list.scss';
import { GenresConsumer } from '../../context/genres-context';

const CardsList = ({ movies, loading, searchValue, isRatedList = false }) => {
  const emptyRatedListMessage = isRatedList && movies.length === 0 && (
    <p className="cards-list__message">Sorry! No rated movies</p>
  );

  const emptySearchMessage = searchValue.length === 0 && !isRatedList && (
    <p className="cards-list__message">Please enter a query to search for movies ...</p>
  );

  const noResultsMessage = searchValue.length !== 0 && movies.length === 0 && !isRatedList && (
    <p className="cards-list__message">Sorry! Looks like we don&#39;t have any matches for &#34;{searchValue}&#34;</p>
  );

  return (
    <GenresConsumer>
      {(genres) => {
        const listElements = movies.map((movie) => (
          <li key={movie.id}>
            <Card movie={movie} genres={genres} loading={loading} />
          </li>
        ));

        return (
          <ul className="cards-list">
            {listElements}
            {emptyRatedListMessage}
            {emptySearchMessage}
            {noResultsMessage}
          </ul>
        );
      }}
    </GenresConsumer>
  );
};

export default CardsList;
