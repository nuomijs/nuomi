import React from 'react';
import { configureNuomi, extendNuomi } from 'nuomi/lib/core/nuomi';
import { removeReducer } from 'nuomi/lib/core/redux/reducer';
import BaseNuomi from './BaseNuomi';
import { NuomiNativeProps } from './propTypes';

export default class NuomiNative extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.store = {};
  }

  componentWillUnmount() {
    removeReducer(this.store.id);
  }

  render() {
    const nuomiProps = extendNuomi(configureNuomi(), this.props);
    return <BaseNuomi {...nuomiProps} store={this.store} />;
  }
}

NuomiNative.propTypes = NuomiNativeProps;
