/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import nuomi, { getDefaultProps } from 'nuomi/lib/core/nuomi';
import { removeReducer } from 'nuomi/lib/core/redux/reducer';
import BaseNuomi from './BaseNuomi';

export default class NuomiNative extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.store = {};
  }

  componentWillUnmount() {
    removeReducer(this.store.id);
  }

  render() {
    const nuomiProps = nuomi.extend(getDefaultProps(), this.props);
    return <BaseNuomi {...nuomiProps} store={this.store} />;
  }
}

NuomiNative.propTypes = {
  id: PropTypes.string,
  state: PropTypes.object,
  reducers: PropTypes.objectOf(PropTypes.func),
  effects: PropTypes.objectOf(PropTypes.func),
  render: PropTypes.func,
  onInit: PropTypes.func,
  onShow: PropTypes.func,
};
