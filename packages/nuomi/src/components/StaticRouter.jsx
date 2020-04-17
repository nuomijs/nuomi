import React from 'react';
import { clearStore } from '../core/redux/store';
import Router from './Router';
import { RouterContext } from './Context';
import { noop, isString } from '../utils';
import parser, { normalizePath } from '../utils/parser';
import { StaticRouterPropTypes } from './propTypes';

export default class StaticRouter extends React.Component {
  static propTypes = StaticRouterPropTypes;

  static defaultProps = {
    basename: '/',
    location: {},
    context: {},
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
      pathname: normalizePath(pathname),
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
