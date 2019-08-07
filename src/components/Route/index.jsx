import React from 'react';
import PropTypes from 'prop-types';
import RouterContext from '../RouterContext';
import RouteCore from '../RouteCore';
import { removeReducer } from '../../core/redux/reducer';
import { matchPath, savePath, removePath } from '../../core/router';
import { getDefaultProps } from '../../core/nuomi';
import extend from '../../utils/extend';

class Route extends React.PureComponent {
  static propTypes = {
    path: PropTypes.string,
    wrapper: PropTypes.bool,
  };

  constructor(...args) {
    super(...args);
    this.store = {};
    this.routeCore = null;
    this.ref = React.createRef();
    const { path } = this.props;
    savePath(path);
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
    const props = extend(getDefaultProps(), this.props);
    const { path, wrapper } = props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { location } = context;
          let match = matchPath(location, path);
          if (context.matched === true) {
            match = false;
          }
          if (wrapper && this.routeCore && !match) {
            return this.routeCore;
          }
          if (match) {
            // eslint-disable-next-line no-param-reassign
            context.matched = true;
            this.routeCore = (
              <RouteCore {...props} location={location} store={this.store} ref={this.ref} />
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
