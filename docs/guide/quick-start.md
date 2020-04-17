---
title: 功能速查
---

## 状态隔离

框架为每个 `nuomiProps` 模块内部创建一个 `store` 对象，包含了 `getState` 和 `dispatch`
方法用于操作模块内的状态，可以在 `nuomiProps` 对象的方法内调用 `this.store` 去访问它们。

```js
{
  onInit() {
    this.store.dispatch(...);
  }
}
```

使用过 `redux` 的同学应该知道，可以通过 `combineReducers`
组合多个 `reducer`，然后给他们设置唯一的 `key`，访问状态时都需要依赖这个 `key`。

```js
const home = () => {...};
const list = () => {...};
...

createStore(combineReducers({ home, list, ... }););
...

const App = ({ home, list }) => {
  // do something
};

connect(state => state)(App);
```

可以在 `nuomiProps` 中通过 `id` 属性为 `store` 设置唯一标识，`id` 其实就是这个 `key`
，只不过在不声明的情况下会动态创建。如果模块之间是没有任何联系，没必要给他们设置标识，因为操作状态不需要依赖
`id` 。当需要与其他模块通信时，为了方便，那就需要为其设置 `id` 了。

```js
{
  id: 'global'
}
```

## 状态操作

在组件中可以通过 `useConnect` 或者 `connect` 高阶组件让组件与 `nuomiProps` 建立关联来获取状态，通过
`dispatch` 可以调用 `effects` 和 `reducers` 中的方法更新状态。

```js
{
  state: {
    state1,
    state2,
    ...
  }
}
```

***useConnect***

```js
import { useConnect } from 'nuomi';

const List = () => {
  const [{ state1, state2 }, dispatch] = useConnect();
  dispatch({
    type: 'save',
    payload: { ... },
  });
}
```

***connect***

```js
import { connect } from 'nuomi';

const List = ({ state1, state2, dispatch }) => {
  dispatch({
    type: 'delete',
    payload: { ... },
  });
}

export default connect(state => state)(List);
```

可以通过全局 `store` 操作所有模块状态，该对象就是通过 `redux` 中的 `createStore`
创建的，只能调用 `reducers`，无法操作 `effects` ，使用时需要与 `id` 组合。

```js
import { store } from 'nuomi';

store.getState();

store.dispatch({
  type: 'global/_updateState',
  payload,
});

...
```

大多数情况下不会使用全局 `store` 去操作状态。

## 异步操作

