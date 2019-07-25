import React from 'react';
import { Router, Route, Nuomi, router, nuomi } from 'nuomi';



nuomi({
  onChange() {
    console.log(this)
  }
});

class App extends React.PureComponent {
  click = () => {
    router.location('/c/', { a:2 });
  };

  render() {
    return (
      <Nuomi>
        <Router>
          <Route path="/" wrapper>1</Route>
          <Route path="/a/" wrapper>2</Route>
          <Route path="/b/" wrapper>3</Route>
          <Route path="/c/">4</Route>
          <Route path="/d/">
            <span onClick={this.click}>haha</span>
          </Route>
        </Router>
      </Nuomi>
    );
  }
}

export default App;
