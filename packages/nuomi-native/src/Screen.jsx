import React from 'react';
import nuomi, { getDefaultProps } from 'nuomi/lib/core/nuomi';
import { removeReducer } from 'nuomi/lib/core/redux/reducer';
import { RoutePropTypes } from 'nuomi/lib/components/propTypes';
import BaseScreen from './BaseScreen';

export default class Screen extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.store = {};
  }

  componentWillUnmount() {
    removeReducer(this.store.id);
  }

  render() {
    const nuomiProps = nuomi.extend(getDefaultProps(), this.props);
    return <BaseScreen {...nuomiProps} store={this.store} />;
  }
}

Screen.propTypes = RoutePropTypes;
