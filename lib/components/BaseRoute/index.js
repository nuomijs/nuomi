"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BaseNuomi2 = _interopRequireDefault(require("../BaseNuomi"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BaseRoute =
/*#__PURE__*/
function (_BaseNuomi) {
  _inherits(BaseRoute, _BaseNuomi);

  function BaseRoute() {
    _classCallCheck(this, BaseRoute);

    return _possibleConstructorReturn(this, _getPrototypeOf(BaseRoute).apply(this, arguments));
  }

  _createClass(BaseRoute, [{
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
      var _this$props = this.props,
          store = _this$props.store,
          reload = _this$props.reload;

      if (!store.id) {
        this.createStore();
        this.createReducer();
        this.routerChange(true);
        this.nuomiInit();
      } else if (reload === true) {
        this.replaceState();
        this.routerChange(true);
        this.nuomiInit();
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
        payload: props.state
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

_defineProperty(BaseRoute, "propTypes", {
  id: _propTypes.default.string,
  reload: _propTypes.default.bool,
  state: _propTypes.default.object,
  data: _propTypes.default.object,
  store: _propTypes.default.object,
  location: _propTypes.default.object,
  reducers: _propTypes.default.objectOf(_propTypes.default.func),
  effects: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  render: _propTypes.default.func,
  onBefore: _propTypes.default.func,
  onInit: _propTypes.default.func,
  onChange: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  onLeave: _propTypes.default.func
});

_defineProperty(BaseRoute, "childContextTypes", {
  nuomiStore: _propTypes.default.object,
  nuomiProps: _propTypes.default.object
});

var _default = BaseRoute;
exports.default = _default;