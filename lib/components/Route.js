"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _invariant = _interopRequireDefault(require("invariant"));

var _Context = require("./Context");

var _RouteCore = _interopRequireDefault(require("./RouteCore"));

var _router = _interopRequireWildcard(require("../core/router"));

var _nuomi = require("../core/nuomi");

var _propTypes = require("./propTypes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var Route =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Route, _React$PureComponent);

  function Route() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Route);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Route)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.store = {};
    _this.routeTempData = {};
    _this.routeComponent = null;
    _this.wrappers = [];
    var path = _this.props.path;
    (0, _router.savePath)(path);
    return _this;
  }

  _createClass(Route, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var path = this.props.path; // 嵌套路由时防止子路由被销毁后再创建无法匹配问题

      if (this.context && this.context.matched === this) {
        this.context.matched = null;
      }

      (0, _router.removePath)(path);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var defaultProps = (0, _nuomi.getDefaultProps)();
      var _this$props = this.props,
          path = _this$props.path,
          _this$props$cache = _this$props.cache,
          cache = _this$props$cache === void 0 ? defaultProps.cache : _this$props$cache;
      return _react.default.createElement(_Context.RouterContext.Consumer, null, function (context) {
        _this2.context = context;
        (0, _invariant.default)(context, '不允许在 <Router> 外部使用 <Route>');

        var routeCoreContextValue = _objectSpread({}, context, {
          wrappers: context.childrenWrappers || context.wrappers,
          childrenWrappers: _this2.wrappers,
          routeTempData: _this2.routeTempData
        });

        var location = context.location;

        var matchResult = _router.default.matchPath(location, path);

        var match = matchResult !== false; // context.matched 表示同一个上下文中，多个路由只匹配一个

        if (context.matched && context.matched !== _this2) {
          match = false;
        } // 设置了wrapper没有匹配路由，不销毁，只隐藏


        if (cache === true && _this2.routeComponent !== null && !match) {
          return _this2.routeComponent;
        } // 初始化返回值


        _this2.routeComponent = null;

        if (match) {
          context.matched = _this2; // 解决Route在更新时不匹配问题

          _this2.routeComponent = _react.default.createElement(_Context.RouterContext.Provider, {
            value: routeCoreContextValue
          }, _react.default.createElement(_RouteCore.default, _extends({}, _this2.props, {
            cache: cache,
            location: matchResult || location,
            store: _this2.store
          })));
        }

        return _this2.routeComponent;
      });
    }
  }]);

  return Route;
}(_react.default.PureComponent);

exports.default = Route;

_defineProperty(Route, "propTypes", _propTypes.RoutePropTypes);

_defineProperty(Route, "defaultProps", {
  id: '',
  path: '',
  reload: false,
  state: {},
  data: {},
  reducers: {}
});