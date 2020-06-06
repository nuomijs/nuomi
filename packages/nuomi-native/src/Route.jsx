import React from 'react';
import { RouterContext } from 'nuomi/lib/components/Context';
import { removeReducer } from 'nuomi/lib/core/redux/reducer';
import { RoutePropTypes } from 'nuomi/lib/components/propTypes';
import invariant from 'invariant';
import BaseRoute from './BaseRoute';

export default class Route extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.store = {};
  }

  componentWillUnmount() {
    removeReducer(this.store.id);
  }

  render() {
    const {
      path,
      id,
      async,
      state,
      reducers,
      effects,
      render,
      children,
      onInit,
      onChange,
      ...rest
    } = this.props;

    const Component = () => <BaseRoute {...this.props} store={this.store} />;

    return (
      <RouterContext.Consumer>
        {(Screen) => {
          invariant(Screen, '不允许在 <Router> 外部使用 <Route>');

          return <Screen {...rest} name={path} component={Component} />;
        }}
      </RouterContext.Consumer>
    );
  }
}

Route.propTypes = RoutePropTypes;
