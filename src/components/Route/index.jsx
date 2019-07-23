import React from 'react';
import PropTypes from 'prop-types';
import NuomiRoute from '../NuomiRoute';
import RouterContext from '../RouterContext';
import { matchPath } from '../../core/router';

class Route extends React.PureComponent {
  static defaultProps = {
    wrapper: false,
  };

  static propTypes = {
    wrapper: PropTypes.bool,
  };

  static wrappers = [];

  constructor(...args) {
    super(...args);
    this.store = {};
    this.wrapperRef = React.createRef();
    this.routeComponent = null;
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
    return (
      <RouterContext.Consumer>
        {({ location }) => {
          const { path, wrapper } = this.props;
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
          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Route;
