import React from 'react';
import { Router, StaticRouter, Route, NuomiRoute, Redirect } from 'nuomi';
// import home from './home';
import login from './login';
import './public/config';

const loadHome = () => import('./home');

class App extends React.Component {
  render() {
    return (
      <StaticRouter>
        <Route path="/" {...login} />
        <NuomiRoute pathPrefix={/^\/(home|404)/} async={loadHome} />
        <Redirect to="/index" />
      </StaticRouter>
    );
  }
}

export default App;
