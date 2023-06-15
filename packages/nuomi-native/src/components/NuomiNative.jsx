import React from 'react';
import { configure } from 'nuomi/lib/core/nuomi';
import { extendArray } from 'nuomi/lib/utils/extend';
import { removeReducer } from 'nuomi/lib/core/redux/reducer';
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

  componentWillUnmount() {
    removeReducer(this.store.id);
  }

  render() {
    const { nuomiProps } = this.state;
    return <BaseNuomiNative {...nuomiProps} store={this.store} />;
  }
}

NuomiNative.propTypes = NuomiNativeProps;
