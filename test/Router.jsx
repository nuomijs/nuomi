import React from 'react';
import { Router as NuomiRouter, Route, connect } from 'nuomi';
import pages from './pages';

class Router extends React.Component {
  render() {
    const { routes } = this.props;
    return (
      <NuomiRouter entry="/">
        {pages.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </NuomiRouter>
    );
  }
}

export default connect(({ routes }) => ({ routes }))(Router);
