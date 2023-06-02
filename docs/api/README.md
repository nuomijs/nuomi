---
title: API
---

## 组件
### Nuomi
|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| id  | '' | store id，不设置会动态创建 |
| async  | function | 异步加载props |
| state  | {} | 初始状态 |
| data  | {} | 临时数据 |
| store  | { dispatch, getState } | 派发和获取当前模块状态，内部创建，不可修改，也无需传递，dispatch可以调用effects中的方法，也可以调用其他模块的effects |
| reducers  | { @updateState } | 更新状态 |
| effects  | {} | 异步或者同步更新状态，异步处理使用async await，用于业务处理，支持对象和函数，函数必须返回对象，内部需dispatch调用reducers中的方法，方法名有$前缀时会被设置为loading状态，通过connect可以在loading中获取到，不需要开发时手动控制loading状态 |
| render  | function | 渲染组件 |
| onInit  | function | 状态被创建后回调，可以通过this.store更新状态 |

### Ruoter
|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| hashPrefix  | '' | hash前缀 (<span style={{ color: 'red' }}>0.7.0-</span>) |
| type  | 'hash' or 'browser' | 路由类型，默认是hash (<span style={{ color: 'green' }}>0.7.0+</span>)  |
| basename  | '/' | 通用路径 (<span style={{ color: 'green' }}>0.7.0+</span>) |

### StaticRuoter
用于服务器渲染 (<span style={{ color: 'green' }}>0.7.0+</span>)

|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| location  | '/' | 服务器端获取的url，可以传入对象，包含pathname、search、params |
| basename  | '/' | 通用路径 |
| context  | {} | 可以通过context.url获取Redirect组件第一次重定向的url |

### NuomiRoute
|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| pathPrefix  | '' | 路由path前缀，支持字符串和正则 |
| path  | '' | 匹配path，优先级高于pathPrefix (<span style={{ color: 'green' }}>0.8.0+</span>) |

### ShapeRoute
可视化设置路由 (<span style={{ color: 'green' }}>0.8.0+</span>)

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

其他参数同Nuomi组件

### Route
|  props   | value  |  介绍
|  ----  | ----  | ---- |
| path  | '' | 路由path，支持动态参数 |
| location  | {} | 当前匹配的路由数据，内部创建，不可修改，也无需传递 |
| wrapper  | false | 是否给留有创建一个div容器，可实现缓存功能  (<span style={{ color: 'red' }}>0.8.0-</span>) |
| cache  | false | 是否给留有创建一个div容器，可实现缓存功能  (<span style={{ color: 'green' }}>0.8.0+</span>) |
| reload  | false | 匹配路由后是否重置状态，值为null则不法刷新 |
| onEnter  | function | 路由匹配后，在reducer被创建之前回调，返回false将无法展示内容，参数为强制展示回调，调用后可以展示内容 |
| onChange  | function | 路由匹配时回调，支持函数和对象 |
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

### Link
|  props   | value  |  介绍  |
|  ----  | ----  | ---- |
| to  | '' | 目标path |
| data  | {} | 传递的数据 (<span style={{ color: 'green' }}>0.8.0+</span>) |
| replace  | false | 跳转是否替换当前history (<span style={{ color: 'green' }}>0.8.0+</span>) |
| reload  | false | 跳转后是否重置状态 |

### NavLink
可以匹配path的Link (<span style={{ color: 'green' }}>0.8.0+</span>)

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
使用后组件中提供nuomiProps属性，nuomiProps指向Nuomi/NuomiRoute/Route组件的props

```js
const List = ({ nuomiProps }) => {
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

方法返回一个对象，包含nuomiProps属性

## 对象
### router

#### router.location
路由跳转

|  参数   | value  |  介绍  |
|  ----  | ----  | ---- |
| path  | '' | 跳转的路由地址 |
| data  | {} | 值为对象时表示跳转后传递的临时数据，切换路由后该数据将不存在，跳转后的路由模块中可以通过data获取，data对象上面Nuomi组件有提到，当值是函数时，函数的参数可以获取跳转后路由的props，可以通过store更新状态，更新状态发生在onChange之前，当值为布尔时，等同reload |
| reload  | false | 跳转后是否重置状态 |
| force  | true | 当path是当前路由path时，是否强制跳转，reload为true时该值自动为true |
不传参数表示获取当前路由数据
```js
router.location() // 获取当前路由数据
router.location(path, true) // 跳转后刷新
router.location(path, {}, true) // 跳转后传递临时参数并刷新
router.location(path, ({ store }) => { // 跳转后更新状态
    store.dispatch({
        type,
        payload
    });
}))
// path支持对象，字段等同router.location()获取的对象字段
router.location({ pathname: '/path', query: { a: 1 } }) // /path?a=1
```

#### router.replace
路由跳转，在history中替换当前地址，参数等同location (<span style={{ color: 'green' }}>0.7.0+</span>)

#### router.listener
监听路由变化

|  参数   | value  |  介绍  |
|  ----  | ----  | ---- |
| callback  | function | 接受参数为location，可以获取当前匹配的路由数据 |
返回取消监听方法

#### router.reload
路由刷新，等同router.location(当前path, true)

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
合并path (<span style={{ color: 'green' }}>0.8.0+</span>)

|  参数   | value  |  介绍  |
|  ----  | ----  | ---- |
| path1, path2, ...  | string | 路由path |

#### router.block
定义阻塞路由，接收一个回调函数作为参数，回调函数包含下面参数，返回false则不能跳转 (<span style={{ color: 'green' }}>0.8.0+</span>)

|  参数   | value  |  介绍  |
|  ----  | ----  | ---- |
| from  | {} | 当前location |
| to  | {} | 目标location |
| enter  | function | 确认跳转函数，在异步中使用 |


### nuomi

#### nuomi.getDefaultProps
获取最新的默认props
```js
// 默认props
{
  state: {
    loading: {},
  },
  data: {},
  reducers: {
    '@replaceState': (state, { payload }) => payload,
    '@updateState': (state, { payload }) => ({ ...state, ...payload }),
    '@updateLoading': (state, { payload }) => ({
      ...state,
      loading: { ...state.loading, ...payload },
    }),
  },
}
```

#### nuomi.config
设置默认props，设置后会覆盖默认值
```js
nuomi.config({
    state: {
        dataSource: [],
    },
    reducers: {
        updateState: (state, { payload }) => ({ ...state, ...payload }),
    },
});
```

#### nuomi.extend
合并props，state、reducers、data等会被浅合并

### store
请参考 [redux store](https://cn.redux.js.org/docs/basics/Store.html)
原生方法建议只使用getState和dispatch，除此之外额外新增了getStore和applyMiddleware方法
#### store.getState
获取所有状态
#### store.dispatch
更新状态，只能触发reducers中的方法，如果想调用effects方法，请使用store.getStore替代
#### store.getStore
获取nuomi组件的store，参数是store id，返回对象包含getState和dispatch
#### store.applyMiddleware
添加中间件
```js
store.applyMiddleware(thunk, logger, ...)
```
#### store.createState
初始化状态，只能对 `nuomiPorps` 中设置了 `id` 属性的模块初始化 (<span style={{ color: 'green' }}>0.7.0+</span>)

## 属性
### INITIALISE_STATE
服务端渲染时用于给window对象添加初始化状态属性 (<span style={{ color: 'green' }}>0.7.0+</span>)
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
