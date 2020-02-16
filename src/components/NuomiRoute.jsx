import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';
import Nuomi from './Nuomi';
import parser from '../utils/parser';
import { isString } from '../utils';
import { NuomiRoutePropTypes } from './propTypes';

export default class NuomiRoute extends React.PureComponent {
  static propTypes = NuomiRoutePropTypes;

  constructor(...args) {
    super(...args);
    this.routeComponent = null;
  }

  matchPath(location) {
    const { pathname } = location;
    const { pathPrefix, path } = this.props;
    if (path) {
      return parser.toRegexp(path).test(pathname);
    }
    if (pathPrefix instanceof RegExp) {
      return pathPrefix.test(pathname);
    }
    if (isString(pathPrefix)) {
      return pathname.indexOf(pathPrefix) === 0;
    }
    return false;
  }

  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <NuomiRoute>');
          const { location } = context;
          this.routeComponent = null;
          if (!context.matched && this.matchPath(location)) {
            context.matched = this;
            this.routeComponent = (
              <RouterContext.Provider value={{ ...context, matched: null }}>
                <Nuomi {...this.props} />
              </RouterContext.Provider>
            );
          }
          return this.routeComponent;
        }}
      </RouterContext.Consumer>
    );
  }
}
