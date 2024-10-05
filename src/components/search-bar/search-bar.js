import React, { Component } from 'react';
import { Input } from 'antd';

export default class SearchBar extends Component {
  state = {
    value: '',
  };

  onChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onSearch(event.target.value);
  };

  render() {
    return <Input placeholder="Type to search..." value={this.state.value} onChange={this.onChange} />;
  }
}
