import React, { Component } from 'react';
import './main-page.scss';
import debounce from 'lodash/debounce';

import SearchBar from '../search-bar/search-bar';
import CardsList from '../cards-list/cards-list';
import Pagination from '../pagination/pagination';

export default class MainPage extends Component {
  state = {
    searchValue: 'return',
  };

  onSearch = debounce((value) => {
    this.setState({ searchValue: value });
  }, 300);

  render() {
    return (
      <div className="main-page">
        <div className="main-page__search-bar">
          <SearchBar onSearch={this.onSearch} />
        </div>
        <CardsList searchValue={this.state.searchValue} />
        <div className="main-page__pagination">
          <Pagination />
        </div>
      </div>
    );
  }
}
