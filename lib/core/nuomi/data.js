"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  // wrapper容器dom集合
  wrappers: [],
  // 为了防止多个路由同时匹配，一次性的，匹配完会被重新设置为false
  matchRoute: false
};
exports.default = _default;