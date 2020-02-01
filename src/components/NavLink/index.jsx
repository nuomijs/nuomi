import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { RouterContext } from '../Context';
import Link from '../Link';
import { getHashPrefix } from '../../core/router';

class NavLink extends Link {
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    reload: PropTypes.bool,
    activeClassName: PropTypes.string,
    activeStyle: PropTypes.object,
    isActice: PropTypes.func,
  };

  getClassName = () => {

  }

  getStyle = () => {

  }

  render() {
    const { to, reload, activeClassName, activeStyle, isActice, ...rest } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <NavLink>');
          const props = {};
          if (isActice()) {

          }
          return <a href={`${getHashPrefix()}${to}`} {...rest} {...props} onClick={this.onClick} />;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default NavLink;
