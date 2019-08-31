"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

var _RouterContext = _interopRequireDefault(require("../RouterContext"));

var _router = require("../../core/router");

var _parser = _interopRequireDefault(require("../../utils/parser"));

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

var Redirect =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Redirect, _React$PureComponent);

  function Redirect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Redirect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Redirect)).call.apply(_getPrototypeOf2, [this].concat(args))); // 防止死循环

    _this.redirected = false;
    return _this;
  }

  _createClass(Redirect, [{
    key: "matchPath",
    value: function matchPath(_ref) {
      var pathname = _ref.pathname;
      var from = this.props.from;
      return pathname === _parser.default.replacePath(from);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          from = _this$props.from,
          to = _this$props.to,
          reload = _this$props.reload;
      return _react.default.createElement(_RouterContext.default.Consumer, null, function (context) {
        (0, _invariant.default)(context, '不允许在 <Router> 外部使用 <Redirect>');
        var matched = context.matched,
            location = context.location;

        if (to && !context.redirecting && !_this2.redirected) {
          if (from && _this2.matchPath(location) || !matched && !from) {
            _this2.redirected = true; // eslint-disable-next-line no-param-reassign

            context.redirecting = true; // 防止同时执行多个Redirect

            (0, _router.location)(to, reload);
          }
        } else if (_this2.redirected) {
          _this2.redirected = false;
        }

        return null;
      });
    }
  }]);

  return Redirect;
}(_react.default.PureComponent);

_defineProperty(Redirect, "defaultProps", {
  from: '',
  to: '',
  reload: false
});

_defineProperty(Redirect, "propTypes", {
  from: _propTypes.default.string,
  to: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  reload: _propTypes.default.bool
});

var _default = Redirect;
exports.default = _default;