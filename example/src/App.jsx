import React from 'react';
import { Router, StaticRouter, Route, NuomiRoute, Redirect } from 'nuomi';
// import home from './home';
import login from './login';
import './public/config';

const loadHome = () => import('./home');

class App extends React.Component {
  state = {
    toggle: true,
  };

  click = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };

  render() {
    return (
      <div>
        <div onClick={this.click}>Click</div>
        {this.state.toggle ? (
          <Router>
            <Route path="/" {...login} />
            <NuomiRoute pathPrefix={/^\/(home|404)/} async={loadHome} />
            <Redirect to="/index" />
          </Router>
        ) : (
          'xxxx'
        )}
      </div>
    );
  }
}

export default App;