异步操作是指异步更新状态，定义在 `effects` 对象中，主要用于业务逻辑的处理，使用
`async await` 语法糖。组件中调用 `dispatch` 访问 `effects` 中定义的方法，异步结束后再调用
`reducers` 中定义的方法来更新状态，推荐使用 [nuomi-request](https://github.com/nuomijs/nuomi-request/wiki) 来进行请求操作。

```js
{
  async login() {
    const { username, password } = this.getState();
    await services.login({ username, password });
  },
  async getData({ id }) {
    const { data } =  await services.getData({ id });
    this.dispatch({
      type: '_updateState',
      payload: { data }
    });
  }
}
```

上面代码中 `getState` 和 `dispatch` 为内置方法，`getState` 可以获取当前模块最新状态，
`dispatch` 用于调用 `reducers` 中的方法更新状态，除此之外还可以通过 `this.getNuomiProps()`
来访问当前模块的 `nuomiProps` 对象。

异步方法也可以与其他方法组合使用，通过 `this` 访问。

```js
{
  async getData1 () {
    await services.getData1();
  },
  async getData2 () {
    return await services.getData2();
  },
  async getData() {
    await this.getData1();
    const data = await this.getData2();
  }
}
```

> 不可以使用箭头函数定义，不然 this 访问不到其他方法！

方法可以不是异步的，可以把公共逻辑抽离出来。

```js
{
  updateState(payload) {
    this.dispatch({
      type: '_updateState',
      payload,
    });
  },
  async getData1() {
    const { data } = await services.getData1();
    this.updateState(data);
  },
  async getData2() {
    const { data } = await services.getData2();
    this.updateState(data);
  }
}
```

给方法名添加 `$` 前缀可以自动创建 `loading` ，无需手动开关，在组件中通过 `loadings.$方法名` 获取状态。

```js
{
  async $login() {
    await services.login();
  }
}
```
```js
const Login = () => {
  const [{ loadings }] = useConnect();
  return (
    <Form>
      ...
      <Button>{loadings.$login ? '正在登录...' : '登录'}</Button>
    </Form>
  );
};
```

首次获取的 loading 状态是 undefined，可以在状态中定义默认值。

```js
{
  state: {
    loadings: {
      $login: false
    }
  }
}
```

## 跨模块通信

应用中经常会出现多个模块通信问题，这时就需要给通信模块的 `nuomiProps` 设置 `id` 属性，`dispatch` 时通过 `id`
与 `reducers` 和 `effects` 进行组合，就可以访问它们。

```js
// A nuomiProps
{
  id: 'global',
  effects: {
    async update() {
      // do something
    }
  }
}

// B nuomiProps
{
  effects() {
    async remove() {
      this.dispatch({
        type: 'global/update',
        payload: {...}
      });
    }
  }
}

// B 组件

const B = () => {
  const [, dispatch] = useConnect();
  const update = () => {
    dispatch({ type: 'global/update', ... });
  };
  return <Button onClick={update}>更新</Button>;
}
```

## 路由匹配

路由通过 `path` 属性值与 `url` 地址进行匹配来渲染组件，需要按照一定的规范才可以有效匹配。

值非必须，当不传值时，默认匹配 `/`，开头和末尾有无 `/` 都是一样的。

```
path: api | /api | api/ | /api/

/api         √
/ap          ×
/api/1       ×
```

动态参数以 `/:` 开头，后面跟上参数名，参数名只能由 `数字字母下划线` 构成。

```
path: /api/:id

/api         ×
/api/1       √
```

可以通过 `?` 匹配0次或者1次，跟在动态参数末尾会对整个参数进行匹配。

```
path: /api/:id?

/api         √
/api/1       √
```

```
path: /api？

/ap          √
/api         √
/api/1       ×
```

可以通过 `*` 进行模糊匹配。

```
path: /api*

/api         √
/api/1       √
/apixx       √
/apixx/1     √
/apt         ×
```

```
path: /api/*

/api         √
/api/1       √
/apixx       ×
```

```
path: *

匹配所有
```

可以使用正则符号匹配。

```
path: /api/1[^\\d]+

/api/11       ×
/api/1        ×
/api/1b       √
```

匹配成功的路由 `nuomiProps` 会被添加 `location` 对象，包含了路由相关的数据。

```js
{
  url,        // 完整url
  pathname,   // 不包含查询参数以及hash的url
  search,     // 查询参数字符串
  query,      // 查询参数对象
  params,     // 动态参数对象
  hash        // hash
}
```

## 路由操作

使用 `router` 对象可以进行路由相关的操作，比如刷新、跳转、监听等。

路由刷新可以将当前路由所有状态进行重置，并且重新初始化，通过调用 `router.reload()` 使用，你可以把它看成路由版的
`window.reload`，只不过浏览器不会刷新。

```js
import { router } from 'nuomi';

const App = () => {
  return (
    ...
    <Button onClick={() => router.reload()}>刷新</Button>
  );
};
```

通过使用 `window.location` 和 `location.replace`，可以控制浏览器的跳转，路由提供与之对等的方法
`router.location` 与 `router.replace`，它们参数相同，只不过前者会记入历史，后者替换历史。

```js
import { router } from 'nuomi';

{
  effects: {
    $login() {
      await services.login();
      router.replace('/index');
    }
  }
}
```

虽然也可以使用 `location.hash` 或 `history.push`
等原生方法控制路由跳转，但是不建议使用他们，不仅功能有限，可能还会出现一些问题，建议使用
`router` 对象操作。

通过跳转，还可以为目标页面传递一些临时数据。试想一下有这么一个场景，只有从A页面点击特定的按钮到B页面时，B才会进行某些操作
，当B刷新或者从A、C正常跳转到B时，B才正常显示。当然方法有很多，比如在url上添加参数，或者使用全局变量做标记，使用完后再移除
，但是都需要做额外的处理。

`router` 跳转时可以传递临时数据，使用完数据会自动销毁。

```js
const A = () => {
  const go = () => {
    router.location('/b', { a: 1, b: 2 });
  };
  return <Button onClick={go}></Button>
}

// B nuomiProps
{
  effects: {
    async getData() {
      const { data } = this.getNuomiProps();
      console.log(data); // { a: 1, b: 2 }
    }
  },
  onInit() {
    console.log(this.data); // { a: 1, b: 2 }
  }
}
```

目标页面 `nuomiProps` 的 `data` 属性用于存放临时数据，当路由切换时会自动被销毁，也可以为 `data` 定义默认值。

```js
{
  data: {
    a: 0,
    b: 0
  },
  onInit() {
    console.log(this.data); // { a: 0, b: 0 }
  }
}
```

跳转时还可以通过传递函数来对目标页面做一些处理，函数接收目标页面的 `nuomiProps`
作为参数，可以获取 `store` 来操作目标页的状态。

```js
const A = () => {
  const go = () => {
    router.location('/b', ({ store }) => {
      store.dispatch({ type: 'getData', payload: {...} });
    });
  };
  return <Button onClick={go}></Button>
}

// B nuomiProps
{
  effects: {
    async getData() {
      // do something
    }
  }
}
```

路由中还提供了很多方法，具体可以查阅 [API](/api/#router)。

## 路由缓存

默认情况下在路由跳转时，上一个路由的内容和状态会被销毁，使用路由缓存可以保留状态或者内容。通过给
`nuomiProps` 增加 `cache` 属性开启缓存功能。

当值设置为 `true` 时，渲染内容外部会被包裹一层类名为 `nuomi-route-wrapper`
的 `div` 标签，离开此页面时该标签会被设置为 `display: none`，内容和状态都不会被销毁，返回时会被设置为
`display: block`，通过此功能很容易解决回到原页面保留滚动条位置的问题。

```js
<Route path="/list" cache />
```

<div><img src="/images/cache.gif" alt="路由缓存" /></div>

当值设置为 `state` 时，离开页面会保留状态，但内容会被销毁，重新进入页面会展示之前状态的内容，但滚动条位置会丢失。

```js
<Route path="/list" cache="state" />
```

两者有利有弊，前者当页面数量特别庞大时，可能会有内存问题，使用时根据实际情况自己权衡。

## 路由嵌套

可以使用 `Route` 与 `NuomiRoute` 实现路由嵌套的功能，外层路由使用哪个都可以，后者功能会少一点。
路由嵌套最常见的应用场景就是工作台页面，外层路由渲染框架，子路由渲染内容，有2种方式可以实现路由嵌套。

***集中式***

```js
// 外层路由渲染组件
const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

// 外层路由nuomiProps
const layout = {
  ...,
  render() {
    return <Layout>{this.children}</Layout>
  },
}

const App = () => {
  return (
    <Router>
      <NuomiRoute path="/*" {...layout}>
        <Route path="/" {...home} />
        <Route path="/list" {...list} />
      </NuomiRoute>
    </Router>
  );
}
```

外层路由在 `render` 方法中 通过 `this.children` 获取子路由，然后在组件内进行渲染，如果不处理这一步，
那么子路由不会被渲染。框架提供了 `ShapeRoute` 组件处理这种方式更加方便。

> children 与 render 共存时，只渲染 render 中的组件。<br />外层路由 `path` 末尾必须以 `/*` 结尾，不然子路由不会被匹配，具体可以参考[路由匹配](#路由匹配)。

***分散式***

```js
const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Content>
        <Route path="/" {...home} />
        <Route path="/list" {...list} />
      </Content>
    </Wrapper>
  );
}

const layout = {
  ...,
  render() {
    return <Layout />
  },
}

const App = () => {
  return (
    <Router>
      <Route path="/*" {...layout} />
    </Router>
  );
}
```

可以根据自己的喜好选择任意方式构面单页。

## 路由钩子

路由提供了一些钩子函数可以在路由变化时做一些操作。

有一些场景需要在路由进入或者离开时做一些提示，可以通过 `onEnter` 和 `onLeave` 来实现。

```js
{
  onEnter() {
    return window.confirm('是否要进入?');
  },
  onLeave() {
    return window.confirm('是否要离开?');
  }
}
```

也可以通过自定义弹窗来实现阻塞。

```js
{
  onEnter(enter) {
    Modal.confirm({
      content: '是否要进入?',
      onOk: () => {
        enter();
      },
    });
    return false;
  },
  onLeave(leave) {
    Modal.confirm({
      content: '是否要离开?',
      onOk: () => {
        leave();
      },
    });
    return false;
  }
}
```

通常路由被渲染后，需要调用接口对数据进行初始化，这个操作可以在组件生命周期函数内进行，比如 `useEffect`
`componentDidMount`等，但是在框架中使用这种方式会有一些问题，比如调用路由刷新 不会重新执行这些函数，所以路由提供了
`onInit` 进行初始化操作，它不是路由独有的，`Nuomi` 和 `NuomiRoute` 组件都有这个钩子，功能相同。

```js
{
  effects: {
    async $getList() {
      // do something
    }
  },
  onInit() {
    this.store.dispatch({
      type: '$getList'
    });
  }
}
```

在 `onInit` 中还可以做一些监听操作，并返回一个函数用于取消监听，用法类似 `useEffect`。

```js
{
  onInit() {
    const resize = () => {};
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    }
  }
}
```

如果设置了路由缓存，`onInit` 在组件生命周期内只会被执行一次，除非调用路由刷新
，如果希望每次路由切换都执行，可以使用 `onChange` 钩子。

> 路由没有设置缓存功能，`onInit` 每次路由切换都会执行。

`onChange` 支持函数和对象写法，如果设置了路由缓存，在对象写法时给方法名添加 `$`
前缀，首次加载和路由刷新时都不会执行，只有路由切换时才会执行。如果业务场景是首次进来需要初始化数据
，离开后再进入这个页面只需要更新某一部分数据，那么这个功能十分有用。

```js
{
  cache: true,
  onChange: {
    initData() {
      this.store.dispatch({ ... });
    },
    $initList() {
      this.store.dispatch({ ... });
    }
  }
}
```

## 按需加载

单页应用是将所有模块打包到一个文件里，模块越多则文件越大，首次加载的速度也会越慢，有些模块可能永远不会被用户访问。
`nuomiProps` 中可以使用 `async` 方法来对模块进行按需加载。

```js
// home.js
export default {
  state: {...},
  effects: {...},
  ...
}

// App.jsx
const App = () => {
  return (
    <Router>
      <Route path="/" async={() => import('./home')} />
      <Route path="/list" async={() => import('./list')} />
    </Router>
  );
};
```
