import React from 'react';
import PropTypes from 'prop-types';
import nuomi, { getDefaultProps } from 'nuomi/lib/core/nuomi';
import { removeReducer } from 'nuomi/lib/core/redux/reducer';
import { NuomiPropTypes } from 'nuomi/lib/components/propTypes';
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
  ...NuomiPropTypes,
  // eslint-disable-next-line react/require-default-props
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
