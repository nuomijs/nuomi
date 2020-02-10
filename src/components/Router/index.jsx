import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { RouterContext } from '../Context';
import { createRouter } from '../../core/router';

class Router extends React.PureComponent {
  static defaultProps = {
    basePath: '/',
    type: 'hash',
  };

  static propTypes = {
    basePath: PropTypes.string,
    type: PropTypes.oneOf(['hash', 'browser']),
  };

  constructor(...args) {
    super(...args);
    this.mounted = false;
    this.state = {};
    this.location = null;
    const { basePath } = this.props;
    invariant(basePath.indexOf('/') === 0, 'basePath必须是“/”开头');
    this.destroyRouter = createRouter(this.props, (location) => {
      this.location = location;
      if (this.mounted) {
        this.setState({ location });
      } else if (!this.state.location) {
        this.state.location = location;
      }
    });
  }

  componentDidMount() {
    this.mounted = true;
    if (this.state.location !== this.location) {
      this.setState({ location: this.location });
    }
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
      <RouterContext.Provider
        value={{ location, matched: null, restore: false, callOnLeave: false }}
      >
        {children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
