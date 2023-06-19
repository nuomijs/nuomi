import React from 'react';
import { configure } from 'nuomi/lib/core/nuomi';
import { extendArray } from 'nuomi/lib/utils/extend';
import BaseNuomiNative from './BaseNuomiNative';
import { NuomiNativeProps } from './propTypes';

export default class NuomiNative extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.store = {};
    this.state = {
      nuomiProps: extendArray(configure(), [this.props]),
    };
  }

  getNuomiProps() {
    return { ...this.state.nuomiProps, ...this.props };
  }

  render() {
    const { store, ...rest } = this.getNuomiProps();
    return <BaseNuomiNative {...rest} store={store === null ? null : this.store} />;
  }
}

NuomiNative.propTypes = NuomiNativeProps;
