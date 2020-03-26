"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _invariant = _interopRequireDefault(require("invariant"));

var _Link2 = require("./Link");

var _propTypes = require("./propTypes");

var _router = _interopRequireWildcard(require("../core/router"));

var _utils = require("../utils");

var _Context = require("./Context");

var _parser2 = _interopRequireWildcard(require("../utils/parser"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var NavLink = /*#__PURE__*/function (_Link) {
  _inherits(NavLink, _Link);

  function NavLink() {
    _classCallCheck(this, NavLink);

    return _possibleConstructorReturn(this, _getPrototypeOf(NavLink).apply(this, arguments));
  }

  _createClass(NavLink, [{
    key: "isActive",
    value: function isActive(location) {
      var _this$props = this.props,
          isActive = _this$props.isActive,
          to = _this$props.to,
          path = _this$props.path;

      var _parser = (0, _parser2.default)((0, _parser2.restorePath)(to)),
          pathname = _parser.pathname;

      var match = _router.default.matchPath(location, path || pathname);

      if ((0, _utils.isFunction)(isActive)) {
        return isActive(match, location) !== false;
      }

      return match;
    }
  }, {
    key: "getActiveProps",
    value: function getActiveProps(location) {
      var _this$props2 = this.props,
          className = _this$props2.className,
          style = _this$props2.style,
          activeClassName = _this$props2.activeClassName,
          activeStyle = _this$props2.activeStyle;
      var props = {
        className: className,
        style: style
      };

      if (this.isActive(location)) {
        props.className = [className, activeClassName].filter(function (name) {
          return !!name;
        }).join(' ');
        props.style = _objectSpread({}, activeStyle, {}, style);
      }

      return props;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props3 = this.props,
          to = _this$props3.to,
          path = _this$props3.path,
          reload = _this$props3.reload,
          data = _this$props3.data,
          replace = _this$props3.replace,
          activeClassName = _this$props3.activeClassName,
          activeStyle = _this$props3.activeStyle,
          isActive = _this$props3.isActive,
          forwardRef = _this$props3.forwardRef,
          rest = _objectWithoutProperties(_this$props3, ["to", "path", "reload", "data", "replace", "activeClassName", "activeStyle", "isActive", "forwardRef"]);

      return _react.default.createElement(_Context.RouterContext.Consumer, null, function (context) {
        (0, _invariant.default)(context, '不允许在 <Router> 外部使用 <NavLink>');
        var location = context.location;
        return _react.default.createElement("a", _extends({
          href: (0, _router.combinePath)(to)
        }, rest, _this.getActiveProps(location), {
          onClick: _this.onClick,
          ref: forwardRef
        }));
      });
    }
  }]);

  return NavLink;
}(_Link2.Link);

_defineProperty(NavLink, "propTypes", _propTypes.NavLinkPropTypes);

_defineProperty(NavLink, "defaultProps", {
  to: '',
  path: '',
  activeClassName: 'active',
  data: null,
  replace: false,
  reload: false
});

var _default = _react.default.forwardRef(function (props, ref) {
  return _react.default.createElement(NavLink, _extends({}, props, {
    forwardRef: ref
  }));
});

exports.default = _default;