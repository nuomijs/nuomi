# 更新日志：

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









