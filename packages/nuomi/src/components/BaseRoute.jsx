import React from 'react';
import BaseNuomi from './BaseNuomi';
import { isFunction } from '../utils';
import { RoutePropTypes } from './propTypes';
import { removeReducer } from '../core/redux/reducer';
import { NuomiContext } from './Context';

export default class BaseRoute extends BaseNuomi {
  static propTypes = RoutePropTypes;

  state = {
    key: 0,
  };

  componentWillUnmount() {
    const { store, cache } = this.props;
    if (cache !== 'state' && cache !== true) {
      removeReducer(store.id);
      store.id = null;
    }
    this.removeListener();
  }

  componentDidUpdate(prevProps) {
    const { props, state } = this;
    if (props === prevProps) {
      return;
    }
    const { store } = props;
    if (store.id) {
      const isReload = props.reload === true;
      const isChange = prevProps.route !== props.route;
      if (isReload) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          key: state.key + 1,
        });
        this.replaceState();
        this.execInit();
        this.routerChange();
      } else if (isChange) {
        this.routerChange(true);
      }
    }
  }

  initialize() {
    this.createStore();
    this.createReducer();
    this.execInit();
    this.routerChange();
  }

  replaceState() {
    const { props } = this;
    props.store.dispatch({
      type: '@replace',
      payload: { ...props.state },
    });
  }

  routerChange(activate) {
    const { props } = this;
    if (isFunction(props.onShow)) {
      props.onShow(props);
    }
    if (activate && isFunction(props.onActivate)) {
      props.onActivate(props);
    }
  }

  render() {
    const { props, state } = this;
    const children = props.render ? props.render(props) : props.children;
    return children ? (
      <NuomiContext.Provider key={state.key} value={{ nuomi: this.props }}>
        {children}
      </NuomiContext.Provider>
    ) : null;
  }
}
