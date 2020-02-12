"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initialiseState = exports.clearStore = exports.setStore = exports.getStore = exports.INITIALISE_STATE = void 0;

var _redux = require("redux");

var _warning = _interopRequireDefault(require("warning"));

var _applyMiddleware = _interopRequireDefault(require("./applyMiddleware"));

var _utils = require("../../utils");

var _globalWindow = _interopRequireDefault(require("../../utils/globalWindow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialiseState = {};
exports.initialiseState = initialiseState;
var stores = {};
var middlewares = [];
var usedDispatch = false;
var composeEnhancers =
/* eslint-disable no-underscore-dangle */
process.env.NODE_ENV !== 'production' && _globalWindow.default.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#trace
_globalWindow.default.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  trace: true,
  traceLimit: 20
}) : _redux.compose;
var rootStore = (0, _redux.createStore)(_utils.noop, // eslint-disable-next-line no-return-assign
composeEnhancers((0, _applyMiddleware.default)(function () {
  return middlewares;
}, function () {
  return usedDispatch = true;
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

var clearStore = function clearStore() {
  stores = {};
  rootStore.replaceReducer(_utils.noop);
};

exports.clearStore = clearStore;
rootStore.getStore = getStore;

rootStore.applyMiddleware = function () {
  if (!usedDispatch) {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    middlewares = middlewares.concat(args.filter(function (middleware) {
      return (0, _utils.isFunction)(middleware);
    }));
  } else {
    (0, _warning.default)(false, 'dispatch已经被使用，不能添加中间件，请确保添加中间件操作发生在dispatch之前');
  }
};

rootStore.createState = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if ((0, _utils.isObject)(state)) {
    Object.keys(state).forEach(function (key) {
      if (!stores[key]) {
        initialiseState[key] = state[key];
      }
    });
  }
};

var INITIALISE_STATE = '__NUOMI_INITIALISE_STATE__';
exports.INITIALISE_STATE = INITIALISE_STATE;
var _default = rootStore;
exports.default = _default;