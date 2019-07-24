import React from 'react';
import { Router, Route, Nuomi } from 'nuomi';

class App extends React.PureComponent {
  render() {
    return (
      <Nuomi>
        <Router>
          <Route path="/" wrapper entry>1</Route>
          <Route path="/a/" wrapper>2</Route>
          <Route path="/b/" wrapper>3</Route>
        </Router>
      </Nuomi>
    );
  }
}

export default App;
