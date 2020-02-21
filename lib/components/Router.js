"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _invariant = _interopRequireDefault(require("invariant"));

var _Context = require("./Context");

var _router = require("../core/router");

var _store = require("../core/redux/store");

var _propTypes = require("./propTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Router =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Router, _React$PureComponent);

  function Router() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Router);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Router)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.mounted = false;
    _this.state = {};
    _this.location = null;
    _this.wrappers = [];

    var _ref = _this.context || {},
        staticLocation = _ref.staticLocation;

    _this.clearRouter = (0, _router.createRouter)(_this.props, staticLocation, function (location) {
      if (_this.mounted) {
        _this.setState({
          location: location
        });
      } else {
        _this.location = location;

        if (!_this.state.location) {
          _this.state.location = location;
        }
      }
    });

    if (!_this.clearRouter) {
      (0, _invariant.default)(false, '<Router> 不能重复创建');
    }

    return _this;
  }

  _createClass(Router, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true; // createRouter回调可能在Router组件未被渲染结束调用多次，因此渲染完成后更新一次state

      if (this.state.location !== this.location) {
        this.setState({
          location: this.location
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.clearRouter) {
        this.clearRouter();
        this.mounted = false;
        this.location = null;
        (0, _store.clearStore)();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var location = this.state.location;

      var _ref2 = this.context || {},
          staticContext = _ref2.staticContext;

      var contextValue = {
        location: location,
        staticContext: staticContext,
        matched: null,
        wrappers: this.wrappers
      };
      return _react.default.createElement(_Context.RouterContext.Provider, {
        value: contextValue
      }, children);
    }
  }]);

  return Router;
}(_react.default.PureComponent);

exports.default = Router;

_defineProperty(Router, "propTypes", _propTypes.RouterPropTypes);

_defineProperty(Router, "contextType", _Context.RouterContext);

_defineProperty(Router, "defaultProps", {
  basename: '/',
  type: 'hash'
});