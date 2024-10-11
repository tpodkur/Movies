import React, { Component } from 'react';

import './app.scss';
import MainPage from '../main-page/main-page';
import { MoviesApiService } from '../../services/MoviesApiService';
import { ApiServiceProvider } from '../api-service-context/api-service-context';

export default class App extends Component {
  api = new MoviesApiService();

  render() {
    return (
      <ApiServiceProvider value={this.api}>
        <MainPage />
      </ApiServiceProvider>
    );
  }
}
