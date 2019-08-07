import React from 'react';
import { Router, Route, NuomiRoute, Redirect } from 'nuomi';
import home from './home';
import login from './login';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" {...login} />
        <NuomiRoute prefix={/^\/(home|404)/} {...home} />
        <Redirect to="/" />
      </Router>
    );
  }
}

export default App;
