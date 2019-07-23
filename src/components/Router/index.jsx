import React from 'react';
import PropTypes from 'prop-types';
import RouterContext from '../RouterContext';
import { createRouter, listener, removeListener } from '../../core/router';

class Router extends React.PureComponent {
  static defaultProps = {
    redirect: null,
  };

  static propTypes = {
    redirect: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  };

  constructor(...args) {
    super(...args);
    const { location } = createRouter();
    this.state = { location };
    this.listener();
  }

  listener() {
    listener((location) => {
      this.setState({
        location,
      });
    });
  }

  /* eslint-disable class-methods-use-this */
  componentWillUnmount() {
    removeListener();
  }

  render() {
    const { children } = this.props;
    const { location } = this.state;
    const value = { location };
    return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
  }
}

export default Router;
