import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { RouterContext } from './Context';
import { createRouter } from '../core/router';
import { clearStore } from '../core/redux/store';

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
    this.wrappers = [];
    const { staticLocation } = this.context || {};
    this.clearRouter = createRouter(this.props, staticLocation, (location) => {
      if (this.mounted) {
        this.setState({ location });
      } else {
        this.location = location;
        if (!this.state.location) {
          this.state.location = location;
        }
      }
    });
    if (!this.clearRouter) {
      invariant(false, '<Router> 不能重复创建');
    }
  }

  componentDidMount() {
    this.mounted = true;
    // createRouter回调可能在Router组件未被渲染结束调用多次，因此渲染完成后更新一次state
    if (this.state.location !== this.location) {
      this.setState({ location: this.location });
    }
  }

  componentWillUnmount() {
    if (this.clearRouter) {
      this.clearRouter();
      this.mounted = false;
      this.location = null;
      clearStore();
    }
  }

  render() {
    const { children } = this.props;
    const { location } = this.state;
    const { staticContext } = this.context || {};
    const contextValue = {
      location,
      matched: null,
      restore: false,
      isLeave: false,
      staticContext,
      wrappers: this.wrappers,
    };
    return (
      <RouterContext.Provider value={contextValue}>
        {children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
