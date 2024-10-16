import React, { Component } from 'react';

import CardsList from '../cards-list/cards-list';
import Pagination from '../pagination/pagination';

export default class RatedCardsList extends Component {
  state = {
    page: 1,
    ratedMovies: this.props.ratedMovies.slice(0, 20),
  };

  onPageChange = (page) => {
    this.setState({ page });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page === this.state.page) return;
    this.setState({ ratedMovies: this.props.ratedMovies.slice(20 * (this.state.page - 1), 20 * this.state.page) });
  }

  render() {
    return (
      <div className="cards-list-wrapper">
        <CardsList movies={this.state.ratedMovies} loading={false} searchValue={''} isRatedList={true} />
        {this.props.ratedMovies.length > 20 && (
          <div className="cards-list-wrapper__pagination">
            <Pagination
              page={this.state.page}
              totalItemsCount={this.props.ratedMovies.length}
              onPageChange={this.onPageChange}
            />
          </div>
        )}
      </div>
    );
  }
}
