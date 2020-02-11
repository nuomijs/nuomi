import React from 'react';
import PropTypes from 'prop-types';
import { RouterContext } from './Context';
import { createRouter } from '../core/router';

class Router extends React.PureComponent {
  static defaultProps = {
    basename: '/',
    type: 'hash',
  };

  static propTypes = {
    basename: PropTypes.string,
    type: PropTypes.oneOf(['hash', 'browser']),
  };

  static contextType = RouterContext;

  constructor(...args) {
    super(...args);
    this.mounted = false;
    this.state = {};
    this.location = null;
    this.destroyRouter = createRouter(this.props, this.context.staticLocation, (location) => {
      if (this.mounted) {
        this.setState({ location });
      } else {
        this.location = location;
        if (!this.state.location) {
          this.state.location = location;
        }
      }
    });
  }

  componentDidMount() {
    this.mounted = true;
    // createRouter回调可能在Router组件未被渲染结束调用多次，因此渲染完成后更新一次state
    if (this.state.location !== this.location) {
      this.setState({ location: this.location });
    }
  }

  componentWillUnmount() {
    if (this.destroyRouter) {
      this.destroyRouter();
      this.mounted = false;
      this.location = null;
    }
  }

  render() {
    const { children } = this.props;
    const { location } = this.state;
    const { staticContext } = this.context;
    return (
      <RouterContext.Provider
        value={{ location, matched: null, restore: false, isLeave: false, staticContext }}
      >
        {children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
