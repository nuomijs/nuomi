import React from 'react';
import PropTypes from 'prop-types';
import { getLocation } from '../../core/router';

const withNuomi = (WrapperComponent) => {
  return class WithNuomi extends React.PureComponent {
    static contextTypes = {
      sourceProps: PropTypes.object,
    };

    constructor(...args) {
      super(...args);
      const { sourceProps } = this.context;
      this.location = sourceProps ? sourceProps.location : getLocation();
    }

    render() {
      const { sourceProps } = this.context;
      return (
        <WrapperComponent {...this.props} sourceProps={sourceProps} location={this.location} />
      );
    }
  };
};

export default withNuomi;
