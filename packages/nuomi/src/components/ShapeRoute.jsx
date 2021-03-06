import React from 'react';
import invariant from 'invariant';
import { isArray } from '../utils';
import router from '../core/router';
import { ShapeRoutePropTypes } from './propTypes';
import { RouterContext } from './Context';
import Route from './Route';
import NuomiRoute from './NuomiRoute';
import Redirect from './Redirect';

const getKey = (key, i) => {
  if (key) {
    return `${key}_${i}`;
  }
  return i;
};

class ShapeComponent extends React.PureComponent {
  static propTypes = ShapeRoutePropTypes;

  static defaultProps = { routes: [] };

  getComponents(routes, parentPath) {
    const conponents = [];
    routes
      .filter((obj) => !!obj)
      .forEach((obj, i) => {
        if (React.isValidElement(obj)) {
          conponents.push(React.cloneElement(obj, { key: this.getKey(obj.key, i) }));
        } else {
          const {
            key, route, children: childrenRoutes, ...props
          } = obj;
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
          }
          const children = isRoutes
            ? this.getComponents(childrenRoutes, newProps.path)
            : childrenRoutes;
          conponents.push(
            <Component key={getKey(key, i)} {...newProps}>
              {children}
            </Component>,
          );
        }
      });
    return conponents;
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
