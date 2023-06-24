---
title: API
---

## 组件
### Nuomi
|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| id  | '' | store id，不设置会动态创建 |
| load  | function | 异步加载props |
| state  | {} | 初始状态 |
| reducer  | { @update/@replace } | 更新状态 |
| action  | {} | 通过async await异步更新状态，函数名使用$前缀会自动生成loading状态，函数第一个参数为store，第二个参数为payload |
| render  | function | 渲染组件 |
| onInit  | function | 组件被创建后回调，此时内部store已经被创建，可以通过参数this.store访问，也可以通过this. |

### Ruoter
|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| type  | 'hash' or 'browser' | 路由类型，默认是hash  |
| basename  | '/' | 通用路径 |

### StaticRuoter
用于服务器渲染

|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| location  | '/' | 服务器端获取的url，可以传入对象，包含pathname、search、params |
| basename  | '/' | 通用路径 |
| context  | {} | 可以通过context.url获取Redirect组件第一次重定向的url |

### NuomiRoute
|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| path  | '' | 路由path |
| name  | '' | 路由名称 |

其他参数同Nuomi组件

### Route
|  props   | value  |  介绍
|  ----  | ----  | ---- |
| path  | '' | 路由path，支持动态参数 |
| name  | '' | 路由名称 |
| cache  | false | 是否给留有创建一个div容器，可实现缓存功能 |
| reload  | false | 匹配路由后是否重置状态，值为null则不法刷新 |
| onEnter  | function | 路由匹配后，在reducer被创建之前回调，返回false将无法展示内容，参数为强制展示回调，调用后可以展示内容 |
| onShow  | function | 路由匹配时回调，支持函数和对象 |
| onActivte  | function | 路由匹配时回调，支持函数和对象 |
| onLeave  | function | 路由离开时回调，用于决定是否可以离开 |
其他参数同Nuomi组件，
回调的执行顺序是 onEnter > location.data > onChange > onInit，location.data下面路由跳转时会讲到
<br /><b>注意：path和cache不能异步加载</b>

### Redirect
|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| from  | '' | 匹配当前路由path，会重定向至to设置的path |
| to  | '' | 重定向路由path |
| reload  | false | 跳转后是否重置状态 |

### ShapeRoute
可视化设置路由

|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| routes  | array | 由Route/NuomiRoute/Redirect props组成的数组集合，子路由设置在children属性上，支持组件和数组 |
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

### Link
|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| to  | '' | 目标path |
| replace  | false | 跳转是否替换当前history |
| reload  | false | 跳转后是否重置状态 |

### NavLink
可以匹配path的Link

|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| path  | '' | 匹配path |
| activeClassName  | '' | 匹配className |
| activeStyle  | null | 匹配样式 |
| isActice  | function | 自定义匹配，返回boolean，第一个参数是匹配结果，第二个参数是当前location对象 |
其他参数参考Link

### connect
用法同react-redux connect，区别是获取状态的函数，第一个参数是获取当前模块的状态，第二个参数是获取全部store里的状态

### withNuomi
使用后组件中提供nuomi对象，nuomi对象包含store/location/parent等属性方法

```js
const List = ({ nuomi }) => {
  // do something
}

withNuomi(List);
```

## Hooks
### useConnect
高阶组件connect的替代方法

方法返回一个数组，第一个值是状态，第二个值为dispatch，不传参数默认返回当前模块所有状态，接收一个回调函数参数时，用法等同connect第一个参数

### useNuomi
高阶组件withNuomi的替代方法

方法返回一个对象

## 对象
### router

#### router.location
获取路由数据

#### router.push
路由跳转

|  参数   | value  |  介绍  |
|  ----  | ----  | ---- |
| path  | '' | 跳转的路由地址 |
| reload  | false | 跳转后是否重置状态 |

#### router.replace
路由跳转，在history中替换当前地址，参数等同router.push

#### router.listener
监听路由变化

|  参数   | value  |  介绍  |
|  ----  | ----  | ---- |
| callback  | function | 接受参数为location，可以获取当前匹配的路由数据 |
返回取消监听方法

#### router.reload
路由刷新

#### router.back
后退

#### router.forward
前进

#### router.matchPath
用于匹配路由

|  参数   | value  |  介绍  |
|  ----  | ----  | ---- |
| location  | {} | 路由location对象 |
| path  | '' | 路由设置的path |

#### router.mergePath
合并path

|  参数   | value  |  介绍  |
|  ----  | ----  | ---- |
| path1, path2, ...  | string | 路由path |

#### router.block
定义阻塞路由，接收一个回调函数作为参数，回调函数包含下面参数，返回false则不能跳转

|  参数   | value  |  介绍  |
|  ----  | ----  | ---- |
| from  | {} | 当前location |
| to  | {} | 目标location |
| enter  | function | 确认跳转函数，在异步中使用 |

### store
请参考 [redux store](https://cn.redux.js.org/docs/basics/Store.html)
原生方法建议只使用getState和dispatch，除此之外额外新增了getStore和applyMiddleware方法
#### store.getState
获取所有状态
#### store.dispatch
更新状态，只能触发reducer中的方法，如果想调用action方法，请使用store.getStore替代
#### store.getStore
获取nuomi组件的store，参数是store id，返回对象包含getState和dispatch
#### store.applyMiddleware
添加中间件
```js
store.applyMiddleware(thunk, logger, ...)
```
#### store.createState
初始化状态，只能对 `nuomiPorps` 中设置了 `id` 属性的模块初始化

## 其他

### configure
设置默认props，设置后会覆盖默认值，不传参则返回默认props
```js
configure({
    state: {
        dataSource: [],
    },
    reducer: {
        updateState: (state, payload) => ({ ...state, ...payload }),
    },
});
```

### INITIALISE_STATE
服务端渲染时用于给window对象添加初始化状态属性
```js
import { createServer } from 'http';
import { renderToString } from 'react-dom/server';
import { INITIALISE_STATE } from 'nuomi';

createServer((req, res) => {
  const html = renderToString(<App />);
  const state = { global: {} };

  res.setHeader('Content-Type','text/html');
  res.end(`
    <html>
      <body>
        <div id="root">${html}</div>
        <script>window.${INITIALISE_STATE}=${JSON.stringify(state)}</script>
      </body>
    </html>
  `);
});
```
