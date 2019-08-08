import React from 'react';
import PropTypes from 'prop-types';
import RouterContext from '../RouterContext';
import Nuomi from '../Nuomi';

class NuomiRoute extends Nuomi {
  static propTypes = {
    prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  matchPath(pathname) {
    const { prefix } = this.props;
    if (prefix) {
      if (prefix instanceof RegExp) {
        return prefix.test(pathname);
      }
      if (typeof prefix === 'string') {
        return pathname.indexOf(prefix) === 0;
      }
    }
    return false;
  }

  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { location } = context;
          if (!context.matched && this.matchPath(location.pathname)) {
            // eslint-disable-next-line no-param-reassign
            context.matched = this;
            return (
              <RouterContext.Provider value={{ location, matched: false }}>
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
