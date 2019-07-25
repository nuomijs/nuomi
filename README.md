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
      type: 'initData',
    });
  },
};
```

detail effects.js
```js
import BaseEffects from '../../../public/effects';
import services from '../services';

export default class Effects extends BaseEffects {
  count() {
    const { count } = this.getState();
    this.dispatch({
      type: 'updateState',
      payload: {
        count: count + 1,
      },
    });
  }

  async $getDetail() {
    const data = await services.getDetail();
    this.dispatch({
      type: 'updateState',
      payload: data,
    });
  }

  async initData() {
    await this.$getDetail();
  }
}
```
