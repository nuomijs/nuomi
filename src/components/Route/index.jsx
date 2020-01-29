import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { RouterContext } from '../Context';
import RouteCore from '../RouteCore';
import {
  matchPath,
  savePath,
  removePath,
  getParamsLocation,
  normalLocation,
  location as routerLocation,
} from '../../core/router';
import { getDefaultProps } from '../../core/nuomi';

let activeRouteComponent = null;

class Route extends React.PureComponent {
  static propTypes = {
    path: PropTypes.string,
    wrapper: PropTypes.bool,
    id: PropTypes.string,
    reload: PropTypes.bool,
    state: PropTypes.object,
    data: PropTypes.object,
    reducers: PropTypes.objectOf(PropTypes.func),
    effects: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    render: PropTypes.func,
    onEnter: PropTypes.func,
    onInit: PropTypes.func,
    onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    onLeave: PropTypes.func,
    async: PropTypes.func,
  };

  static defaultProps = {
    id: '',
    path: '',
    reload: false,
    state: {},
    data: {},
    reducers: {},
  };

  static childContextTypes = {
    routeTempData: PropTypes.object,
  };

  constructor(...args) {
    super(...args);
    this.store = {};
    this.routeTempData = {};
    this.ref = React.createRef();
    this.routeComponent = null;
    const { path } = this.props;
    savePath(path);
  }

  getChildContext() {
    return {
      routeTempData: this.routeTempData,
    };
  }

  componentWillUnmount() {
    const { path } = this.props;
    if (activeRouteComponent === this.routeComponent) {
      activeRouteComponent = null;
    }
    removePath(path);
  }

  render() {
    const defaultProps = getDefaultProps();
    const { path, wrapper = defaultProps.wrapper } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <Route>');
          const { location } = context;
          let match = matchPath(location, path);
          // context.matched 表示同一个上下文中，多个路由只匹配一个
          if (context.matched && context.matched !== this) {
            match = false;
          }
          // 设置了wrapper没有匹配路由，不销毁，只隐藏
          if (wrapper === true && this.routeComponent !== null && !match) {
            return this.routeComponent;
          }
          // 还原路由时，不重新渲染组件
          if (context.restore) {
            return this.routeComponent;
          }
          // 检测之前的路由onLeave
          if (
            !!activeRouteComponent &&
            !!activeRouteComponent.ref.current &&
            !context.callOnLeave
          ) {
            const baseRouteComponent = activeRouteComponent.ref.current.ref.current;
            if (baseRouteComponent) {
              const { props } = baseRouteComponent;
              if (props.onLeave) {
                const leave = () => {
                  // 1.防止跳转后再次执行onLeave导致死循环，2.用作调用leave后的标记
                  activeRouteComponent = null;
                  routerLocation(location, location.data, location.reload);
                };
                const leaveResult = props.onLeave(() => leave());
                if (activeRouteComponent === null) {
                  invariant(
                    false,
                    'onLeave中不能直接进行路由跳转，可以通过返回布尔值控制，' +
                      '如果想确认框确认或者异步操作之后跳转，请将逻辑代码置于return false之前，在回调中调用leave方法。',
                  );
                }
                // 防止onLeave重复执行
                context.callOnLeave = true;
                if (leaveResult === false) {
                  // 还原路由标记
                  context.restore = true;
                  // 还原为之前的路由，还原时所有的监听不会执行
                  normalLocation(props.location);
                  return this.routeComponent;
                }
              }
            }
          }
          // 初始化返回值
          this.routeComponent = null;
          if (match) {
            context.matched = this; // 解决Route在更新时不匹配问题
            // 记录当前路由
            activeRouteComponent = (
              <RouteCore
                {...this.props}
                wrapper={wrapper}
                location={getParamsLocation(location, path)}
                store={this.store}
                ref={this.ref}
              />
            );
            this.routeComponent = activeRouteComponent;
          }
          return this.routeComponent;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Route;
