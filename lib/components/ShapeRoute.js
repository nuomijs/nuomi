"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _invariant = _interopRequireDefault(require("invariant"));

var _utils = require("../utils");

var _router = _interopRequireDefault(require("../core/router"));

var _propTypes = require("./propTypes");

var _Context = require("./Context");

var _Route = _interopRequireDefault(require("./Route"));

var _NuomiRoute = _interopRequireDefault(require("./NuomiRoute"));

var _Redirect = _interopRequireDefault(require("./Redirect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Shape =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Shape, _React$PureComponent);

  function Shape() {
    _classCallCheck(this, Shape);

    return _possibleConstructorReturn(this, _getPrototypeOf(Shape).apply(this, arguments));
  }

  _createClass(Shape, [{
    key: "getComponents",
    value: function getComponents(routes, parentPath) {
      var _this = this;

      if ((0, _utils.isArray)(routes)) {
        var conponents = [];
        routes.forEach(function (_ref, i) {
          var key = _ref.key,
              route = _ref.route,
              childrenRoutes = _ref.routes,
              props = _objectWithoutProperties(_ref, ["key", "route", "routes"]);

          var newProps = _objectSpread({}, props);

          var Component = _Route.default;

          if (props.to) {
            Component = _Redirect.default;
          } else if (props.path && route === false) {
            Component = _NuomiRoute.default;
          }

          if (newProps.path) {
            var hasChildren = (0, _utils.isArray)(childrenRoutes) && childrenRoutes.length;
            newProps.path = _router.default.mergePath(parentPath, newProps.path, hasChildren ? '/*' : '');
          }

          var children = _this.getComponents(childrenRoutes, newProps.path);

          conponents.push(_react.default.createElement(Component, _extends({
            key: key || i
          }, newProps, {
            children: children
          })));
        });
        return conponents;
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var routes = this.props.routes;
      var components = this.getComponents(routes);
      return _react.default.createElement(_react.default.Fragment, null, components);
    }
  }]);

  return Shape;
}(_react.default.PureComponent);

_defineProperty(Shape, "propTypes", _propTypes.ShapeRoutePropTypes);

var ShapeRoute =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ShapeRoute, _React$Component);

  function ShapeRoute() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, ShapeRoute);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ShapeRoute)).call.apply(_getPrototypeOf2, [this].concat(args)));
    var location = _this2.context.location;
    (0, _invariant.default)(!!location, '不允许在 <Router> 外部使用 <ShapeRoute>');
    return _this2;
  }

  _createClass(ShapeRoute, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(Shape, this.props);
    }
  }]);

  return ShapeRoute;
}(_react.default.Component);

exports.default = ShapeRoute;

_defineProperty(ShapeRoute, "propTypes", _propTypes.ShapeRoutePropTypes);

_defineProperty(ShapeRoute, "contextType", _Context.RouterContext);