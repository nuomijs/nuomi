import React from 'react';
import PropTypes from 'prop-types';
import NuomiRoute from '../NuomiRoute';
import RouterContext from '../RouterContext';
import { matchPath } from '../../core/router';

class Route extends React.PureComponent {
  static defaultProps = {
    path: '/',
    wrapper: false,
  };

  static propTypes = {
    path: PropTypes.string,
    wrapper: PropTypes.bool,
  };

  static wrappers = [];

  static paths = {};

  constructor(...args) {
    super(...args);
    this.store = {};
    this.wrapperRef = React.createRef();
    this.routeComponent = null;
    const { path } = this.props;
    if (!Route.paths[path]) {
      Route.paths[path] = this;
    }
  }

  componentDidMount() {
    const { current } = this.wrapperRef;
    if (current) {
      Route.wrappers.push(current);
    }
  }

  componentWillUnmount() {
    const { current } = this.wrapperRef;
    if (current) {
      Route.wrappers = Route.wrappers.filter((wrapper) => wrapper !== current);
    }
  }

  visibleWrapperHandler() {
    const { current } = this.wrapperRef;
    Route.wrappers.forEach((wrapper) => {
      const elem = wrapper;
      elem.style.display = current === elem ? 'block' : 'none';
    });
  }

  render() {
    const { path, wrapper } = this.props;
    // 重复的path将不被渲染
    if (Route.paths[path] !== this) {
      return null;
    }
    return (
      <RouterContext.Consumer>
        {({ location }) => {
          if (location) {
            const match = matchPath(location, path);
            if (match) {
              this.visibleWrapperHandler();
            }
            if (wrapper && this.routeComponent) {
              return this.routeComponent;
            }
            if (match) {
              const routeComponent = <NuomiRoute {...this.props} store={this.store} />;
              if (wrapper) {
                this.routeComponent = (
                  <div ref={this.wrapperRef} className="nuomi-route-wrapper">
                    {routeComponent}
                  </div>
                );
                return this.routeComponent;
              }
              return routeComponent;
            }
          }
          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Route;
