import React from 'react';
import { Router, Route, Nuomi } from 'nuomi';
import layout from './layout';
import pages from './pages';

class App extends React.Component {
  state = {};

  componentDidMount() {
    setTimeout(() => {
      this.setState({ destroy: true });
    }, 5000);
  }

  render() {
    return (
      <Nuomi {...layout}>
        {this.state.destroy !== true && (
          <Router entry="/">
            {pages.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Router>
        )}
      </Nuomi>
    );
  }
}

export default App;
