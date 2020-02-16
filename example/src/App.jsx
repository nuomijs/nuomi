import React from 'react';
import { Router, StaticRouter, Route, NuomiRoute, Redirect, Link, NavLink } from 'nuomi';
import home from './home';
import login from './login';
import './public/config';

// const loadHome = () => import('./home');

class App extends React.Component {
  constructor(){
    super();
    this.ref = React.createRef();
  }

  componentDidMount(){
    console.log(this.ref)
  }

  render() {
    return (
      <Router>
        <NavLink ref={this.ref} activeClassName="xx">1111</NavLink>
        <Route path="/" {...login} />
        <NuomiRoute path="/home/*" {...home} />
        {/* <Route path="/home/*" {...home} /> */}
        <Redirect to="/" />
      </Router>
    );
  }
}

export default App;
