import React, { Component } from 'react';
import './main-page.scss';
import debounce from 'lodash/debounce';

import SearchBar from '../search-bar/search-bar';
import CardsListWrapper from '../cards-list-wrapper/cards-list-wrapper';
import Tabs from '../tabs/tabs';
import { ApiServiceConsumer } from '../api-service-context/api-service-context';

export default class MainPage extends Component {
  state = {
    searchValue: 'return',
  };

  onSearch = debounce((value) => {
    this.setState({ searchValue: value });
  }, 300);

  render() {
    const content = (
      <>
        <div className="main-page__search-bar">
          <SearchBar onSearch={this.onSearch} />
        </div>
        <ApiServiceConsumer>
          {(api) => {
            return <CardsListWrapper searchValue={this.state.searchValue} api={api} />;
          }}
        </ApiServiceConsumer>
      </>
    );

    return (
      <div className="main-page">
        <Tabs searchTabContent={content} />
      </div>
    );
  }
}
