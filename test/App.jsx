import React from 'react';
import { Router, Route, Nuomi, Link, router, nuomi, connect } from 'nuomi';
import { extend } from '../src/utils';

class A extends React.PureComponent {
  render() {
    console.log(this.props)
    return '';
  }
}

const B = connect(() => ({ a:1 }))(A);

nuomi({
  onChange() {
    console.log(this)
  }
});

class App extends React.PureComponent {
  render() {
    return (
      <Nuomi>
        <B />
        <Router>
          <Route path="/" wrapper>1</Route>
          <Route path="/a/" wrapper>2</Route>
          <Route path="/b/" wrapper>3</Route>
          <Route path="/c/:a">4</Route>
          <Route path="/d/">
            <Link to="/a/" reload>toA</Link>
          </Route>
        </Router>
      </Nuomi>
    );
  }
}

export default App;
