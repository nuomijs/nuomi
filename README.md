安装
```
yarn add nuomi
```

demo
```
yarn install
yarn start
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

detail Layout.jsx
```js
import React from 'react';
import { connect } from 'nuomi';

class Layout extends React.PureComponent {
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

日志：
0.2.1
增加NuomiRoute、Redirect组件 移出Router组件entry props
代码优化

0.2.2
模块异步加载支持import()动态导入

0.2.3
修复同时执行多个Redirect bug

0.2.4
nuomi由方法修改为对象，包含config、getDefaultProps、extend三个属性方法

0.2.5
修复Route组件更新时不能再次匹配问题
修复Route，Nuomi组件卸载时报setState的错误

0.2.6
修复data取值无效问题
Router组件prefix修改为hashPrefix
NuomiRoute组件prefix修改为pathPrefix
router.location增加第四个参数，如果跳转的path就是当前路由path，用来决定是否强制跳转，默认是true
优化代码
