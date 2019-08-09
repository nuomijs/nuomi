"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _RouterContext = _interopRequireDefault(require("../RouterContext"));

var _Nuomi2 = _interopRequireDefault(require("../Nuomi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NuomiRoute =
/*#__PURE__*/
function (_Nuomi) {
  _inherits(NuomiRoute, _Nuomi);

  function NuomiRoute() {
    _classCallCheck(this, NuomiRoute);

    return _possibleConstructorReturn(this, _getPrototypeOf(NuomiRoute).apply(this, arguments));
  }

  _createClass(NuomiRoute, [{
    key: "matchPath",
    value: function matchPath(pathname) {
      var pathPrefix = this.props.pathPrefix;

      if (pathPrefix) {
        if (pathPrefix instanceof RegExp) {
          return pathPrefix.test(pathname);
        }

        if (typeof pathPrefix === 'string') {
          return pathname.indexOf(pathPrefix) === 0;
        }
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react.default.createElement(_RouterContext.default.Consumer, null, function (context) {
        var location = context.location;

        if (!context.matched && _this.matchPath(location.pathname)) {
          // eslint-disable-next-line no-param-reassign
          context.matched = _this;
          return _react.default.createElement(_RouterContext.default.Provider, {
            value: {
              location: location,
              matched: null
            }
          }, _get(_getPrototypeOf(NuomiRoute.prototype), "render", _this).call(_this));
        }

        return null;
      });
    }
  }]);

  return NuomiRoute;
}(_Nuomi2.default);

_defineProperty(NuomiRoute, "propTypes", {
  pathPrefix: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
});

var _default = NuomiRoute;
exports.default = _default;