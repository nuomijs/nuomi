import React from 'react';
import { Router, Route, Nuomi } from 'nuomi';
import layout from './layout';
import pages from './pages';

class App extends React.Component {
  render() {
    return (
      <Nuomi {...layout}>
        <Router entry="/">
          {pages.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Router>
      </Nuomi>
    );
  }
}

export default App;
