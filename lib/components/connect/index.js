"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _store = _interopRequireDefault(require("../../core/redux/store"));

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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultMergeProps = function defaultMergeProps(props, stateProps, dispatchProps) {
  return _objectSpread({}, props, stateProps, dispatchProps);
};

var connect = function connect(mapStateToProps, mapDispatch, merge, options) {
  var mapDispatchToProps = (0, _utils.isFunction)(mapDispatch) ? mapDispatch : function () {};
  var mergeProps = (0, _utils.isFunction)(merge) ? merge : defaultMergeProps;
  return function (WrapperComponent) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_React$PureComponent) {
      _inherits(Connect, _React$PureComponent);

      function Connect() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, Connect);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Connect)).call.apply(_getPrototypeOf2, [this].concat(args)));
        var nuomiStore = _this.context.nuomiStore;

        if ((0, _utils.isObject)(options) && options.withRef === true) {
          _this.ref = _react.default.createRef();
        }

        _this.state = {};

        if ((0, _utils.isFunction)(mapStateToProps)) {
          var listener = function listener() {
            if (_this.subcribe) {
              var state = mapStateToProps(nuomiStore.getState(), _store.default.getState());

              _this.subcribe((0, _utils.isObject)(state) ? state : {});
            }
          };

          listener();
          _this.unSubcribe = _store.default.subscribe(listener);
        }

        return _this;
      }

      _createClass(Connect, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this2 = this;

          this.subcribe = function (state) {
            _this2.setState(state);
          };
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (this.unSubcribe) {
            // 设置为null是为了组件在销毁时不执行setState导致报错
            this.subcribe = null;
            this.unSubcribe();
          }
        }
      }, {
        key: "getWrappedInstance",
        value: function getWrappedInstance() {
          if (this.ref) {
            return this.ref.current;
          }

          return null;
        }
      }, {
        key: "getProps",
        value: function getProps() {
          var nuomiStore = this.context.nuomiStore;
          return mergeProps(this.props, this.state, mapDispatchToProps(nuomiStore.dispatch)) || this.props;
        }
      }, {
        key: "subcribe",
        value: function subcribe(state) {
          this.state = state;
        }
      }, {
        key: "render",
        value: function render() {
          var nuomiStore = this.context.nuomiStore;

          var props = _objectSpread({}, this.getProps(), {
            ref: this.ref,
            dispatch: nuomiStore.dispatch
          });

          return _react.default.createElement(WrapperComponent, props);
        }
      }]);

      return Connect;
    }(_react.default.PureComponent), _defineProperty(_class, "contextTypes", {
      nuomiStore: _propTypes.default.object
    }), _temp;
  };
};

var _default = connect;
exports.default = _default;