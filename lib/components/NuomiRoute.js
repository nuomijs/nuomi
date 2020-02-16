"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _invariant = _interopRequireDefault(require("invariant"));

var _Context = require("./Context");

var _Nuomi = _interopRequireDefault(require("./Nuomi"));

var _parser = _interopRequireDefault(require("../utils/parser"));

var _utils = require("../utils");

var _propTypes = require("./propTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NuomiRoute =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(NuomiRoute, _React$PureComponent);

  function NuomiRoute() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NuomiRoute);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NuomiRoute)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.routeComponent = null;
    return _this;
  }

  _createClass(NuomiRoute, [{
    key: "matchPath",
    value: function matchPath(location) {
      var pathname = location.pathname;
      var _this$props = this.props,
          pathPrefix = _this$props.pathPrefix,
          path = _this$props.path;

      if (path) {
        return _parser.default.toRegexp(path).test(pathname);
      }

      if (pathPrefix instanceof RegExp) {
        return pathPrefix.test(pathname);
      }

      if ((0, _utils.isString)(pathPrefix)) {
        return pathname.indexOf(pathPrefix) === 0;
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_Context.RouterContext.Consumer, null, function (context) {
        (0, _invariant.default)(context, '不允许在 <Router> 外部使用 <NuomiRoute>');
        var location = context.location;
        _this2.routeComponent = null;

        if (!context.matched && _this2.matchPath(location)) {
          context.matched = _this2;
          _this2.routeComponent = _react.default.createElement(_Context.RouterContext.Provider, {
            value: _objectSpread({}, context, {
              matched: null
            })
          }, _react.default.createElement(_Nuomi.default, _this2.props));
        }

        return _this2.routeComponent;
      });
    }
  }]);

  return NuomiRoute;
}(_react.default.PureComponent);

exports.default = NuomiRoute;

_defineProperty(NuomiRoute, "propTypes", _propTypes.NuomiRoutePropTypes);