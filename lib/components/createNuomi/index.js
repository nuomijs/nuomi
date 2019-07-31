"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Nuomi = _interopRequireDefault(require("../Nuomi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(props) {
  return function () {
    return _react.default.createElement(_Nuomi.default, props);
  };
};

exports.default = _default;