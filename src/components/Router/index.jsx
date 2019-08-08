import React from 'react';
import PropTypes from 'prop-types';
import RouterContext from '../RouterContext';
import { createRouter } from '../../core/router';

class Router extends React.PureComponent {
  static defaultProps = {
    prefix: '',
  };

  static propTypes = {
    prefix: PropTypes.string,
  };

  constructor(...args) {
    super(...args);
    const { prefix } = this.props;
    this.mounted = false;
    this.state = {};
    this.destroyRouter = createRouter({ prefix }, (location) => {
      if (this.mounted) {
        this.setState({ location });
      } else {
        this.state.location = location;
      }
    });
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    if (this.destroyRouter) {
      this.destroyRouter();
      this.mounted = false;
    }
  }

  render() {
    const { children } = this.props;
    const { location } = this.state;
    return (
      <RouterContext.Provider value={{ location, matched: null }}>
        {children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
