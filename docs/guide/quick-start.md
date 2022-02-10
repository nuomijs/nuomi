---
title: 快速上手
---

在此之前你需要安装 [nodejs](https://nodejs.org) ，包管理工具使用的是 [yarn](https://www.yarnpkg.com/lang/en/) ，你也可以使用 [npm](https://www.npmjs.com/) 来安装包。

## 安装脚手架

初始化项目用的是 [create-react-app](https://create-react-app.dev/)，你也可以使用自己喜欢的脚手架。

```sh
yarn global add create-react-app
```

## 创建应用

```sh
create-react-app new-project
cd new-project
yarn eject
```

通过 `eject` 释放配置文件方便修改。

## 安装依赖包

安装框架 `nuomi` 和组件库 [antd](https://ant.design/index-cn)。

```sh
yarn add nuomi antd
```

安装 `babel-plugin-import` 插件用来按需加载 `antd` 的脚本和样式，具体详见[官网](https://ant.design/docs/react/introduce-cn#示例)。

```sh
yarn add babel-plugin-import --dev
```

编辑 `package.json` 使插件生效。

```diff
"babel": {
  "presets": [
    "react-app"
  ],
+ "plugins": [
+   [
+     "import",
+     {
+       "libraryName": "antd",
+       "style": "css"
+     }
+   ]
+ ]
}
```

让项目运行起来

```sh
yarn start
```

接下来使用框架开发一个应用，需求是展示一个列表，有删除功能。

## 编写nuomiProps

为什么取名叫 `nuomiProps` 稍后见分晓。

新增 `src/list.js`

```js
export default {
  state: {
    dataSource: []
  },
  reducers: {
    updateState: (state, { payload }) => ({ ...state, ...payload })
  },
  effects: {
    async $getList() {
      // 模拟请求
      const dataSource = await new Promise((res) => {
        setTimeout(() => {
          res([
            { name: 'react' },
            { name: 'redux' },
            { name: 'router' }
          ]);
        }, 500);
      });

      this.dispatch({
        type: 'updateState',
        payload: { dataSource }
      });
    },
    remove({ name }) {
      const { dataSource } = this.getState();

      this.dispatch({
        type: 'updateState',
        payload: {
          dataSource: dataSource.filter((v) => v.name !== name)
        }
      });
    }
  },
  onInit() {
    this.store.dispatch({
      type: '$getList'
    });
  }
}
```

该文件导出一个对象，`state` 定义初始状态；`reducers` 控制状态的更新；`effects` 管理业务逻辑；`onInit` 业务初始化。可以通过给 `effects` 中的方法添加 `$` 前缀可以做到程序 `auto loading` 功能。

## 编写UI组件

新增 `src/List.jsx`

```js
import React from 'react';
import { Table, Button } from 'antd';
import { useConnect } from 'nuomi';

const List = () => {
  const [{ dataSource, loadings }, dispatch] = useConnect();

  const remove = ({ name }) => {
    dispatch({
      type: 'remove',
      payload: {
        name
      }
    });
  };

  const columns = [{
    title: '框架',
    dataIndex: 'name'
  }, {
    title: '操作',
    render: (text, record) => <Button onClick={() => remove(record)}>删除</Button>
  }];

  return (
    <Table
      loading={!!loadings.$getList}
      rowKey="name"
      dataSource={dataSource}
      columns={columns}
      bordered
    />
  );
};

export default List;
```

通过 `useConnect` 可以让 `List` 组件和 `nuomiProps` 关联起来，但此时 `List` 还无法正常渲染。

## 渲染组件

编辑 `src/App.js`

```diff
import React from 'react';
+ import { Nuomi } from 'nuomi';
- import logo from './logo.svg';
- import './App.css';
+ import list from './list';
+ import List from './List.jsx';

function App() {
  return (
+   <Nuomi {...list}>
+     <List />
+   </Nuomi>
-   <div className="App">
-     <header className="App-header">
-       <img src={logo} className="App-logo" alt="logo" />
-       <p>
-         Edit <code>src/App.js</code> and save to reload.
-       </p>
-       <a
-         className="App-link"
-         href="https://reactjs.org"
-         target="_blank"
-         rel="noopener noreferrer"
-       >
-         Learn React
-       </a>
-     </header>
-   </div>
  );
}

export default App;
```

可以看到刚才在 `list.js` 中定义的对象就是 `Nuomi` 组件的 `props`，这就是取名为 `nuomiPorps` 的原因，独立成一个文件可以方便维护。

最终效果如下：

import App from '../.demos/quick-start/App.jsx';

<App />

利用 `Nuomi` 组件的特性与路由结合可以快速构建单页应用，根据自己喜好可以选择 `react-router` 也可以
是 `reach-router`。框架自身也内置了一套路由系统，相较于前2者与 `Nuomi` 结合起来使用会更加方便。

## 使用路由

编辑 `src/App.js`

```diff
import React from 'react';
- import { Nuomi } from 'nuomi';
+ import { Router, Route } from 'nuomi';
import list from './list';
import List from './List.jsx';

function App() {
  return (
-   <Nuomi {...list}>
-     <List />
-   </Nuomi>
+    <Router>
+     <Route path="/" {...list}>
+       <List />
+     </Route>
+     <Route path="/list" {...list}>
+       <List />
+     </Route>
+   </Router>
  );
}

export default App;
```

刷新页面可以看到与之前无任何区别，可以通过 `http://127.0.0.1:3000/#list` 访问第二个页面。这里定义了2个 `Route` 组件，同时引用了 `list`，但是2个组件的状态是互相独立的，通过这一点可以很容易做到大模块的复用。

上面代码中有一处是可以优化，`Route` 的子组件 `List` 其实也是 `props`，可以把它放到 `list.js` 中。

编辑 `src/App.js`

```diff
import React from 'react';
import { Router, Route } from 'nuomi';
import list from './list';
- import List from './List.jsx';

function App() {
  return (
    <Router>
-     <Route path="/" {...list}>
-       <List />
-     </Route>
-     <Route path="/list" {...list}>
-       <List />
-     </Route>
+     <Route path="/" {...list} />
+     <Route path="/list" {...list} />
    </Router>
  );
}

export default App;
```

编辑 `src/list.js`

```diff
import React from 'react';
+ import List from './List.jsx';

export default {
  ...
+ render() {
+   return <List />;
+ },
}
```

可以使用 `children` 属性渲染子组件，也可以使用 `render` 函数来渲染组件，共存时 `children` 不会被渲染，在 `render` 中可以通过 `this.children` 访问子组件，这一点可以用来做路由嵌套。

框架的特性远不及此，更多功能等待你去发现。
