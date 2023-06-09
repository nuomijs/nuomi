import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';
import RouteCore from './RouteCore';
import router, { removeMatchPath } from '../core/router';
import { configure } from '../core/nuomi';
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
    if (this.props.path) {
      removeMatchPath(this.props.path);
    }
    if (this.context.matched === this) {
      this.context.matched = null;
    }
  }

  render() {
    const defaultProps = configure();
    const { path, cache = defaultProps.cache } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <Route>');
          this.context = context;

          const allowMatch = !context.matched || context.matched === this;
          const match = allowMatch && router.matchPath(context.location, path);

          if (!match) {
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

          if (match) {
            if (context.matched) {
              context.matched = null;
            }
            context.matched = this;
            this.routeComponent = (
              <RouterContext.Provider value={contextValue}>
                <RouteCore {...this.props} cache={cache} location={match} store={this.store} />
              </RouterContext.Provider>
            );
          }

          return this.routeComponent;
        }}
      </RouterContext.Consumer>
    );
  }
}
