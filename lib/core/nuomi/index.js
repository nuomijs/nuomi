"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getDefaultProps = void 0;

var _defaultProps = _interopRequireDefault(require("./defaultProps"));

var _extend = _interopRequireDefault(require("./extend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newProps = _defaultProps.default;

var config = function config(props) {
  newProps = (0, _extend.default)(newProps, props);
};

var getDefaultProps = function getDefaultProps() {
  return newProps;
};

exports.getDefaultProps = getDefaultProps;
var _default = {
  config: config,
  getDefaultProps: getDefaultProps,
  extend: _extend.default
};
exports.default = _default;