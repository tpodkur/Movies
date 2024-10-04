import React from 'react';
import './card.scss';

import Spinner from '../spinner/spinner';
import CardContent from '../card-content/card-content';

const Card = ({ loading, ...props }) => {
  const spinner = (
    <div className="card__spinner">
      <Spinner size="large" />
    </div>
  );
  const content = <CardContent {...props} />;

  return <div className="card">{loading ? spinner : content}</div>;
};

export default Card;
