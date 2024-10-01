import React from 'react';

import Card from '../card/card';
import './cards-list.scss';

const CardsList = () => {
  return (
    <ul className="cards-list">
      <li>
        <Card />
      </li>
      <li>
        <Card />
      </li>
      <li>
        <Card />
      </li>
      <li>
        <Card />
      </li>
    </ul>
  );
};

export default CardsList;
