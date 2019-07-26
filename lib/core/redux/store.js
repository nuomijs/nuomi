"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var rootReducer = function rootReducer() {};

var store = process.env.NODE_ENV === 'production' ? (0, _redux.createStore)(rootReducer) : (0, _redux.createStore)(rootReducer,
/* eslint-disable no-underscore-dangle */
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
var _default = store;
exports.default = _default;