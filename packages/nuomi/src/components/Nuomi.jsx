import React from 'react';
import BaseNuomi from './BaseNuomi';
import { configure } from '../core/nuomi';
import { extendArray } from '../utils/extend';
import { isFunction } from '../utils';
import { NuomiPropTypes } from './propTypes';

export default class Nuomi extends React.PureComponent {
  static propTypes = NuomiPropTypes;

  constructor(...args) {
    super(...args);
    this.mounted = false;
    this.store = {};
    const { load } = this.props;
    const isAsync = isFunction(load);
    this.state = {
      loaded: !isAsync,
      nuomiProps: extendArray(configure(), [this.props]),
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.loadProps();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  loaded(props) {
    const { nuomiProps } = this.state;
    if (this.mounted === true) {
      this.setState({
        loaded: true,
        nuomiProps: extendArray(nuomiProps, [props]),
      });
    }
  }

  loadProps() {
    const { load } = this.props;
    const { loaded } = this.state;
    if (!loaded) {
      const loadResult = load((props) => {
        this.loaded(props);
      });
      if (loadResult && loadResult instanceof Promise) {
        loadResult.then((module) => this.loaded(module.default));
      }
    }
  }

  getNuomiProps() {
    return { ...this.state.nuomiProps, ...this.props };
  }

  render() {
    const { loaded } = this.state;
    if (loaded) {
      const { store, ...rest } = this.getNuomiProps();
      return <BaseNuomi {...rest} store={store === null ? null : this.store} />;
    }
    return null;
  }
}
