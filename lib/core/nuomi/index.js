"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getDefaultProps = void 0;

var _defaultProps = _interopRequireDefault(require("./defaultProps"));

var _extend = _interopRequireDefault(require("../../utils/extend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newProps = _defaultProps.default;

var nuomi = function nuomi(props) {
  newProps = (0, _extend.default)(newProps, props);
};

var getDefaultProps = function getDefaultProps() {
  return newProps;
};

exports.getDefaultProps = getDefaultProps;
nuomi.getDefaultProps = getDefaultProps;
var _default = nuomi;
exports.default = _default;