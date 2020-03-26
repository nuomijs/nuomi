"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseNuomi2 = _interopRequireDefault(require("./BaseNuomi"));

var _utils = require("../utils");

var _propTypes = require("./propTypes");

var _reducer = require("../core/redux/reducer");

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

var BaseRoute = /*#__PURE__*/function (_BaseNuomi) {
  _inherits(BaseRoute, _BaseNuomi);

  function BaseRoute() {
    _classCallCheck(this, BaseRoute);

    return _possibleConstructorReturn(this, _getPrototypeOf(BaseRoute).apply(this, arguments));
  }

  _createClass(BaseRoute, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props = this.props,
          store = _this$props.store,
          cache = _this$props.cache;

      if (cache !== 'state' && cache !== true) {
        (0, _reducer.removeReducer)(store.id);
        store.id = null;
      }

      this.removeListener();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var props = this.props;
      var store = props.store;
      var isReload = store.id && props.reload === true;
      var isChange = prevProps.location !== props.location;

      if (isReload) {
        this.replaceState();
      }

      if (isChange) {
        this.routerChange();
      }

      if (isReload) {
        this.nuomiInit();
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this$props2 = this.props,
          store = _this$props2.store,
          reload = _this$props2.reload; // 初始化

      if (!store.id) {
        this.createStore();
        this.createReducer();
        this.routerChange(true);
        this.nuomiInit(); // 路由刷新
      } else if (reload === true) {
        this.replaceState();
        this.routerChange(true);
        this.nuomiInit(); // 路由切换
      } else {
        this.routerChange();
      }
    }
  }, {
    key: "replaceState",
    value: function replaceState() {
      var props = this.props;
      props.store.dispatch({
        type: '_replaceState',
        payload: _objectSpread({}, props.state)
      });
    }
  }, {
    key: "routerChange",
    value: function routerChange(isReload) {
      var props = this.props;
      var location = props.location,
          onChange = props.onChange;

      if ((0, _utils.isFunction)(location.data)) {
        location.data(props);
      }

      if ((0, _utils.isFunction)(onChange)) {
        onChange.call(props);
      } else if ((0, _utils.isObject)(onChange)) {
        Object.keys(onChange).forEach(function (key) {
          var callback = onChange[key];

          if ((0, _utils.isFunction)(callback)) {
            // 首次加载和刷新时不执行带有$前缀的回调
            if (isReload && key.indexOf('$') === 0) {
              return;
            }

            callback.call(props);
          }
        });
      }
    }
  }]);

  return BaseRoute;
}(_BaseNuomi2.default);

exports.default = BaseRoute;

_defineProperty(BaseRoute, "propTypes", _propTypes.RoutePropTypes);