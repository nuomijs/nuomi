import React from 'react';
import PropTypes from 'prop-types';
import RouterContext from '../RouterContext';
import RouteCore from '../RouteCore';
import { removeReducer } from '../../core/redux/reducer';
import { matchPath, savePath, removePath, getParams } from '../../core/router';
import { getDefaultProps } from '../../core/nuomi';

class Route extends React.PureComponent {
  static propTypes = {
    path: PropTypes.string,
    wrapper: PropTypes.bool,
  };

  static childContextTypes = {
    routeTempData: PropTypes.object,
  };

  constructor(...args) {
    super(...args);
    this.store = {};
    this.routeTempData = {};
    this.ref = React.createRef();
    const { path } = this.props;
    savePath(path);
  }

  getChildContext() {
    return {
      routeTempData: this.routeTempData,
    };
  }

  componentWillUnmount() {
    const { path, wrapper } = this.props;
    const { current } = this.ref;
    if (current) {
      if (wrapper) {
        current.removeWrapper();
      }
      if (current.ref.current) {
        current.ref.current.removeListener();
      }
    }
    removePath(path);
    removeReducer(this.store.id);
  }

  render() {
    const defaultProps = getDefaultProps();
    const { path, wrapper = defaultProps.wrapper } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { location } = context;
          let match = matchPath(location, path);
          // context.matched 表示同一个上下文中，多个路由只匹配一个
          if (context.matched && context.matched !== this) {
            match = false;
          }
          // 设置了wrapper没有匹配路由，不销毁，只隐藏
          if (wrapper === true && this.routeCore && !match) {
            return this.routeCore;
          }
          if (match) {
            // eslint-disable-next-line no-param-reassign
            context.matched = this; // 解决Route在更新时不匹配问题，值不能设置为true
            location.params = getParams(location, path); // 解析动态参数
            this.routeCore = (
              <RouteCore
                {...this.props}
                wrapper={wrapper}
                location={location}
                store={this.store}
                ref={this.ref}
              />
            );
            return this.routeCore;
          }
          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Route;
