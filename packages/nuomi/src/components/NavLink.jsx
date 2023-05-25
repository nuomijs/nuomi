import React from 'react';
import invariant from 'invariant';
import { Link } from './Link';
import { NavLinkPropTypes } from './propTypes';
import router, { combinePath } from '../core/router';
import { isFunction } from '../utils';
import { RouterContext } from './Context';
import parser, { restorePath } from '../utils/parser';

class NavLink extends Link {
  static propTypes = NavLinkPropTypes;

  static defaultProps = {
    to: '',
    path: '',
    activeClassName: 'active',
    replace: false,
    reload: false,
  };

  isActive(route) {
    const { props } = this;
    const { isActive, to, path } = props;
    const { pathname } = parser(restorePath(to));
    const match = router.matchPath(route, path || pathname);
    if (isFunction(isActive)) {
      return isActive(match, route, props) !== false;
    }
    return match;
  }

  getActiveProps(route) {
    const {
      className, style, activeClassName, activeStyle,
    } = this.props;
    const props = { className, style };
    if (this.isActive(route)) {
      props.className = [className, activeClassName].filter((name) => !!name).join(' ');
      props.style = { ...activeStyle, ...style };
    }
    return props;
  }

  render() {
    const {
      to,
      path,
      reload,
      replace,
      activeClassName,
      activeStyle,
      isActive,
      forwardRef,
      ...rest
    } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <NavLink>');
          const { route } = context;
          return (
            <a
              href={combinePath(to)}
              {...rest}
              {...this.getActiveProps(route)}
              onClick={this.onClick}
              ref={forwardRef}
            />
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

export default React.forwardRef((props, ref) => <NavLink {...props} forwardRef={ref} />);
