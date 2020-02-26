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
  router,
} from 'nuomi';
import home from './home';
import login from './login';
import './public/config';
import routes from './home/public/routes';

// console.log(router.mergePath('/', '/home', '/list'))

// const loadHome = () => import('./home');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      routes: [
        {
          path: '/',
          ...login,
        },
        {
          path: '/home',
          ...home,
          route: false,
          children: [...routes, { path: '*', children: '404' }],
        },
        // {
        //   to: '/',
        // },
      ],
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     routes: [
    //       {
    //         path: '/a',
    //         ...login,
    //         children: '账号密码：nuomi',
    //       },
    //       {
    //         path: '/home',
    //         route: false,
    //         ...home,
    //         children: [...routes, { path: '*', children: '404' }],
    //       },
    //       // {
    //       //   to: '/a',
    //       // },
    //     ],
    //   });
    // }, 1000);
  }

  render() {
    return (
      <Router>
        <ShapeRoute routes={this.state.routes} />
        {/* <Route path="/" {...login} />
        <NuomiRoute path="/home/*" {...home} /> */}
        {/* <Route path="/home/*" {...home} /> */}
        {/* <Redirect to="/" /> */}
      </Router>
    );
  }
}

export default App;
