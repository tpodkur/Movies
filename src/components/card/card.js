import React from 'react';
import './card.scss';

import Spinner from '../spinner/spinner';
import CardContent from '../card-content/card-content';

const Card = (props) => {
  return (
    <div className="card">
      <div className="card__spinner">
        <Spinner size="large" />
      </div>
      <CardContent {...props} />
    </div>
  );
};

export default Card;
