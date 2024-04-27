import React from 'react';

const RouterContext = React.createContext({});
RouterContext.displayName = 'RouterContext';

const NuomiContext = React.createContext({});
NuomiContext.displayName = 'NuomiContext';

export { RouterContext, NuomiContext };
