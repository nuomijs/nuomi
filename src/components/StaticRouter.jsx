import React from 'react';
import PropTypes from 'prop-types';
import Router from '../Router';
import globalWindow from '../utils/globalWindow';

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

  render() {
    const { location, ...rest } = this.props;
    return <Router type="browser" {...rest} />;
  }
}

export default StaticRouter;
