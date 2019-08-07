import React from 'react';
import { Router, Route, NuomiRoute, Redirect } from 'nuomi';
import home from './home';
import login from './login';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/index" {...login} />
        <NuomiRoute prefix={/^\/(home|404)/} {...home} />
        <Redirect from="/" to="/index" />
        <Redirect to="/index" />
      </Router>
    );
  }
}

export default App;
