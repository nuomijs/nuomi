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
        rest = _objectWithoutProperties(_this$props, ["async"]);

    _this.ref = _react.default.createRef();
    _this.wrapperRef = _react.default.createRef();
    _this.mounted = false;
    var isAsync = (0, _utils.isFunction)(async);
    _this.state = {
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

      this.mounted = true;
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
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: "loaded",
    value: function loaded(props, cb) {
      var _this$props2 = this.props,
          async = _this$props2.async,
          rest = _objectWithoutProperties(_this$props2, ["async"]);

      if (this.mounted) {
        this.setState({
          loaded: true,
          props: (0, _extend.default)(rest, props)
        }, cb);
      }
    }
  }, {
    key: "loadProps",
    value: function loadProps(cb) {
      var _this3 = this;

      var async = this.props.async;
      var loaded = this.state.loaded;

      if (!loaded) {
        var loadResult = async(function (props) {
          _this3.loaded(props, cb);
        });

        if (loadResult && loadResult instanceof Promise) {
          loadResult.then(function (module) {
            return _this3.loaded(module.default, cb);
          });
        }
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
      if (this.mounted) {
        this.setState({
          visible: true
        });
      }
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
    key: "getData",
    value: function getData() {
      var _this4 = this;

      var props = this.state.props;
      var data = props.data;
      var routeTempData = this.context.routeTempData; // 删除临时数据

      if (routeTempData.temp) {
        var tempDataKeys = Object.keys(routeTempData.temp);

        if (tempDataKeys.length) {
          tempDataKeys.forEach(function (key) {
            delete data[key];
          });
          routeTempData.temp = null;
        }
      } // 还原旧数据


      if (routeTempData.prev) {
        var prevDataKeys = Object.keys(routeTempData.prev);

        if (prevDataKeys.length) {
          prevDataKeys.forEach(function (key) {
            data[key] = _this4.oldData[key];
          });
          routeTempData.prev = null;
        }
      }

      return data;
    } // 设置data临时数据，保存设置前的数据

  }, {
    key: "setData",
    value: function setData(locationData) {
      var props = this.state.props;
      var data = props.data;
      var routeTempData = this.context.routeTempData;
      var keys = Object.keys(locationData);

      if (keys.length) {
        var dataKeys = Object.keys(data); // 存储临时数据

        routeTempData.temp = locationData; // 存储之前的data数据，为了临时数据使用完后还原

        routeTempData.prev = {};
        keys.forEach(function (key) {
          if (dataKeys.includes(key)) {
            routeTempData.prev[key] = dataKeys[key];
          }

          data[key] = locationData[key];
        });
      }
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
          loaded = _this$state.loaded;

      var locationData = location.data,
          reload = location.reload,
          rest = _objectWithoutProperties(location, ["data", "reload"]);

      var extraProps = {};
      var data = this.getData();
      rest.params = (0, _router.getParams)(rest, props.path);

      if ((0, _utils.isFunction)(locationData)) {
        /* eslint-disable no-underscore-dangle */
        extraProps._routerChangeCallback = locationData;
      } else if ((0, _utils.isObject)(locationData)) {
        this.setData(locationData);
      }

      if (reload) {
        extraProps.reload = reload;
      }

      if (wrapper || loaded && visible) {
        var baseRoute = _react.default.createElement(_BaseRoute.default, _extends({
          ref: this.ref
        }, props, extraProps, {
          data: data,
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

_defineProperty(RouteCore, "contextTypes", {
  routeTempData: _propTypes.default.object
});

var _default = RouteCore;
exports.default = _default;