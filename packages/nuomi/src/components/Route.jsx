import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';
import RouteCore from './RouteCore';
import { match } from '../core/router';
import { configure } from '../core/nuomi';
import { RoutePropTypes } from './propTypes';

export default class Route extends React.PureComponent {
  static propTypes = RoutePropTypes;

  static defaultProps = {
    path: '',
  };

  constructor(...args) {
    super(...args);
    this.store = {};
    this.routeComponent = null;
    this.wrappers = [];
    this.context = {};
    this.state = {
      mounted: false,
    };
  }

  componentWillUnmount() {
    if (this.context.matched === this) {
      this.context.matched = null;
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  render() {
    const defaultProps = configure();
    const {
      path, name, cache = defaultProps.cache, store, ...rest
    } = this.props;
    const { mounted } = this.state;
    if (!mounted) {
      return null;
    }
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <Route>');
          this.context = context;

          const allowMatch = !context.matched || context.matched === this;
          let matchLocation = match(context.location, { path, name }, true);

          if (!allowMatch) {
            matchLocation = false;
          }

          if (!matchLocation) {
            // 设置了cache没有匹配路由，不销毁，只隐藏
            if (cache === true && this.routeComponent !== null) {
              return this.routeComponent;
            }
            return null;
          }

          this.routeComponent = null;
          const contextValue = {
            ...context,
            location: matchLocation,
            matched: null,
            wrappers: context.childrenWrappers || context.wrappers,
            childrenWrappers: this.wrappers,
          };

          if (matchLocation) {
            context.matched = this;
            this.routeComponent = (
              <RouterContext.Provider value={contextValue}>
                <RouteCore
                  {...rest}
                  path={path}
                  name={name}
                  cache={cache}
                  location={matchLocation}
                  store={store === null ? null : this.store}
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
