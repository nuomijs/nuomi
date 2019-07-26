"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BaseNuomi2 = _interopRequireDefault(require("../BaseNuomi"));

var _router = require("../../core/router");

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
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BaseRoute);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BaseRoute)).call.apply(_getPrototypeOf2, [this].concat(args)));
    var _this$props = _this.props,
        store = _this$props.store,
        reload = _this$props.reload;

    if (!store.id) {
      _this.createStore();

      _this.createReducer();
    } else if (reload === true) {
      _this.checkResetState(_this.props);
    }

    _this.routerChange();

    return _this;
  }
  /* eslint-disable camelcase */


  _createClass(BaseRoute, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var props = this.props;
      this.checkResetState(nextProps);

      if (nextProps.location !== props.location) {
        this.routerChange();
      }
    }
  }, {
    key: "checkResetState",
    value: function checkResetState(nextProps) {
      var _this$props2 = this.props,
          store = _this$props2.store,
          state = _this$props2.state;

      if (store.id && nextProps.reload === true) {
        store.dispatch({
          type: 'setState',
          payload: state
        });
        this.initialize();
      }
    }
  }, {
    key: "routerChange",
    value: function routerChange() {
      var props = this.props;

      if (props.onChange) {
        props.onChange();
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var props = this.props;
      var routerLocationCallback = props.routerLocationCallback;

      if (routerLocationCallback) {
        routerLocationCallback(props);
      }

      if (props.onInit) {
        props.onInit();
      }
    }
  }]);

  return BaseRoute;
}(_BaseNuomi2.default);

_defineProperty(BaseRoute, "propTypes", {
  id: _propTypes.default.string,
  wrapper: _propTypes.default.bool,
  reload: _propTypes.default.bool,
  state: _propTypes.default.object,
  data: _propTypes.default.object,
  store: _propTypes.default.object,
  reducers: _propTypes.default.object,
  effects: _propTypes.default.func,
  render: _propTypes.default.func,
  onBefore: _propTypes.default.func,
  onInit: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onLeave: _propTypes.default.func
});

var _default = BaseRoute;
exports.default = _default;