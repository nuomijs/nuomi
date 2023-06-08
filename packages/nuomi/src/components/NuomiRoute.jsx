import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';
import Nuomi from './Nuomi';
import { match } from '../core/router';
import { isString } from '../utils';
import { NuomiRoutePropTypes } from './propTypes';

export default class NuomiRoute extends React.PureComponent {
  static propTypes = NuomiRoutePropTypes;

  matchPath(location) {
    const { pathname } = location;
    const { pathPrefix, path } = this.props;
    if (path) {
      return match(location, path);
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

          // 同一个context只匹配一次
          const allowMatch = !context.matched || context.matched === this || context.location.reload === true;

          if (allowMatch && this.matchPath(context.location)) {
            context.matched = this;
            return (
              <RouterContext.Provider value={{ ...context, matched: null }}>
                <Nuomi {...this.props} />
              </RouterContext.Provider>
            );
          }

          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}
