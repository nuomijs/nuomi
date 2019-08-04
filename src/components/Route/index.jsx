import React from 'react';
import PropTypes from 'prop-types';
import NuomiRoute from '../NuomiRoute';
import RouterContext from '../RouterContext';
import { removeReducer } from '../../core/redux/reducer';
import { matchPath, savePath, removePath } from '../../core/router';
import { getDefaultProps } from '../../core/nuomi';
import extend from '../../utils/extend';

class Route extends React.PureComponent {
  static propTypes = {
    path: PropTypes.string,
    wrapper: PropTypes.bool,
  };

  static wrappers = [];

  constructor(...args) {
    super(...args);
    this.store = {};
    this.routeComponent = null;
    this.ref = React.createRef();
    this.repeated = true;
    const { path } = this.props;
    if (savePath(path)) {
      this.repeated = false;
    }
  }

  componentWillUnmount() {
    const { path, wrapper } = this.props;
    const { current } = this.ref;
    const { id } = this.store;
    if (wrapper && current) {
      current.removeWrapper();
    }
    if (!this.repeated) {
      removePath(path);
    }
    if (id) {
      removeReducer(id);
    }
  }

  render() {
    const props = extend(getDefaultProps(), this.props);
    const { path, wrapper } = props;
    // 重复的path将不被渲染
    if (this.repeated) {
      return null;
    }
    return (
      <RouterContext.Consumer>
        {({ location }) => {
          const match = matchPath(location, path);
          if (wrapper && this.routeComponent && !match) {
            return this.routeComponent;
          }
          if (match) {
            this.routeComponent = (
              <NuomiRoute {...props} location={location} store={this.store} ref={this.ref} />
            );
            return this.routeComponent;
          }
          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Route;
