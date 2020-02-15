import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { RouterContext } from './Context';
import Nuomi from './Nuomi';
import parser from '../utils/parser';
import { isString } from '../utils';

class NuomiRoute extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    state: PropTypes.object,
    data: PropTypes.object,
    reducers: PropTypes.objectOf(PropTypes.func),
    effects: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    render: PropTypes.func,
    onInit: PropTypes.func,
    async: PropTypes.func,
    pathPrefix: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    pathname: PropTypes.string,
  };

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

export default NuomiRoute;
