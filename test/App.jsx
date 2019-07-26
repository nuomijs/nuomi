import React from 'react';
import { Nuomi } from 'nuomi';
import layout from './layout';
import Router from './Router';

class App extends React.Component {
  render() {
    return (
      <Nuomi {...layout}>
        <Router />
      </Nuomi>
    );
  }
}

export default App;
