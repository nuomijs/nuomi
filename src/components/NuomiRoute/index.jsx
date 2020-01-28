import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { RouterContext } from '../Context';
import Nuomi from '../Nuomi';

class NuomiRoute extends Nuomi {
  static propTypes = {
    pathPrefix: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  constructor(...args) {
    super(...args);
    this.routeComponent = null;
  }

  matchPath(pathname) {
    const { pathPrefix } = this.props;
    if (pathPrefix) {
      if (pathPrefix instanceof RegExp) {
        return pathPrefix.test(pathname);
      }
      if (typeof pathPrefix === 'string') {
        return pathname.indexOf(pathPrefix) === 0;
      }
    }
    return false;
  }

  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <NuomiRoute>');
          const { location } = context;
          // 路由还原时不渲染组件
          if (context.restore) {
            return this.routeComponent;
          }
          this.routeComponent = null;
          if (!context.matched && this.matchPath(location.pathname)) {
            context.matched = this;
            this.routeComponent = (
              <RouterContext.Provider value={{ ...context, matched: null }}>
                {super.render()}
              </RouterContext.Provider>
            );
          }
          return this.routeComponent;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default NuomiRoute;
