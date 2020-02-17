"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedirectPropTypes = exports.NavLinkPropTypes = exports.LinkPropTypes = exports.StaticRouterPropTypes = exports.RouterPropTypes = exports.RoutePropTypes = exports.ShapeRoutePropTypes = exports.NuomiRoutePropTypes = exports.NuomiPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NuomiPropTypes = {
  id: _propTypes.default.string,
  state: _propTypes.default.object,
  data: _propTypes.default.object,
  store: _propTypes.default.object,
  reducers: _propTypes.default.objectOf(_propTypes.default.func),
  effects: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  render: _propTypes.default.func,
  onInit: _propTypes.default.func,
  async: _propTypes.default.func
};
exports.NuomiPropTypes = NuomiPropTypes;

var NuomiRoutePropTypes = _objectSpread({}, NuomiPropTypes, {
  pathPrefix: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  path: _propTypes.default.string
});

exports.NuomiRoutePropTypes = NuomiRoutePropTypes;
var ShapeRoutePropTypes = {
  routes: _propTypes.default.arrayOf(_propTypes.default.object)
};
exports.ShapeRoutePropTypes = ShapeRoutePropTypes;

var RoutePropTypes = _objectSpread({}, NuomiPropTypes, {
  path: _propTypes.default.string,
  cache: _propTypes.default.oneOf(['state', true, false]),
  reload: _propTypes.default.bool,
  onEnter: _propTypes.default.func,
  onChange: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  onLeave: _propTypes.default.func
});

exports.RoutePropTypes = RoutePropTypes;
var RouterPropTypes = {
  basename: _propTypes.default.string,
  type: _propTypes.default.oneOf(['hash', 'browser'])
};
exports.RouterPropTypes = RouterPropTypes;
var StaticRouterPropTypes = {
  basename: _propTypes.default.string,
  location: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  context: _propTypes.default.object
};
exports.StaticRouterPropTypes = StaticRouterPropTypes;
var LinkPropTypes = {
  to: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  data: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  reload: _propTypes.default.bool,
  replace: _propTypes.default.bool
};
exports.LinkPropTypes = LinkPropTypes;

var NavLinkPropTypes = _objectSpread({}, LinkPropTypes, {
  path: _propTypes.default.string,
  activeClassName: _propTypes.default.string,
  activeStyle: _propTypes.default.object,
  isActice: _propTypes.default.func
});

exports.NavLinkPropTypes = NavLinkPropTypes;
var RedirectPropTypes = {
  from: _propTypes.default.string,
  to: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  reload: _propTypes.default.bool
};
exports.RedirectPropTypes = RedirectPropTypes;