"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.setStore = exports.getStore = void 0;

var _redux = require("redux");

var rootReducer = function rootReducer() {};

var stores = {};
var rootStore = process.env.NODE_ENV === 'production' ? (0, _redux.createStore)(rootReducer) : (0, _redux.createStore)(rootReducer,
/* eslint-disable no-underscore-dangle */
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

var getStore = function getStore(id) {
  return stores[id];
};

exports.getStore = getStore;

var setStore = function setStore(id, store) {
  if (!stores[id]) {
    stores[id] = store;
  } else if (!store) {
    delete stores[id];
  }
};

exports.setStore = setStore;
var _default = rootStore;
exports.default = _default;