import React from 'react';
import PropTypes from 'prop-types';
import { getLocation } from '../../core/router';

const withNuomi = (WrapperComponent) => {
  return class WithNuomi extends React.PureComponent {
    static contextTypes = {
      nuomiProps: PropTypes.object,
    };

    constructor(...args) {
      super(...args);
      const { nuomiProps } = this.context;
      this.location = nuomiProps ? nuomiProps.location : getLocation();
    }

    render() {
      const { nuomiProps } = this.context;
      return <WrapperComponent {...this.props} nuomiProps={nuomiProps} location={this.location} />;
    }
  };
};

export default withNuomi;
