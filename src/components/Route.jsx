import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';
import RouteCore from './RouteCore';
import router, {
  savePath,
  removePath,
} from '../core/router';
import { getDefaultProps } from '../core/nuomi';
import { RoutePropTypes } from './propTypes';

export default class Route extends React.PureComponent {
  static propTypes = RoutePropTypes;

  static defaultProps = {
    id: '',
    path: '',
    reload: false,
    state: {},
    data: {},
    reducers: {},
  };

  constructor(...args) {
    super(...args);
    this.store = {};
    this.routeTempData = {};
    this.routeComponent = null;
    this.wrappers = [];
    const { path } = this.props;
    savePath(path);
  }

  componentWillUnmount() {
    const { path } = this.props;
    // 嵌套路由时防止子路由被销毁后再创建无法匹配问题
    if (this.context && this.context.matched === this) {
      this.context.matched = null;
    }
    removePath(path);
  }

  render() {
    const defaultProps = getDefaultProps();
    const { path, wrapper = defaultProps.wrapper } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          this.context = context;
          invariant(context, '不允许在 <Router> 外部使用 <Route>');
          const routeCoreContextValue = {
            ...context,
            wrappers: context.childrenWrappers || context.wrappers,
            childrenWrappers: this.wrappers,
            routeTempData: this.routeTempData,
          };
          const { location } = context;
          const matchResult = router.matchPath(location, path);
          let match = matchResult !== false;
          // context.matched 表示同一个上下文中，多个路由只匹配一个
          if (context.matched && context.matched !== this) {
            match = false;
          }
          // 设置了wrapper没有匹配路由，不销毁，只隐藏
          if (wrapper === true && this.routeComponent !== null && !match) {
            return this.routeComponent;
          }

          // 初始化返回值
          this.routeComponent = null;
          if (match) {
            context.matched = this; // 解决Route在更新时不匹配问题
            this.routeComponent = (
              <RouterContext.Provider value={routeCoreContextValue}>
                <RouteCore
                  {...this.props}
                  wrapper={wrapper}
                  location={matchResult || location}
                  store={this.store}
                />
              </RouterContext.Provider>
            );
          }
          return this.routeComponent;
        }}
      </RouterContext.Consumer>
    );
  }
}
