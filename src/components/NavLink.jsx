import React from 'react';
import invariant from 'invariant';
import { Link } from './Link';
import { NavLinkPropTypes } from './propTypes';
import { combinePath } from '../core/router';
import { isFunction } from '../utils';
import { RouterContext } from './Context';
import router from '../core/router';
import parser from '../utils/parser';

class NavLink extends Link {
  static propTypes = NavLinkPropTypes;

  static defaultProps = {
    to: '',
    data: null,
    replace: false,
    reload: false,
  };

  isActive(location) {
    const { isActive, to } = this.props;
    const { pathname } = parser(parser.restore(to));
    const match = router.matchPath(location, pathname);
    if (isFunction(isActive)) {
      return isActive(match, location) !== false;
    }
    return match;
  }

  getActiveProps(location) {
    const { className, style, activeClassName, activeStyle } = this.props;
    const props = { className, style };
    if (this.isActive(location)) {
      props.className = [className, activeClassName].filter((name) => !!name).join(' ');
      props.style = { ...activeStyle, ...style };
    }
    return props;
  }

  render() {
    const { to, reload, data, replace, activeClassName, activeStyle, isActive, forwardRef, ...rest } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <NavLink>');
          const { location } = context;
          return <a href={to ? combinePath(to) : ''} {...rest} {...this.getActiveProps(location)} onClick={this.onClick} ref={forwardRef} />;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default React.forwardRef((props, ref) => <NavLink {...props} forwardRef={ref} />);
