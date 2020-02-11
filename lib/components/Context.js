"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NuomiContext = exports.RouterContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouterContext = _react.default.createContext();

exports.RouterContext = RouterContext;
RouterContext.displayName = 'RouterContext';

var NuomiContext = _react.default.createContext();

exports.NuomiContext = NuomiContext;
NuomiContext.displayName = 'NuomiContext';