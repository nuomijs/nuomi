import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import RouterContext from '../RouterContext';
import Nuomi from '../Nuomi';

class NuomiRoute extends Nuomi {
  static propTypes = {
    pathPrefix: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

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
          if (!context.matched && this.matchPath(location.pathname)) {
            // eslint-disable-next-line no-param-reassign
            context.matched = this;
            return (
              <RouterContext.Provider value={{ location, matched: null }}>
                {super.render()}
              </RouterContext.Provider>
            );
          }
          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default NuomiRoute;
