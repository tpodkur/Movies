import React, { Component } from 'react';

import './app.scss';
import MainPage from '../main-page/main-page';
import { MoviesApiService } from '../../services/MoviesApiService';

export default class App extends Component {
  api = new MoviesApiService();
  sessionId;

  componentDidMount() {
    this.api.getGuestSessionId().then((res) => {
      this.sessionId = res;
    });
  }

  render() {
    return <MainPage />;
  }
}
