```
npm i --save nuomi
```

index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(<App />, document.querySelector('#root'));
```

layout.js
```js
import React from 'react';
import Effects from './effects';
import Layout from './components/Layout';

export default {
  id: 'global',
  state: {
    username: '',
  },
  effects() {
    return new Effects(this);
  },
  render() {
    return <Layout>{this.children}</Layout>;
  },
  onInit() {
    this.store.dispatch({
      type: '$getInfo',
    });
  },
};
```

detail.js
```js
import React from 'react';
import Effects from './effects';
import Layout from './components/Layout';

export default {
  path: '/detail/',
  state: {
    detail: '',
    count: 0,
  },
  effects() {
    return new Effects(this);
  },
  render() {
    return <Layout />;
  },
  onInit() {
    this.store.dispatch({
      type: '$getDetail',
    });
  },
};
```
