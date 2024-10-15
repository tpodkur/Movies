import React, { Component } from 'react';

import './app.scss';
import MainPage from '../main-page/main-page';
import { MoviesApiService } from '../../services/MoviesApiService';
import { ApiServiceProvider } from '../../context/api-service-context';
import { GenresProvider } from '../../context/genres-context';

export default class App extends Component {
  api = new MoviesApiService();
  state = {
    genres: [],
  };

  onError(err) {
    console.log(err);
  }

  getGenres() {
    this.api
      .getGenres()
      .then((genres) => {
        this.setState({ genres });
      })
      .catch(this.onError.bind(this));
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <ApiServiceProvider value={this.api}>
        <GenresProvider value={this.state.genres}>
          <MainPage api={this.api} />
        </GenresProvider>
      </ApiServiceProvider>
    );
  }
}
