import React from 'react';

import './main-page.scss';
import SearchBar from '../search-bar/search-bar';
import CardsList from '../cards-list/cards-list';

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="main-page__search-bar">
        <SearchBar />
      </div>
      <CardsList />
    </div>
  );
};

export default MainPage;
