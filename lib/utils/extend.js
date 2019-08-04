"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("./index");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var object = args[0],
      newObject = args[1];

  var currentObject = _objectSpread({}, object);

  if ((0, _index.isObject)(newObject)) {
    var keys = Object.keys(newObject);

    var state = newObject.state,
        data = newObject.data,
        reducers = newObject.reducers,
        effects = newObject.effects,
        onChange = newObject.onChange,
        rest = _objectWithoutProperties(newObject, ["state", "data", "reducers", "effects", "onChange"]);

    currentObject = _objectSpread({}, currentObject, rest);

    if ((0, _index.isObject)(state)) {
      var loadings = state.loadings,
          restState = _objectWithoutProperties(state, ["loadings"]);

      var states = object.state;
      currentObject.state = _objectSpread({}, states, restState, {
        loadings: _objectSpread({}, states.loadings, loadings)
      });
    }

    if ((0, _index.isObject)(data)) {
      currentObject.data = _objectSpread({}, object.data, data);
    }

    if ((0, _index.isObject)(reducers)) {
      currentObject.reducers = _objectSpread({}, object.reducers);
      Object.keys(reducers).forEach(function (key) {
        if ((0, _index.isFunction)(reducers[key])) {
          currentObject.reducers[key] = reducers[key];
        }
      });
    }

    if (keys.includes('effects')) {
      if ((0, _index.isObject)(effects)) {
        currentObject.effects = _objectSpread({}, currentObject.effects, effects);
      } else {
        currentObject.effects = effects;
      }
    }

    if (keys.includes('onChange')) {
      if ((0, _index.isObject)(onChange)) {
        currentObject.onChange = _objectSpread({}, currentObject.onChange, onChange);
      } else {
        currentObject.onChange = onChange;
      }
    }
  }

  return currentObject;
};

exports.default = _default;