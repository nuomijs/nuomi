import React from 'react';
import { Router, Route, NuomiRoute, Redirect } from 'nuomi';
// import home from './home';
import login from './login';
import './public/config';

const loadHome = () => import('./home');

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/index" {...login} />
        <NuomiRoute pathPrefix={/^\/(home|404)/} async={loadHome} />
        <Redirect from="/" to="/index" />
        <Redirect to="/index" />
      </Router>
    );
  }
}

export default App;
