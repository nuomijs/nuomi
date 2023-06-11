import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';
import { createRouter } from '../core/router';
import { clearStore } from '../core/redux/store';
import { RouterPropTypes } from './propTypes';

export default class Router extends React.PureComponent {
  static propTypes = RouterPropTypes;

  static contextType = RouterContext;

  static defaultProps = {
    basename: '/',
    type: 'hash',
  };

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
    if (process.env.NODE_ENV === 'production' && !this.clearRouter) {
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
    const { children, basename, type } = this.props;
    const { location } = this.state;
    const { staticContext } = this.context || {};
    const contextValue = {
      location,
      staticContext,
      matched: null,
      wrappers: this.wrappers,
      basename,
      type,
    };
    return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>;
  }
}
