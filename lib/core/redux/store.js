"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultStates = exports.setStore = exports.getStore = void 0;

var _redux = require("redux");

var _warning = _interopRequireDefault(require("warning"));

var _applyMiddleware = _interopRequireDefault(require("./applyMiddleware"));

var _utils = require("../../utils");

var _globalWindow = _interopRequireDefault(require("../../utils/globalWindow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = function rootReducer() {};

var stores = {};
var defaultStates = {};
exports.defaultStates = defaultStates;
var middlewares = [];
var usedDispatch = false;
var composeEnhancers =
/* eslint-disable no-underscore-dangle */
process.env.NODE_ENV !== 'production' && _globalWindow.default.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#trace
_globalWindow.default.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  trace: true,
  traceLimit: 20
}) : _redux.compose;
var rootStore = (0, _redux.createStore)(rootReducer, // eslint-disable-next-line no-return-assign
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
    var createdArray = [];
    Object.keys(state).forEach(function (key) {
      if (!stores[key]) {
        defaultStates[key] = state[key];
      } else {
        createdArray.push(key);
      }
    });

    if (createdArray.length) {
      (0, _warning.default)(false, "".concat(createdArray.join(','), "\u5DF2\u7ECF\u88AB\u521B\u5EFAstore\uFF0C\u4E0D\u80FD\u521D\u59CB\u5316state"));
    }
  }
};

var _default = rootStore;
exports.default = _default;