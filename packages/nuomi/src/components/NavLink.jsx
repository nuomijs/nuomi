import React from 'react';
import invariant from 'invariant';
import { Link } from './Link';
import { NavLinkPropTypes } from './propTypes';
import { combinePath, match, restorePath } from '../core/router';
import { isFunction } from '../utils';
import { RouterContext } from './Context';
import parser from '../utils/parser';

class NavLink extends Link {
  static propTypes = NavLinkPropTypes;

  static defaultProps = {
    to: '',
    activeClassName: 'active',
    replace: false,
    reload: false,
  };

  isActive(location) {
    const { props } = this;
    const { isActive, to } = props;
    const { pathname } = parser(restorePath(to));
    const matchLocation = match(location, { path: pathname }, false, true);
    if (isFunction(isActive)) {
      return isActive(matchLocation, location, props) !== false;
    }
    return matchLocation;
  }

  getActiveProps(location) {
    const {
      className, style, activeClassName, activeStyle,
    } = this.props;
    const props = { className, style };
    if (this.isActive(location)) {
      props.className = [className, activeClassName].filter((name) => !!name).join(' ');
      props.style = { ...activeStyle, ...style };
    }
    return props;
  }

  render() {
    const {
      to, reload, replace, activeClassName, activeStyle, isActive, forwardRef, ...rest
    } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <NavLink>');
          const { location } = context;
          return (
            <a
              href={combinePath(to)}
              {...rest}
              {...this.getActiveProps(location)}
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
