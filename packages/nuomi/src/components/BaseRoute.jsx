import React from 'react';
import BaseNuomi from './BaseNuomi';
import { isFunction } from '../utils';
import { RoutePropTypes } from './propTypes';
import { removeReducer } from '../core/redux/reducer';
import { NuomiContext } from './Context';
import { callAfterListeners } from '../core/router';

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
    const isChange = prevProps.location !== props.location;
    if (isChange) {
      if (props.reload === true && props.location.reload === true) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          key: state.key + 1,
        });
        this.replaceState();
        this.execInit();
        this.routerChange();
      } else {
        this.routerChange(true);
      }
    }
  }

  initialize() {
    this.createStore();
    this.createReducer();
    this.execInit();
    this.routerChange();
    callAfterListeners();
  }

  replaceState() {
    const { props } = this;
    props.store.restoreState();
  }

  routerChange(activate) {
    const { props } = this;
    if (isFunction(props.onShow)) {
      props.onShow(this.getNuomiProps());
    }
    if (activate && isFunction(props.onActivate)) {
      props.onActivate(this.getNuomiProps());
    }
  }

  render() {
    const { props, state } = this;
    const nuomiProps = this.getNuomiProps();
    const children = props.render ? props.render({ ...nuomiProps, children: props.children }) : props.children;
    return children ? (
      <NuomiContext.Provider key={state.key} value={{ nuomi: nuomiProps }}>
        {children}
      </NuomiContext.Provider>
    ) : null;
  }
}
