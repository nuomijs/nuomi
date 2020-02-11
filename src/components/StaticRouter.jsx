import React from 'react';
import PropTypes from 'prop-types';
import Router from './Router';
import { RouterContext } from './Context';
import { noop, isString } from '../utils';
import parser from '../utils/parser';

class StaticRouter extends React.Component {
  static defaultProps = {
    basename: '/',
    location: null,
    context: {},
  };

  static propTypes = {
    basename: PropTypes.string,
    location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    context: PropTypes.object,
  };

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
    const { location, ...rest } = this.props;
    return (
      <RouterContext.Provider value={{ staticLocation: this.getStaticLocation() }}>
        <Router type="browser" {...rest} />
      </RouterContext.Provider>
    );
  }
}

export default StaticRouter;
