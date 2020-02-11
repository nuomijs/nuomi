import React from 'react';
import PropTypes from 'prop-types';
import Router from '../Router';
import { RouterContext } from './Context';
import { noop } from '../utils';

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
    return {
      protocol: '',
      host: '',
      port: '',
      search: '',
      hash: '',
      pathname: '',
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
