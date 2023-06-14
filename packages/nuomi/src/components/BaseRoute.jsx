import React from 'react';
import BaseNuomi from './BaseNuomi';
import { isFunction } from '../utils';
import { RoutePropTypes } from './propTypes';
import { NuomiContext } from './Context';
import { callShowedListener, addReloadListener } from '../core/router';

export default class BaseRoute extends BaseNuomi {
  static propTypes = RoutePropTypes;

  state = {
    key: 0,
  };

  reloadRoute() {
    const { props } = this;
    // 子路由重新装载，render会优先于componentWillUnmount执行，导致无法渲染子路由，需前置清理数据
    if (props.store.id) {
      props.getRouterContext().matched = null;
      this.setState(({ key }) => ({
        key: key + 1,
      }));
      this.replaceState();
      this.execInit();
      this.routerChange();
    }
  }

  initialize() {
    this.createStore();
    this.execInit();
    this.routerChange();
    callShowedListener();
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

  componentWillUnmount() {
    const { cache } = this.props;
    if (cache !== 'state' && cache !== true) {
      this.removeStore();
    }
    this.removeListener();
  }

  componentDidMount() {
    this.unListener = addReloadListener((currentLocation) => {
      const { reload, location } = this.props;
      if (reload && location === currentLocation) {
        this.reloadRoute();
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (props === prevProps) {
      return;
    }
    const isChange = prevProps.location !== props.location;
    if (isChange) {
      this.routerChange(true);
      callShowedListener();
    }
  }

  render() {
    const { state } = this;
    const nuomiProps = this.getNuomiProps();
    const children = this.getChildren();
    if (children != null) {
      return (
        <NuomiContext.Provider key={state.key} value={{ nuomi: nuomiProps }}>
          {children}
        </NuomiContext.Provider>
      );
    }
    return null;
  }
}
