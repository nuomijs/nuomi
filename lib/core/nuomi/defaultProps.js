"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
      return _objectSpread({}, state, payload);
    },
    _updateLoading: function _updateLoading(state, _ref3) {
      var payload = _ref3.payload;
      return _objectSpread({}, state, {
        loadings: _objectSpread({}, state.loadings, payload)
      });
    }
  }
};
exports.default = _default;