import React from 'react';
import { Router, StaticRouter, Route, NuomiRoute, Redirect } from 'nuomi';
import home from './home';
import login from './login';
import './public/config';

// const loadHome = () => import('./home');

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" {...login} />
        <NuomiRoute path="/home/*" {...home} />
        {/* <Route path="/home/*" {...home} /> */}
        <Redirect to="/" />
      </Router>
    );
  }
}

export default App;
