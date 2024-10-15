import React from 'react';
import './card.scss';

import Spinner from '../spinner/spinner';
import CardContent from '../card-content/card-content';
import { ApiServiceConsumer } from '../../context/api-service-context';
import { UpdateRatedMoviesConsumer } from '../../context/update-rated-movies-context';

const Card = ({ loading, ...props }) => {
  const spinner = (
    <div className="card__spinner">
      <Spinner size="large" />
    </div>
  );
  const content = (
    <UpdateRatedMoviesConsumer>
      {(onUpdateRatedMovies) => {
        return (
          <ApiServiceConsumer>
            {(api) => {
              return <CardContent {...props} api={api} onUpdateRatedMovies={onUpdateRatedMovies} />;
            }}
          </ApiServiceConsumer>
        );
      }}
    </UpdateRatedMoviesConsumer>
  );

  return <div className="card">{loading ? spinner : content}</div>;
};

export default Card;
