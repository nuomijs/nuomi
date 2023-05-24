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
    this.route = null;
    this.wrappers = [];
    const { staticLocation } = this.context || {};
    this.clearRouter = createRouter(this.props, staticLocation, (route) => {
      if (this.mounted) {
        this.setState({ route });
      } else {
        this.route = route;
        if (!this.state.route) {
          this.state.route = route;
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
    if (this.state.route !== this.route) {
      this.setState({ route: this.route });
    }
  }

  componentWillUnmount() {
    if (this.clearRouter) {
      this.clearRouter();
      this.mounted = false;
      this.route = null;
      clearStore();
    }
  }

  render() {
    const { children, basename, type } = this.props;
    const { route } = this.state;
    const { staticContext } = this.context || {};
    const contextValue = {
      route,
      staticContext,
      matched: null,
      wrappers: this.wrappers,
      basename,
      type,
    };
    return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>;
  }
}
