# 更新日志：

## 0.2.14 (2019-08-15)
修复多个模块data共享问题

## 0.2.13 (2019-08-15)
修复dispatch跨模块更新状态无法获取返回值的问题。[#1](https://github.com/nuomijs/nuomi/pull/1) [@iblq](https://github.com/iblq)

## 0.2.12 (2019-08-14)
新增功能：当onChange是对象时，回调方法若以“$”开头，将只在路由切换时执行（不包含首次加载以及路由刷新）,该类型方法可以配合onInit进行数据更新
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
修复Route动态设置wrapper后，切换路由无法隐藏问题
修复Route设置wrapper后，render组件内无法获取高度问题

## 0.2.10 (2019-08-14)
修复onChange执行2次问题
修复路由设置wrapper时onBefore无效问题
优化代码

## 0.2.9 (2019-08-13)
router.listener回调参数增加reload属性，可在监听时判断当前路由是否是刷新

## 0.2.8 (2019-08-12)
修复文件名大小写问题，导致编译报错

## 0.2.7 (2019-08-11)
全局store增加了getStore方法，用于获取模块store，方便跨组件控制状态
代码优化

## 0.2.6 (2019-08-09)
修复data取值无效问题
Router组件prefix修改为hashPrefix
NuomiRoute组件prefix修改为pathPrefix
router.location增加第四个参数，如果跳转的path就是当前路由path，用来决定是否强制跳转，默认是true
优化代码

## 0.2.5
修复Route组件更新时不能再次匹配问题
修复Route，Nuomi组件卸载时报setState的错误

## 0.2.4
nuomi由方法修改为对象，包含config、getDefaultProps、extend三个属性方法

## 0.2.3
修复同时执行多个Redirect bug

## 0.2.2
模块异步加载支持import()动态导入

## 0.2.1
增加NuomiRoute、Redirect组件 移出Router组件entry props
代码优化









