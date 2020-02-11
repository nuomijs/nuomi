"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("./index");

var _default = typeof window !== 'undefined' ? window : {
  Proxy: global.Proxy,
  addEventListener: _index.noop,
  removeEventListener: _index.noop,
  history: {
    pushState: _index.noop,
    replaceState: _index.noop
  }
};

exports.default = _default;