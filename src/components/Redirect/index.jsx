import React from 'react';
import PropTypes from 'prop-types';
import RouterContext from '../RouterContext';
import { location as routerLocation, matchPath } from '../../core/router';

class Redirect extends React.PureComponent {
  static defaultProps = {
    from: '',
    to: '',
    reload: false,
  };

  static propTypes = {
    from: PropTypes.string,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    reload: PropTypes.bool,
  };

  constructor(...args) {
    super(...args);
    // 防止死循环
    this.redirected = false;
  }

  render() {
    const { from, to, reload } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { matched, location } = context;
          if (to && !this.redirected) {
            if ((!matched && !from) || (from && matchPath(location, from))) {
              this.redirected = true;
              routerLocation(to, reload);
            }
          } else if (this.redirected) {
            this.redirected = false;
          }
          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Redirect;
