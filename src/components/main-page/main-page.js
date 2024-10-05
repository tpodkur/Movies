import React, { Component } from 'react';

import './main-page.scss';
import SearchBar from '../search-bar/search-bar';
import CardsList from '../cards-list/cards-list';

export default class MainPage extends Component {
  state = {
    searchValue: 'return',
  };

  onSearch = (value) => {
    this.setState({ searchValue: value }, () => {
      console.log(this.state.searchValue);
    });
  };

  render() {
    return (
      <div className="main-page">
        <div className="main-page__search-bar">
          <SearchBar onSearch={this.onSearch} />
        </div>
        <CardsList searchValue={this.state.searchValue} />
      </div>
    );
  }
}
