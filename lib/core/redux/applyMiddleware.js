"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _utils = require("../../utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(getMiddlewares, cb) {
  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch;

      var middlewareDispatch = function middlewareDispatch() {
        throw new Error('dispatch未被创建，不允许使用');
      };

      var middlewareAPI = {
        getState: store.getState,
        // eslint-disable-next-line no-shadow
        dispatch: function dispatch() {
          return middlewareDispatch.apply(void 0, arguments);
        }
      };
      return _objectSpread({}, store, {
        dispatch: function dispatch(action) {
          if (!_dispatch) {
            var middlewares = getMiddlewares();
            var chain = middlewares.map(function (middleware) {
              return middleware(middlewareAPI);
            });
            _dispatch = _redux.compose.apply(void 0, _toConsumableArray(chain))(store.dispatch);
            middlewareDispatch = _dispatch;

            if ((0, _utils.isFunction)(cb)) {
              cb();
            }
          }

          return _dispatch(action);
        }
      });
    };
  };
};

exports.default = _default;