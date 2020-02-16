import React from 'react';
import invariant from 'invariant';
import { isArray } from '../utils';
import router from '../core/router';
import { ShapeRoutePropTypes } from './propTypes';
import { RouterContext } from './Context';
import Route from './Route';
import NuomiRoute from './NuomiRoute';
import Redirect from './Redirect';

class Shape extends React.PureComponent {
  static propTypes = ShapeRoutePropTypes;

  getComponents(routes, parentPath) {
    if (isArray(routes)) {
      const conponents = [];
      routes.forEach(({ key, route, routes: childrenRoutes, ...props }, i) => {
        const newProps = { ...props };
        let Component = Route;
        if (props.to) {
          Component = Redirect;
        } else if(props.path && route === false) {
          Component = NuomiRoute;
        }
        if (newProps.path) {
          const hasChildren = isArray(childrenRoutes) && childrenRoutes.length;
          newProps.path = router.mergePath(parentPath, newProps.path, hasChildren ? '/*' : '');
        }
        const children = this.getComponents(childrenRoutes, newProps.path);
        conponents.push(<Component key={key || i} {...newProps} children={children} />);
      });
      return conponents;
    }
    return null;
  }

  render() {
    const { routes } = this.props;
    const components = this.getComponents(routes);
    return <React.Fragment>{components}</React.Fragment>;
  }
}

export default class ShapeRoute extends React.Component {
  static propTypes = ShapeRoutePropTypes;

  static contextType = RouterContext;

  constructor(...args) {
    super(...args);
    const { location } = this.context;
    invariant(!!location, '不允许在 <Router> 外部使用 <ShapeRoute>');
  }

  render() {
    return <Shape {...this.props} />
  }
}
