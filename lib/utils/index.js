"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "parser", {
  enumerable: true,
  get: function get() {
    return _parser.default;
  }
});
exports.extend = exports.isNative = exports.isArray = exports.isObject = exports.isString = exports.isFunction = exports.isType = void 0;

var _parser = _interopRequireDefault(require("./parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isType = function isType(type) {
  return function (obj) {
    return {}.toString.call(obj) === "[object ".concat(type, "]");
  };
};

exports.isType = isType;
var isFunction = isType('Function');
exports.isFunction = isFunction;
var isString = isType('String');
exports.isString = isString;

var isObject = function isObject(obj) {
  return obj && isType('Object')(obj);
};

exports.isObject = isObject;
var isArray = Array.isArray || isType('Array');
exports.isArray = isArray;

var isNative = function isNative(obj) {
  return typeof obj !== 'undefined' && /native code/i.test(obj.toString());
};

exports.isNative = isNative;

var extend = function extend() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var object = args[0],
      newObject = args[1];

  var currentObject = _objectSpread({}, object);

  if (isObject(newObject)) {
    var state = newObject.state,
        data = newObject.data,
        reducers = newObject.reducers,
        rest = _objectWithoutProperties(newObject, ["state", "data", "reducers"]);

    for (var i in rest) {
      if (rest[i] !== undefined) {
        currentObject[i] = rest[i];
      }
    }

    if (isObject(state)) {
      var loadings = state.loadings,
          restState = _objectWithoutProperties(state, ["loadings"]);

      var states = object.state;
      currentObject.state = _objectSpread({}, states, restState, {
        loadings: _objectSpread({}, states.loadings, loadings)
      });
    }

    if (isObject(data)) {
      currentObject.data = _objectSpread({}, object.data, data);
    }

    if (isObject(reducers)) {
      currentObject.reducers = _objectSpread({}, object.reducers);

      for (var _i in reducers) {
        if (isFunction(reducers[_i])) {
          currentObject.reducers[_i] = reducers[_i];
        }
      }
    }
  }

  return currentObject;
};

exports.extend = extend;