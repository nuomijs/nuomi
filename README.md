安装
```
yarn add nuomi
```

demo
```
cd example
yarn install
yarn start
```

index.js
```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Nuomi } from 'nuomi';
import layout from './layout';
import pages from './pages';

class App extends Component {
  render() {
    return (
      <Nuomi {...layout}>
        <Router>
          {pages.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect from="/" to="/home" />
          <Redirect to="/home" />
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
import Layout from './components/Layout';

export default {
  id: 'global',
  state: {
    username: '',
  },
  effects: {
    async $getInfo() {
      const data = await services.getInfo();
      this.dispatch({
        type: '_updateState',
        payload: data,
      });
    },
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
import Layout from './components/Layout';

export default {
  path: '/detail',
  state: {
    detail: '',
    count: 0,
  },
  effects: {
    count() {
      const { count } = this.getState();
      this.dispatch({
        type: '_updateState',
        payload: {
          count: count + 1,
        },
      });
    },
    async $getDetail() {
      const data = await services.getDetail();
      this.dispatch({
        type: '_updateState',
        payload: data,
      });
    },
    async initData() {
      await this.$getDetail();
    },
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

detail Layout.jsx
```js
import React, { PureComponent } from 'react';
import { connect } from 'nuomi';

class Layout extends PureComponent {
  click = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'count',
    });
  };

  render() {
    const { detail, count, loadings } = this.props;
    return (
      <div>
        {loadings.$getDtail === true && <span>正在加载中...</span>}
        {detail}
        <span onClick={this.click}>攒（{count}）</span>
      </div>
    );
  }
}

export default connect(({ detail, count, loadings }) => ({ detail, count, loadings }))(Layout);
```
