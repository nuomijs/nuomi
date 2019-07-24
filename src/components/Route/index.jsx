import React from 'react';
import PropTypes from 'prop-types';
import NuomiRoute from '../NuomiRoute';
import RouterContext from '../RouterContext';
import { matchPath, savePath, removePath } from '../../core/router';
import parser from '../../utils/parser';

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

  constructor(...args) {
    super(...args);
    this.store = {};
    this.wrapperRef = React.createRef();
    this.routeComponent = null;
    this.state = { allow: false };
    const { path } = this.props;
    if (savePath(path)) {
      this.state.allow = true;
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
    const { allow } = this.state;
    const { path } = this.props;
    if (allow) {
      removePath(path);
    }
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
    const { allow } = this.state;
    // 重复的path将不被渲染
    if (!allow) {
      return null;
    }
    return (
      <RouterContext.Consumer>
        {({ location }) => {
          const match = matchPath(location, path);
          if (match) {
            this.visibleWrapperHandler();
          }
          if (!location.reload && wrapper && this.routeComponent) {
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
          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Route;
