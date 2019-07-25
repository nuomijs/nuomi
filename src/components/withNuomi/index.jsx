import React from 'react';
import PropTypes from 'prop-types';

const withNuomi = (WrapperComponent) => {
  return class WithNuomi extends React.PureComponent {
    static contextTypes = {
      sourceProps: PropTypes.object,
    };

    render() {
      const { sourceProps } = this.context;
      return <WrapperComponent {...this.props} sourceProps={sourceProps} />;
    }
  };
};

export default withNuomi;
