import React from 'react';
import PropTypes from 'prop-types';
import RouterContext from '../RouterContext';
import { createRouter, location as routerLocation } from '../../core/router';

class Router extends React.PureComponent {
  static defaultProps = {
    prefix: '',
    redirect: '/',
    entry: '/',
  };

  static propTypes = {
    prefix: PropTypes.string,
    entry: PropTypes.string,
    redirect: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  };

  constructor(...args) {
    super(...args);
    this.state = {};
    const { prefix } = this.props;
    this.destroyRouter = createRouter({ prefix }, (location) => {
      this.setLocation(location);
    });
  }

  componentDidMount() {
    this.setLocation = (location) => {
      this.setState({ location });
    };
  }

  componentWillUnmount() {
    if (this.destroyRouter) {
      this.destroyRouter();
      this.destroyRouter = null;
    }
  }

  setLocation(location) {
    const { entry } = this.props;
    if (!location.pathname && entry) {
      routerLocation(entry);
    }
    this.state.location = location;
  }

  render() {
    const { children } = this.props;
    return <RouterContext.Provider value={this.state}>{children}</RouterContext.Provider>;
  }
}

export default Router;
