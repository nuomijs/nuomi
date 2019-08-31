"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

var _utils = require("../../utils");

var _store = _interopRequireWildcard(require("../../core/redux/store"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var connect = function connect() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var mapStateToProps = args[0],
      mapDispatch = args[1],
      merge = args[2],
      options = args[3];
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

        for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          arg[_key2] = arguments[_key2];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Connect)).call.apply(_getPrototypeOf2, [this].concat(arg)));
        _this.mounted = false;
        var nuomiStore = _this.context.nuomiStore;
        (0, _invariant.default)(nuomiStore, "\u4E0D\u5141\u8BB8\u5728 <Route>\u3001<Nuomi>\u3001<NuomiRoute> \u5916\u90E8\u4F7F\u7528 ".concat(Connect.displayName));

        if ((0, _utils.isObject)(options) && options.withRef === true) {
          _this.ref = _react.default.createRef();
        }

        if ((0, _utils.isFunction)(mapStateToProps)) {
          // 初始化state
          _this.state = _this.getState(); // 订阅更新状态

          _this.unSubcribe = _store.default.subscribe(function () {
            if (_this.mounted && (0, _store.getStore)(nuomiStore.id)) {
              _this.setState(_this.getState());
            }
          });
        }

        return _this;
      }

      _createClass(Connect, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.mounted = true;
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (this.unSubcribe) {
            // 为了防止组件在销毁时执行setState导致报错
            this.mounted = false;
            this.unSubcribe();
          }
        }
      }, {
        key: "getState",
        value: function getState() {
          var nuomiStore = this.context.nuomiStore;
          var state = mapStateToProps(nuomiStore.getState(), _store.default.getState());
          return (0, _utils.isObject)(state) ? state : {};
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
    }), _defineProperty(_class, "displayName", "connect(...)(".concat(WrapperComponent.displayName || WrapperComponent.name, ")")), _temp;
  };
};

var _default = connect;
exports.default = _default;