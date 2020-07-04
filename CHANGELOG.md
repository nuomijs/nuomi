# 更新日志：

## 0.8.19 (2020-07-04)
* 修复ShapeRoute组件报错问题

## 0.8.18 (2020-04-22)
* 修复Link，NavLink组件在Router设置了basename后跳转路径失效问题

## 0.8.17 (2020-04-14)
* 增加导出RouterContext、NuomiContext

## 0.8.16 (2020-04-12)
* 优化代码

## 0.8.15 (2020-04-12)
* 修复路由设置为中文导致不匹配问题

## 0.8.14 (2020-04-04)
* NavLink组件isActive方法增加第3个参数，可获取组件props

## 0.8.13 (2020-03-29)
* 跳转逻辑优化

## 0.8.12 (2020-03-27)
* 修复Link组件to属性不支持对象问题

## 0.8.10 (2020-03-26)
* 修复useConnect状态更新问题

## 0.8.9 (2020-03-19)
* 更新d.ts

## 0.8.8 (2020-03-12)
* 修复安装nuomi后，react,react-dom和宿主环境不一致问题

## 0.8.6 (2020-03-02)
* 修复useConnect无法更新状态问题

## 0.8.5 (2020-02-28)
* 组件性能优化

## 0.8.4 (2020-02-25)
* 修复Route组件设置缓存后被销毁时没有销毁状态的问题
* 修复组件设置默认data时，传递临时数据后报错问题
* 更新README

## 0.8.3 (2020-02-21)
* Route组件reload属性增加null值，设置为null后路由无法刷新
* 修复Redirect组件from属性值不支持path规则问题
* 修复Nuomi组件无法动态设置children问题
* 修复Route path属性无法动态设置问题

