"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _globalWindow = _interopRequireDefault(require("../utils/globalWindow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _globalWindow.default.document ? _react.useLayoutEffect : _react.useEffect;

exports.default = _default;