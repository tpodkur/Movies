import React, { Component } from 'react';
import './main-page.scss';
import debounce from 'lodash/debounce';

import SearchBar from '../search-bar/search-bar';
import CardsListWrapper from '../cards-list-wrapper/cards-list-wrapper';
import Tabs from '../tabs/tabs';
import RatedCardsList from '../rated-cards-list/rated-cards-list';
import { UpdateRatedMoviesProvider } from '../../context/update-rated-movies-context';

export default class MainPage extends Component {
  state = {
    searchValue: 'return',
    ratedMovies: [],
  };

  constructor() {
    super();
    if (!localStorage.ratedMovies) {
      localStorage.ratedMovies = JSON.stringify([]);
    }
  }

  componentDidMount() {
    this.setState({ ratedMovies: JSON.parse(localStorage.ratedMovies) });
  }

  onSearch = debounce((value) => {
    this.setState({ searchValue: value });
  }, 300);

  onUpdateRatedMovies() {
    this.setState({ ratedMovies: JSON.parse(localStorage.ratedMovies) });
  }

  render() {
    const content = (
      <>
        <div className="main-page__search-bar">
          <SearchBar onSearch={this.onSearch} searchValue={this.state.searchValue} />
        </div>
        <CardsListWrapper searchValue={this.state.searchValue} {...this.props} />
      </>
    );
    const rated = <RatedCardsList ratedMovies={this.state.ratedMovies} />;

    return (
      <div className="main-page">
        <UpdateRatedMoviesProvider value={this.onUpdateRatedMovies.bind(this)}>
          <Tabs searchTabContent={content} ratedTabContent={rated} />
        </UpdateRatedMoviesProvider>
      </div>
    );
  }
}
