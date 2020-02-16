import React from 'react';
import {
  Router,
  StaticRouter,
  Route,
  NuomiRoute,
  Redirect,
  Link,
  NavLink,
  ShapeRoute,
} from 'nuomi';
import home from './home';
import login from './login';
import './public/config';
import routes from './home/public/routes';

// const loadHome = () => import('./home');

class App extends React.Component {
  constructor() {
    super();
    this.routes = [
      {
        path: '/',
        ...login,
      },
      {
        path: '/home',
        route: false,
        ...home,
        children: routes,
      },
      {
        to: '/',
      },
    ];
  }

  render() {
    return (
      <Router type="browser">
        <ShapeRoute routes={this.routes} />
        {/* <Route path="/" {...login} />
        <NuomiRoute path="/home/*" {...home} /> */}
        {/* <Route path="/home/*" {...home} /> */}
        {/* <Redirect to="/" /> */}
      </Router>
    );
  }
}

export default App;
