import React from 'react';
import invariant from 'invariant';
import warning from 'warning';
import { isArray } from '../utils';
import router from '../core/router';
import { ShapeRoutePropTypes } from './propTypes';
import { RouterContext } from './Context';
import Route from './Route';
import NuomiRoute from './NuomiRoute';
import Redirect from './Redirect';

class Shape extends React.PureComponent {
  static propTypes = ShapeRoutePropTypes;

  getKey(key, i) {
    if (key) {
      return `${key}_${i}`;
    }
    return i;
  }

  getComponents(routes, parentPath) {
    const conponents = [];
    routes.filter((obj) => !!obj).forEach((obj, i) => {
      if (React.isValidElement(obj)) {
        conponents.push(React.cloneElement(obj, { key: this.getKey(obj.key, i) }));
      } else {
        const { key, route, children: childrenRoutes, ...props } = obj;
        const newProps = { ...props };
        const isRoutes = isArray(childrenRoutes) && childrenRoutes.length;
        let Component = Route;
        if (props.to) {
          Component = Redirect;
        } else if(props.path && route === false) {
          Component = NuomiRoute;
        }
        if (newProps.path) {
          newProps.path = router.mergePath(parentPath, newProps.path, isRoutes ? '/*' : '');
        }
        const children = isRoutes ? this.getComponents(childrenRoutes, newProps.path) : childrenRoutes;
        conponents.push(<Component key={this.getKey(key, i)} {...newProps} children={children} />);
      }
    });
    return conponents;
  }

  render() {
    const { routes } = this.props;
    const components = this.getComponents(routes);
    return <React.Fragment>{components}</React.Fragment>;
  }
}

export default class ShapeRoute extends React.Component {
  static propTypes = ShapeRoutePropTypes;

  static defaultProps = { routes: [] };

  static contextType = RouterContext;

  constructor(...args) {
    super(...args);
    const { location } = this.context;
    invariant(!!location, '不允许在 <Router> 外部使用 <ShapeRoute>');
  }

  render() {
    const { routes } = this.props;
    warning(!!routes.length, 'routes不能是空数组');
    return <Shape {...this.props} />
  }
}
