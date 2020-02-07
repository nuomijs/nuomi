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

var _nuomi = require("../../core/nuomi");

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
    _this.ref = _react.default.createRef();
    _this.wrapperRef = _react.default.createRef();
    _this.mounted = false;
    _this.wrapper = null;

    var _this$props = _this.props,
        async = _this$props.async,
        rest = _objectWithoutProperties(_this$props, ["async"]);

    var loaded = !(0, _utils.isFunction)(async);
    var nuomiProps = (0, _extend.default)((0, _nuomi.getDefaultProps)(), rest);
    _this.state = {
      // 是否异步加载完，async为函数时为false
      loaded: loaded,
      // 是否显示路由组件，异步时为false，因为异步加载的props可能包含onEnter，非异步时，没有onEnter值为true
      visible: loaded ? !nuomiProps.onEnter : false,
      // 异步加载的props
      nuomiProps: nuomiProps
    };
    return _this;
  }

  _createClass(RouteCore, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.mounted = true;
      var current = this.wrapperRef.current;
      var _this$state = this.state,
          loaded = _this$state.loaded,
          nuomiProps = _this$state.nuomiProps;

      if (current) {
        this.wrapper = current;
        wrappers.push(current);
      } // 路由加载后，隐藏所有wrapper


      this.hideWrapper();

      if (!loaded) {
        this.loadProps(function (nextNuomiProps) {
          // 获取异步加载到的props
          _this2.visibleHandler(nextNuomiProps, function () {
            _this2.showWrapper(); // 合并state


            _this2.visibleRoute({
              loaded: true,
              nuomiProps: nextNuomiProps
            });
          });
        });
      } else {
        this.visibleHandler(nuomiProps, function () {
          _this2.showWrapper();

          _this2.visibleRoute();
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      var _this$props2 = this.props,
          location = _this$props2.location,
          wrapper = _this$props2.wrapper;
      var current = this.wrapperRef.current; // 清理wrapper

      if (wrapper === false && this.wrapper) {
        this.removeWrapper();
        this.wrapper = null;
      } else if (wrapper === true && !this.wrapper && current) {
        this.wrapper = current;
        wrappers.push(current);
      }

      if (location !== prevProps.location) {
        // 切换当前路由后，隐藏所有wrapper
        this.hideWrapper();

        if (wrapper === true) {
          // 控制当前路由wrapper显示
          var nuomiProps = this.state.nuomiProps;
          this.visibleHandler(nuomiProps, function () {
            _this3.showWrapper();
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // 防止组件销毁时更新state报错
      this.mounted = false;
      this.removeWrapper();
    } // 设置data临时数据，保存设置前的数据

  }, {
    key: "setData",
    value: function setData(locationData) {
      var nuomiProps = this.state.nuomiProps;
      var data = nuomiProps.data;
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
    key: "restoreData",
    value: function restoreData() {
      var _this4 = this;

      var nuomiProps = this.state.nuomiProps;
      var data = nuomiProps.data;
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
    } // 异步加载props，可以使用require.ensure或import

  }, {
    key: "loadProps",
    value: function loadProps(cb) {
      var async = this.props.async;
      var nuomiProps = this.state.nuomiProps;
      /**
       * async: ((cb) => {
       *  require.ensure([], (require) => {
       *    cb(require(path).default);
       *  })
       * })
       */

      var loadResult = async(function (props) {
        cb((0, _extend.default)(nuomiProps, props));
      });
      /**
       * async: () => import(path);
       */

      if (loadResult && loadResult instanceof Promise) {
        loadResult.then(function (module) {
          return cb((0, _extend.default)(nuomiProps, module.default));
        });
      }
    } // 根据onEnter决定是否可以展示组件
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "visibleHandler",
    value: function visibleHandler(nuomiProps, cb) {
      if (nuomiProps.onEnter) {
        if (nuomiProps.onEnter(function () {
          cb();
        }) === true) {
          cb();
        }
      } else {
        cb();
      }
    }
  }, {
    key: "visibleRoute",
    value: function visibleRoute(state) {
      var visible = this.state.visible;

      if (this.mounted) {
        if (!visible) {
          this.setState(_objectSpread({
            visible: true
          }, state));
        } else if (state) {
          this.setState(state);
        }
      }
    }
  }, {
    key: "showWrapper",
    value: function showWrapper() {
      if (this.wrapper) {
        this.wrapper.style.display = 'block';
      }
    } // 移出当前wrapper

  }, {
    key: "removeWrapper",
    value: function removeWrapper() {
      var _this5 = this;

      if (this.wrapper) {
        wrappers = wrappers.filter(function (wrapper) {
          return wrapper !== _this5.wrapper;
        });
      }
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "hideWrapper",
    value: function hideWrapper() {
      wrappers.forEach(function (wrapper) {
        wrapper.style.display = 'none';
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          location = _this$props3.location,
          wrapper = _this$props3.wrapper;
      var _this$state2 = this.state,
          nuomiProps = _this$state2.nuomiProps,
          visible = _this$state2.visible,
          loaded = _this$state2.loaded;
      var data = location.data,
          _location$reload = location.reload,
          reload = _location$reload === void 0 ? nuomiProps.reload : _location$reload;
      this.restoreData();

      if ((0, _utils.isObject)(data)) {
        this.setData(data);
      }

      if (wrapper || loaded && visible) {
        var baseRoute = _react.default.createElement(_BaseRoute.default, _extends({
          ref: this.ref
        }, nuomiProps, {
          reload: reload,
          location: location
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
  async: _propTypes.default.func,
  onEnter: _propTypes.default.func
});

_defineProperty(RouteCore, "contextTypes", {
  routeTempData: _propTypes.default.object
});

var _default = RouteCore;
exports.default = _default;