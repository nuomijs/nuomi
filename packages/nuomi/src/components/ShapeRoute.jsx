import React from 'react';
import invariant from 'invariant';
import { isArray } from '../utils';
import router from '../core/router';
import { ShapeRoutePropTypes } from './propTypes';
import { RouterContext } from './Context';
import Route from './Route';
import Redirect from './Redirect';
import NuomiRoute from './NuomiRoute';

const getKey = ({ key, path, to }, i) => {
  if (key) {
    return key;
  }
  if (path) {
    return `path_${path}`;
  }
  if (to) {
    return `to_${to}`;
  }
  return i;
};

class ShapeComponent extends React.PureComponent {
  static propTypes = ShapeRoutePropTypes;

  static defaultProps = { routes: [] };

  getComponents(routes, parentPath) {
    const components = [];
    routes
      .filter((obj) => !!obj)
      .forEach((obj, i) => {
        if (React.isValidElement(obj)) {
          components.push(React.cloneElement(obj, { key: getKey(obj, i) }));
        } else {
          const { route, children: childrenRoutes, ...props } = obj;
          const newProps = { ...props };
          const isRoutes = isArray(childrenRoutes) && childrenRoutes.length;
          let Component = Route;
          if (props.to) {
            Component = Redirect;
          } else if (props.path && route === false) {
            Component = NuomiRoute;
          }
          if (newProps.path) {
            newProps.path = router.mergePath(parentPath, newProps.path, isRoutes ? '/*' : '');
            if (newProps.name) {
              router.namePath(newProps.name, newProps.path);
            }
          }
          const children = isRoutes ? this.getComponents(childrenRoutes, newProps.path) : childrenRoutes;
          components.push(
            <Component {...newProps} key={getKey(newProps, i)}>
              {children}
            </Component>,
          );
        }
      });
    return components;
  }

  render() {
    const { routes } = this.props;
    return this.getComponents(routes);
  }
}

const ShapeRoute = (props) => (
  <RouterContext.Consumer>
    {(context) => {
      invariant(context, '不允许在 <Router> 外部使用 <ShapeRoute>');

      return <ShapeComponent {...props} />;
    }}
  </RouterContext.Consumer>
);

export default ShapeRoute;
