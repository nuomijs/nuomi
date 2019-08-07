import React from 'react';
import PropTypes from 'prop-types';
import RouterContext from '../RouterContext';
import { location as routerLocation } from '../../core/router';
import parser from '../../utils/parser';

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

  matchPath({ pathname }) {
    const { from } = this.props;
    return pathname === parser.replacePath(from);
  }

  render() {
    const { from, to, reload } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { matched, location } = context;
          if (to && !context.redirecting && !this.redirected) {
            if ((from && this.matchPath(location)) || (!matched && !from)) {
              this.redirected = true;
              // eslint-disable-next-line no-param-reassign
              context.redirecting = true; // 防止同时执行多个Redirect
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
