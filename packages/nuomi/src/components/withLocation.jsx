import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';

const withLocation = (WrapperComponent) => class WithLocation extends React.PureComponent {
    static contextType = RouterContext;

    static displayName = `withLocation(${WrapperComponent.displayName || WrapperComponent.name})`;

    constructor(...args) {
      super(...args);
      const { location } = this.context;
      invariant(!!location, `不允许在 <Router>、<Route>、<NuomiRoute> 外部使用 ${WithLocation.displayName}`);
    }

    render() {
      const { location } = this.context;
      return <WrapperComponent {...this.props} location={location} />;
    }
};

export default withLocation;
