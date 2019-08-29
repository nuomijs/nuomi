"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.setStore = exports.getStore = void 0;

var _redux = require("redux");

var _applyMiddleware = _interopRequireDefault(require("./applyMiddleware"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = function rootReducer() {};

var stores = {};
var middlewares = [];
var composeEnhancers =
/* eslint-disable no-underscore-dangle */
process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#trace
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  trace: true,
  traceLimit: 20
}) : _redux.compose;
var rootStore = (0, _redux.createStore)(rootReducer, composeEnhancers((0, _applyMiddleware.default)(function () {
  return middlewares;
})));

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
rootStore.getStore = getStore;

rootStore.applyMiddleware = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  middlewares = args.filter(function (middleware) {
    return (0, _utils.isFunction)(middleware);
  });
};

var _default = rootStore;
exports.default = _default;