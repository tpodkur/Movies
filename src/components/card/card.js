import React from 'react';
import './card.scss';

import Spinner from '../spinner/spinner';
import CardContent from '../card-content/card-content';
import { ApiServiceConsumer } from '../../context/api-service-context';

const Card = ({ loading, ...props }) => {
  const spinner = (
    <div className="card__spinner">
      <Spinner size="large" />
    </div>
  );
  const content = (
    <ApiServiceConsumer>
      {(api) => {
        return <CardContent {...props} api={api} />;
      }}
    </ApiServiceConsumer>
  );

  return <div className="card">{loading ? spinner : content}</div>;
};

export default Card;
