"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

var _Context = require("../Context");

var _RouteCore = _interopRequireDefault(require("../RouteCore"));

var _router = require("../../core/router");

var _nuomi = require("../../core/nuomi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var activeRouteComponent = null;

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
    _this.ref = _react.default.createRef();
    _this.routeComponent = null;
    var path = _this.props.path;
    (0, _router.savePath)(path);
    return _this;
  }

  _createClass(Route, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        routeTempData: this.routeTempData
      };
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var path = this.props.path;

      if (activeRouteComponent === this.routeComponent) {
        activeRouteComponent = null;
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
          _this$props$wrapper = _this$props.wrapper,
          wrapper = _this$props$wrapper === void 0 ? defaultProps.wrapper : _this$props$wrapper;
      return _react.default.createElement(_Context.RouterContext.Consumer, null, function (context) {
        (0, _invariant.default)(context, '不允许在 <Router> 外部使用 <Route>');
        var location = context.location;
        var match = (0, _router.matchPath)(location, path); // context.matched 表示同一个上下文中，多个路由只匹配一个

        if (context.matched && context.matched !== _this2) {
          match = false;
        } // 设置了wrapper没有匹配路由，不销毁，只隐藏


        if (wrapper === true && _this2.routeComponent !== null && !match) {
          return _this2.routeComponent;
        } // 还原路由时，不重新渲染组件


        if (context.restore) {
          return _this2.routeComponent;
        } // 检测之前的路由onLeave


        if (!!activeRouteComponent && !!activeRouteComponent.ref.current && !context.callOnLeave) {
          var baseRouteComponent = activeRouteComponent.ref.current.ref.current;

          if (baseRouteComponent) {
            var props = baseRouteComponent.props;

            if (props.onLeave) {
              var leave = function leave() {
                // 1.防止跳转后再次执行onLeave导致死循环，2.用作调用leave后的标记
                activeRouteComponent = null;
                (0, _router.location)(location, location.data, location.reload);
              };

              var leaveResult = props.onLeave(function () {
                return leave();
              });

              if (activeRouteComponent === null) {
                (0, _invariant.default)(false, 'onLeave中不能直接进行路由跳转，可以通过返回布尔值控制，' + '如果想确认框确认或者异步操作之后跳转，请将逻辑代码置于return false之前，在回调中调用leave方法。');
              } // 防止onLeave重复执行


              context.callOnLeave = true;

              if (leaveResult === false) {
                // 还原路由标记
                context.restore = true; // 还原为之前的路由，还原时所有的监听不会执行

                (0, _router.normalLocation)(props.location);
                return _this2.routeComponent;
              }
            }
          }
        } // 初始化返回值


        _this2.routeComponent = null;

        if (match) {
          context.matched = _this2; // 解决Route在更新时不匹配问题
          // 记录当前路由

          activeRouteComponent = _react.default.createElement(_RouteCore.default, _extends({}, _this2.props, {
            wrapper: wrapper,
            location: (0, _router.getParamsLocation)(location, path),
            store: _this2.store,
            ref: _this2.ref
          }));
          _this2.routeComponent = activeRouteComponent;
        }

        return _this2.routeComponent;
      });
    }
  }]);

  return Route;
}(_react.default.PureComponent);

_defineProperty(Route, "propTypes", {
  path: _propTypes.default.string,
  wrapper: _propTypes.default.bool,
  id: _propTypes.default.string,
  reload: _propTypes.default.bool,
  state: _propTypes.default.object,
  data: _propTypes.default.object,
  reducers: _propTypes.default.objectOf(_propTypes.default.func),
  effects: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  render: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onInit: _propTypes.default.func,
  onChange: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  onLeave: _propTypes.default.func,
  async: _propTypes.default.func
});

_defineProperty(Route, "defaultProps", {
  id: '',
  path: '',
  reload: false,
  state: {},
  data: {},
  reducers: {}
});

_defineProperty(Route, "childContextTypes", {
  routeTempData: _propTypes.default.object
});

var _default = Route;
exports.default = _default;