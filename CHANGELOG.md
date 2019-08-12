# 更新日志：

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









