import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router, useConnect, Link, Route, Redirect,
} from 'nuomi';

const Home = () => {
  const [{ username }] = useConnect();
  return (
    <div>
      hello,
      {' '}
      <Link to="/list">{username}</Link>
    </div>
  );
};

const List = () => {
  const [{ dataSource }] = useConnect();
  return (
    <ul>
      {dataSource.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
};

function App() {
  return (
    <Router type="browser">
      <Route path="/" id="global" state={{ username: 'home' }}>
        <Home />
      </Route>
      <Route path="/list" id="list" state={{ dataSource: [] }}>
        <List />
      </Route>
      <Redirect to="/" />
    </Router>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
