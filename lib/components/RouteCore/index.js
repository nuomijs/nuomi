"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BaseRoute = _interopRequireDefault(require("../BaseRoute"));

var _utils = require("../../utils");

var _extend = _interopRequireDefault(require("../../utils/extend"));

var _router = require("../../core/router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

var wrappers = [];

var RouteCore =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(RouteCore, _React$PureComponent);

  function RouteCore() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RouteCore);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RouteCore)).call.apply(_getPrototypeOf2, [this].concat(args)));

    var _this$props = _this.props,
        async = _this$props.async,
        data = _this$props.data,
        rest = _objectWithoutProperties(_this$props, ["async", "data"]);

    _this.ref = _react.default.createRef();
    _this.wrapperRef = _react.default.createRef();
    var isAsync = (0, _utils.isFunction)(async);
    _this.state = {
      data: _objectSpread({}, data),
      loaded: !isAsync,
      visible: false,
      props: rest
    };
    return _this;
  }

  _createClass(RouteCore, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var current = this.wrapperRef.current;

      if (current) {
        wrappers.push(current);
      }

      this.visibleWrapperHandler();
      this.loadProps(function () {
        var props = _this2.state.props;

        if (props.onBefore) {
          if (props.onBefore(function () {
            _this2.visibleRoute();
          }) === true) {
            _this2.visibleRoute();
          }
        } else {
          _this2.visibleRoute();
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var location = this.props.location;

      if (location !== prevProps.location) {
        this.visibleWrapperHandler();
      }
    }
  }, {
    key: "loadProps",
    value: function loadProps(cb) {
      var _this3 = this;

      var _this$props2 = this.props,
          async = _this$props2.async,
          data = _this$props2.data,
          rest = _objectWithoutProperties(_this$props2, ["async", "data"]);

      var loaded = this.state.loaded;

      if (!loaded) {
        async(function (props) {
          var dataProps = props.data,
              restProps = _objectWithoutProperties(props, ["data"]);

          _this3.setState({
            loaded: true,
            props: (0, _extend.default)(rest, restProps),
            data: _objectSpread({}, data, dataProps)
          }, cb);
        });
      } else {
        cb && cb();
      }
    }
  }, {
    key: "removeWrapper",
    value: function removeWrapper() {
      var current = this.wrapperRef.current;

      if (current) {
        wrappers = wrappers.filter(function (wrapper) {
          return wrapper !== current;
        });
      }
    }
  }, {
    key: "visibleRoute",
    value: function visibleRoute() {
      this.setState({
        visible: true
      });
    }
  }, {
    key: "visibleWrapperHandler",
    value: function visibleWrapperHandler() {
      var current = this.wrapperRef.current;
      wrappers.forEach(function (wrapper) {
        var elem = wrapper;
        elem.style.display = current === elem ? 'block' : 'none';
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          location = _this$props3.location,
          wrapper = _this$props3.wrapper;
      var _this$state = this.state,
          props = _this$state.props,
          visible = _this$state.visible,
          loaded = _this$state.loaded,
          data = _this$state.data;
      var propsData = data;

      var locationData = location.data,
          reload = location.reload,
          rest = _objectWithoutProperties(location, ["data", "reload"]);

      var extraProps = {};
      rest.params = (0, _router.getParams)(rest, props.path);

      if ((0, _utils.isFunction)(locationData)) {
        /* eslint-disable no-underscore-dangle */
        extraProps._routerChangeCallback = locationData;
      } else if ((0, _utils.isObject)(locationData)) {
        propsData = _objectSpread({}, propsData, locationData);
      }

      if (reload) {
        extraProps.reload = reload;
      }

      if (wrapper || loaded && visible) {
        var baseRoute = _react.default.createElement(_BaseRoute.default, _extends({
          ref: this.ref
        }, props, extraProps, {
          data: propsData,
          location: rest
        }));

        if (wrapper) {
          return _react.default.createElement("div", {
            ref: this.wrapperRef,
            className: "nuomi-route-wrapper"
          }, loaded && visible && baseRoute);
        }

        return baseRoute;
      }

      return null;
    }
  }]);

  return RouteCore;
}(_react.default.PureComponent);

_defineProperty(RouteCore, "propTypes", {
  onBefore: _propTypes.default.func
});

var _default = RouteCore;
exports.default = _default;