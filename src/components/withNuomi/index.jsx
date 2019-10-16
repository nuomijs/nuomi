import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { getLocation } from '../../core/router';

const withNuomi = (WrapperComponent) => {
  return class WithNuomi extends React.PureComponent {
    static contextTypes = {
      nuomiProps: PropTypes.object,
      nuomiRouteProps: PropTypes.object,
    };

    static displayName = `withNuomi(${WrapperComponent.displayName || WrapperComponent.name})`;

    constructor(...args) {
      super(...args);
      const { nuomiProps, nuomiRouteProps } = this.context;
      invariant(
        nuomiProps,
        `不允许在 <Route>、<Nuomi>、<NuomiRoute> 外部使用 ${WithNuomi.displayName}`,
      );
      this.location = nuomiRouteProps ? nuomiRouteProps.location : getLocation();
    }

    render() {
      const { nuomiProps } = this.context;
      return <WrapperComponent {...this.props} nuomiProps={nuomiProps} location={this.location} />;
    }
  };
};

export default withNuomi;
