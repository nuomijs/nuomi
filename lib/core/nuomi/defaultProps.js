"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  state: {
    loadings: {}
  },
  data: {},
  reducers: {
    _replaceState: function _replaceState(state, _ref) {
      var payload = _ref.payload;
      return payload;
    },
    _updateState: function _updateState(state, _ref2) {
      var payload = _ref2.payload;
      return _objectSpread({}, state, {}, payload);
    },
    _updateLoading: function _updateLoading(state, _ref3) {
      var payload = _ref3.payload;
      return _objectSpread({}, state, {
        loadings: _objectSpread({}, state.loadings, {}, payload)
      });
    }
  }
};
exports.default = _default;