"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
            cb && cb();
          }

          return _dispatch(action);
        }
      });
    };
  };
};

exports.default = _default;