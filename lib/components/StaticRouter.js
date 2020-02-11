"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Router = _interopRequireDefault(require("./Router"));

var _Context = require("./Context");

var _utils = require("../utils");

var _parser = _interopRequireDefault(require("../utils/parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var StaticRouter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StaticRouter, _React$Component);

  function StaticRouter() {
    _classCallCheck(this, StaticRouter);

    return _possibleConstructorReturn(this, _getPrototypeOf(StaticRouter).apply(this, arguments));
  }

  _createClass(StaticRouter, [{
    key: "getStaticLocation",
    value: function getStaticLocation() {
      var location = this.props.location;
      var staticLocation = location;

      if ((0, _utils.isString)(location)) {
        staticLocation = (0, _parser.default)(location);
      }

      var _staticLocation = staticLocation,
          _staticLocation$searc = _staticLocation.search,
          search = _staticLocation$searc === void 0 ? '' : _staticLocation$searc,
          _staticLocation$hash = _staticLocation.hash,
          hash = _staticLocation$hash === void 0 ? '' : _staticLocation$hash,
          _staticLocation$pathn = _staticLocation.pathname,
          pathname = _staticLocation$pathn === void 0 ? '' : _staticLocation$pathn;
      return {
        search: search,
        hash: hash,
        pathname: _parser.default.replacePath(pathname),
        replace: _utils.noop
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          location = _this$props.location,
          context = _this$props.context,
          rest = _objectWithoutProperties(_this$props, ["location", "context"]);

      return _react.default.createElement(_Context.RouterContext.Provider, {
        value: {
          staticLocation: this.getStaticLocation(),
          staticContext: context
        }
      }, _react.default.createElement(_Router.default, _extends({
        type: "browser"
      }, rest)));
    }
  }]);

  return StaticRouter;
}(_react.default.Component);

_defineProperty(StaticRouter, "defaultProps", {
  basename: '/',
  location: null,
  context: {}
});

_defineProperty(StaticRouter, "propTypes", {
  basename: _propTypes.default.string,
  location: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  context: _propTypes.default.object
});

var _default = StaticRouter;
exports.default = _default;