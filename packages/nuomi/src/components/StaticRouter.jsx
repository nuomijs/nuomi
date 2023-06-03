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
    route: {},
    context: {},
  };

  constructor(...args) {
    super(...args);
    clearStore();
  }

  getStaticLocation() {
    const { route } = this.props;
    let staticLocation = route;
    if (isString(route)) {
      staticLocation = parser(route);
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
    const { route, context, ...rest } = this.props;
    const staticLocation = this.getStaticLocation();
    return (
      <RouterContext.Provider value={{ staticLocation, staticContext: context }}>
        <Router type="browser" {...rest} />
      </RouterContext.Provider>
    );
  }
}
