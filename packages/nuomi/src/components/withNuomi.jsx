import React from 'react';
import invariant from 'invariant';
import { NuomiContext } from './Context';

const withNuomi = (WrapperComponent) => class WithNuomi extends React.PureComponent {
    static contextType = NuomiContext;

    static displayName = `withNuomi(${WrapperComponent.displayName || WrapperComponent.name})`;

    constructor(...args) {
      super(...args);
      const { nuomi } = this.context;
      invariant(!!nuomi, `不允许在 <Route>、<Nuomi>、<NuomiRoute> 外部使用 ${WithNuomi.displayName}`);
    }

    render() {
      const { nuomi } = this.context;
      return <WrapperComponent {...this.props} nuomi={nuomi} />;
    }
};

export default withNuomi;
