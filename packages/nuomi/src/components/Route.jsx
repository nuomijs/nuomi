import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';
import RouteCore from './RouteCore';
import router from '../core/router';
import { configureNuomi } from '../core/nuomi';
import { RoutePropTypes } from './propTypes';
import { removeReducer } from '../core/redux/reducer';

export default class Route extends React.PureComponent {
  static propTypes = RoutePropTypes;

  static defaultProps = {
    path: '',
    state: {},
    reducers: {},
    effects: {},
  };

  constructor(...args) {
    super(...args);
    this.store = {};
    this.routeComponent = null;
    this.wrappers = [];
  }

  componentWillUnmount() {
    removeReducer(this.store.id);
    if (this.context.matched === this) {
      this.context.matched = null;
    }
  }

  render() {
    const defaultProps = configureNuomi();
    const { path, cache = defaultProps.cache } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <Route>');
          this.context = context;

          const allowMatch = !context.matched || context.matched === this || context.route.reload === true;
          const matchRoute = allowMatch && router.matchPath(context.route, path);

          if (!matchRoute) {
            // 设置了cache没有匹配路由，不销毁，只隐藏
            if (cache === true && this.routeComponent !== null) {
              return this.routeComponent;
            }
            return null;
          }

          this.routeComponent = null;
          const contextValue = {
            ...context,
            matched: null,
            wrappers: context.childrenWrappers || context.wrappers,
            childrenWrappers: this.wrappers,
          };

          if (matchRoute) {
            context.matched = this;
            this.routeComponent = (
              <RouterContext.Provider value={contextValue}>
                <RouteCore {...this.props} cache={cache} route={matchRoute} store={this.store} />
              </RouterContext.Provider>
            );
          }

          return this.routeComponent;
        }}
      </RouterContext.Consumer>
    );
  }
}
