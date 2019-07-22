import React from 'react';
/* eslint-disable no-unused-vars */
import BaseRoute from '../BaseRoute';

class Route extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.store = {};
  }

  render() {
    return <BaseRoute {...this.props} store={this.store} />;
  }
}

export default Route;
