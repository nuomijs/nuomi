import React from 'react';
import PropTypes from 'prop-types';
import { clearStore } from '../core/redux/store';
import Router from './Router';
import { RouterContext } from './Context';
import { noop, isString } from '../utils';
import parser from '../utils/parser';

class StaticRouter extends React.Component {
  static defaultProps = {
    basename: '/',
    location: {},
    context: {},
  };

  static propTypes = {
    basename: PropTypes.string,
    location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    context: PropTypes.object,
  };

  constructor(...args) {
    super(...args);
    clearStore();
  }

  getStaticLocation() {
    const { location } = this.props;
    let staticLocation = location;
    if (isString(location)) {
      staticLocation = parser(location);
    }
    const { search = '', hash = '', pathname = '' } = staticLocation;
    return {
      search,
      hash,
      pathname: parser.replacePath(pathname),
      replace: noop,
    };
  }

  render() {
    const { location, context, ...rest } = this.props;
    const staticLocation = this.getStaticLocation();
    return (
      <RouterContext.Provider value={{ staticLocation, staticContext: context }}>
        <Router type="browser" {...rest} />
      </RouterContext.Provider>
    );
  }
}

export default StaticRouter;
