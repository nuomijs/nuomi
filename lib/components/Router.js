"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Context = require("./Context");

var _router = require("../core/router");

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
    _this.destroyRouter = (0, _router.createRouter)(_this.props, _this.context.staticLocation, function (location) {
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
      if (this.destroyRouter) {
        this.destroyRouter();
        this.mounted = false;
        this.location = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var location = this.state.location;
      var staticContext = this.context.staticContext;
      return _react.default.createElement(_Context.RouterContext.Provider, {
        value: {
          location: location,
          matched: null,
          restore: false,
          isLeave: false,
          staticContext: staticContext
        }
      }, children);
    }
  }]);

  return Router;
}(_react.default.PureComponent);

_defineProperty(Router, "defaultProps", {
  basename: '/',
  type: 'hash'
});

_defineProperty(Router, "propTypes", {
  basename: _propTypes.default.string,
  type: _propTypes.default.oneOf(['hash', 'browser'])
});

_defineProperty(Router, "contextType", _Context.RouterContext);

var _default = Router;
exports.default = _default;