## 0.8.2 (2020-02-20)
* 修复Route children重复渲染问题 [#8](https://github.com/nuomijs/nuomi/issues/8)
* 修复ShapeRoute动态渲染问题 [#7](https://github.com/nuomijs/nuomi/issues/7)

## 0.8.1 (2020-02-17)
* 修复path改变nuomiProps.location不变问题 [#6](https://github.com/nuomijs/nuomi/issues/6)
* 更新ts声明文件，增加Link、NavlLink组件上个版本新增属性支持

## 0.8.0 (2020-02-16)
* Route组件支持嵌套
```js
<Router type="browser">
  <Route path="/*">
    <Route path="/home/*">
      <Route path="/home/list" />
    </Route>
  </Route>
</Router>
```
* 新增NavLink、ShapeRoute组件
```js
// 子路由path不用把祖先path加上
const routes = [{
  path: '/',
  children: [{
    path: '/home',
    children: [{
      path: '/list',
    }]
  }]
}];
<Router type="hash">
  <ShapeRoute routes={routes} />
</Router>
```
* Link组件新增data、replace属性
* NuomiRoute组件增加path属性
* path匹配规则优化，此优化影响Route与NuomiRoute组件path属性
```
/api/:id
/api/1    √
/api      ×
/api/1/2  ×

/api/:id?
/api/1    √
/api      √

/api/*
/api      √
/api/a    √
/api2     ×
```
* 新增router.block方法
```js
router.block((from, to) => {
  // 路由跳转时，path为/list页面无法展示
  if (to.pathname === '/list') {
    return false;
  }
});
```
* 新增router.mergePath方法
```js
router.mergePath('/', '/home', '/list'); // /home/list
```
* Route组件wrapper属性更改为cache
* router.matchPath匹配成功返回匹配对象


## 0.7.0 (2020-02-12)
* 移除Router组件hashPrefix属性，新增type和basename属性
* 新增StaticRouter组件用于服务端渲染
* router对象增加replace方法
* store对象增加createState方法
* 新增INITIALISE_STATE导出属性
```js
import { createServer } from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route, Redirect, Link, useConnect, store, INITIALISE_STATE } from 'nuomi';

createServer((req, res) => {
  new Promise((res) => {
    // 模拟请求
    setTimeout(() => {
      res({
        username: 'aniu',
        list: [{ name: 'yinjiazeng' }, { name: 'liumengmei' }],
      });
    }, 1000);
  }).then(({ username, list }) => {
    // 初始化状态
    const state = {
      global: { username },
      list: { dataSource: list },
    };
    store.createState(state);

    const Home = () => {
      const [{ username }] = useConnect();
      return (
        <div>
          hello, <Link to="/list">{username}</Link>
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

    const context = {};

    const html = renderToString(
      <StaticRouter location={req.url} context={context}>
        <Route path="/" id="global" state={{ username: 'home' }}>
          <Home />
        </Route>
        <Route path="/list" id="list" state={{ dataSource: [] }}>
          <List />
        </Route>
        <Redirect to="/" />
      </StaticRouter>
    );

    if (context.url) {
      res.writeHead(302, {
        Location: context.url
      })
      res.end();
    } else {
      res.setHeader('Content-Type','text/html');
      res.end(`
        <html>
          <body>
            <div id="root">${html}</div>
            <script>window.${INITIALISE_STATE}=${JSON.stringify(state)}</script>
          </body>
        </html>
      `);
    }
  })
}).listen(3000);
```

## 0.6.5 (2020-02-09)
* 修复使用useConnect获取state返回undefined [#5](https://github.com/nuomijs/nuomi/issues/5)

## 0.6.4 (2020-02-09)
* 修复NuomiRoute组件异步加载刷新页面空白问题 [#4](https://github.com/nuomijs/nuomi/issues/4)

## 0.6.3 (2020-02-08)
* 修复dispatch effects方法无效问题

## 0.6.2 (2020-02-01)
* 添加d.ts，增加对typescript的支持

## 0.6.1 (2020-01-29)
* 新增useConnect hooks替代connect高阶组件
```js
import { useConnect } from 'nuomi';

export default function Layout() {
  const [{ count }, dispatch] = useConnect();
  const setCount = () => {
    dispatch({
      type: 'setCount',
      payload: { count: count + 1 },
    });
  };
  return <div onClick={setCount}>{count}</div>;
}
```
* 新增useNuomi hooks替代withNuomi高阶组件
```js
import { useNuomi } from 'nuomi';

export default function Layout() {
  const { nuomiProps } = useNuomi();
  // ...
}
```
* withNuomi中location props被移除，Route组件内可以通过nuomiProps.location获取，其他组件内可通过router.location()获取

## 0.5.2 (2019-10-16)
* 修复nuomi卸载后调用getState，返回值undefined问题。[#3](https://github.com/nuomijs/nuomi/pull/3) [@liumemgmei](https://github.com/liumemgmei)

## 0.5.1 (2019-09-09)
:sweat_smile: 发布失误，不要使用该版本

## 0.5.0 (2019-09-09)
* Route组件增加onLeave回调
```js
export default {
  ...,
  // 确认框
  onLeave(leave) {
    const { editing } = this.store.getState();
    if (editing) {
      Modal.confirm({
        content: '数据已修改，确定要离开当前页面？',
        onOk() {
          leave();
        },
      });
    }
    return false;
  },
  // 系统模态框
  onLeave() {
    const { editing } = this.store.getState();
    if (editing) {
      return window.confirm('数据已修改，确定要离开当前页面？');
    }
  },
}
```
* Route组件onBefore回调更改为onEnter
* 修复withNuomi获取的location没有params问题
* 修复location.pathname包含params问题

## 0.4.2 (2019-08-31)
* Link组件to属性增加对象支持
* 代码增加错误提示，可以避免开发过程中一些不必要的错误

## 0.4.1 (2019-08-29)
* 增加了对中间件的支持
```js
import { store } from 'nuomi';
import logger from 'redux-logger';
import immutable from 'redux-immutable-state-invariant';

if (process.env.NODE_ENV !== 'production') {
  store.applyMiddleware(immutable(), logger);
}
```

## 0.3.1 (2019-08-24)
* router.location第一个参数加入对象支持
```js
router.location({ pathname: '/path', query: { a: 1 } }) // /path?a=1
router.location({ pathname: '/path', search: '?a=1' }) // /path?a=1
router.location({ pathname: '/path', params: { a: 1 } }) // /path/1
```
* onChange逻辑优化，可以使用函数形式，但是内部会将其转换为对象，名称为_onChange
```js
// 公共配置
nuomi.config({
  onChange: {
    init() {},
  },
});

// A页面
{
  path: '/a',
  onChange() {},
}

// 最终A页面onChange
{
  init() {},
  _onChange() {},
}
```
## 0.2.14 (2019-08-15)
* 修复多个模块data共享问题

## 0.2.13 (2019-08-15)
* 修复dispatch跨模块更新状态无法获取返回值的问题。[#1](https://github.com/nuomijs/nuomi/pull/1) [@iblq](https://github.com/iblq)

## 0.2.12 (2019-08-14)
* 新增功能：当onChange是对象时，回调方法若以“$”开头，将只在路由切换时执行（不包含首次加载以及路由刷新）,该类型方法可以配合onInit进行数据更新
```js
{
  ...,
  onChange: {
    $update() {
      // 路由切换更新数据
      this.store.dispatch({
        type: 'update',
      });
    },
  },
  onInit() {
    // 首次加载初始化
    this.store.dispatch({
      type: 'init',
    });
  },
}
```

## 0.2.11 (2019-08-14)
* 修复Route动态设置wrapper后，切换路由无法隐藏问题
* 修复Route设置wrapper后，render组件内无法获取高度问题

## 0.2.10 (2019-08-14)
* 修复onChange执行2次问题
* 修复路由设置wrapper时onBefore无效问题

## 0.2.9 (2019-08-13)
* router.listener回调参数增加reload属性，可在监听时判断当前路由是否是刷新

## 0.2.8 (2019-08-12)
* 修复文件名大小写问题，导致编译报错

## 0.2.7 (2019-08-11)
* 全局store增加了getStore方法，用于获取模块store，方便跨组件控制状态

## 0.2.6 (2019-08-09)
* 修复data取值无效问题
* Router组件prefix修改为hashPrefix
* NuomiRoute组件prefix修改为pathPrefix
* router.location增加第四个参数，如果跳转的path就是当前路由path，用来决定是否强制跳转，默认是true

## 0.2.5
* 修复Route组件更新时不能再次匹配问题
* 修复Route，Nuomi组件卸载时报setState的错误

## 0.2.4
* nuomi由方法修改为对象，包含config、getDefaultProps、extend三个属性方法

## 0.2.3
* 修复同时执行多个Redirect bug

## 0.2.2
* 模块异步加载支持import()动态导入

## 0.2.1
* 增加NuomiRoute、Redirect组件 移出Router组件entry props









