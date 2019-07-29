"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reducer = require("../../core/redux/reducer");

var _store = _interopRequireWildcard(require("../../core/redux/store"));

var _utils = require("../../utils");

var _effectsProxy = _interopRequireDefault(require("../../utils/effectsProxy"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BaseNuomi =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(BaseNuomi, _React$PureComponent);

  function BaseNuomi() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BaseNuomi);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BaseNuomi)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.unListener = null;

    _this.initialize();

    return _this;
  }

  _createClass(BaseNuomi, [{
    key: "getChildContext",
    value: function getChildContext() {
      var store = this.props.store;
      return {
        nuomiStore: store,
        sourceProps: this.props
      };
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeListener();
    }
  }, {
    key: "getId",
    value: function getId() {
      BaseNuomi.nuomiId += 1;
      var id = this.props.id;
      var defaultId = "nuomi_".concat(BaseNuomi.nuomiId);
      return id || defaultId;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.createStore();
      this.createReducer();
      this.nuomiInit();
    }
  }, {
    key: "createStore",
    value: function createStore() {
      var _this2 = this;

      var props = this.props;
      var store = props.store,
          reducers = props.reducers;
      store.id = this.getId();

      store.dispatch =
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(_ref) {
          var type, payload, splitIndex, queue, effectsProxy, loadingPayload, lastEffect, id, effect, $store;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  type = _ref.type, payload = _ref.payload;

                  if (!_this2.effects) {
                    _this2.effects = props.effects ? props.effects() : null;
                  }

                  splitIndex = type.indexOf('/');

                  if (!(splitIndex === -1)) {
                    _context.next = 25;
                    break;
                  }

                  if (!((0, _utils.isObject)(_this2.effects) && (0, _utils.isFunction)(_this2.effects[type]))) {
                    _context.next = 22;
                    break;
                  }

                  queue = [];
                  _context.prev = 6;
                  effectsProxy = (0, _effectsProxy.default)(_this2.effects, {
                    get: function get(target, name) {
                      var effect = _this2.effects[name];

                      if ((0, _utils.isFunction)(effect) && name.indexOf('$') === 0) {
                        var prevEffect = queue.slice(-1)[0];

                        var loadingPayload = _defineProperty({}, name, true);

                        if (prevEffect !== type && prevEffect) {
                          loadingPayload[prevEffect] = false;
                        }

                        _store.default.dispatch({
                          type: "".concat(store.id, "/updateLoading"),
                          payload: loadingPayload
                        });

                        queue.push(name);
                      }

                      return effect;
                    }
                  });
                  _context.next = 10;
                  return effectsProxy[type](payload);

                case 10:
                  return _context.abrupt("return", _context.sent);

                case 13:
                  _context.prev = 13;
                  _context.t0 = _context["catch"](6);

                  if (!(_context.t0 instanceof Error)) {
                    _context.next = 17;
                    break;
                  }

                  throw _context.t0;

                case 17:
                  _context.prev = 17;

                  if (queue.length) {
                    loadingPayload = _defineProperty({}, queue[0], false);
                    lastEffect = queue.slice(-1)[0];

                    if (lastEffect) {
                      loadingPayload[lastEffect] = false;
                    }

                    _store.default.dispatch({
                      type: "".concat(store.id, "/updateLoading"),
                      payload: loadingPayload
                    });
                  }

                  return _context.finish(17);

                case 20:
                  _context.next = 23;
                  break;

                case 22:
                  if (reducers[type]) {
                    _store.default.dispatch({
                      type: "".concat(store.id, "/").concat(type),
                      payload: payload
                    });
                  }

                case 23:
                  _context.next = 29;
                  break;

                case 25:
                  id = type.substr(0, splitIndex);
                  effect = type.substr(splitIndex + 1);
                  $store = (0, _store.getStore)(id);

                  if ($store) {
                    $store.dispatch({
                      type: effect,
                      payload: payload
                    });
                  }

                case 29:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[6, 13, 17, 20]]);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }();

      store.getState = function () {
        return _store.default.getState()[store.id];
      };

      (0, _store.setStore)(store.id, store);
    }
  }, {
    key: "createReducer",
    value: function createReducer() {
      var _this$props = this.props,
          store = _this$props.store,
          defaultState = _this$props.state,
          reducers = _this$props.reducers;
      (0, _reducer.createReducer)(store.id, function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
        var action = arguments.length > 1 ? arguments[1] : undefined;
        var type = action.type;
        var typePrefix = "".concat(store.id, "/");

        if (type.indexOf(typePrefix) === 0) {
          var key = type.replace(typePrefix, '');

          if (reducers[key]) {
            return reducers[key](state, action);
          }
        }

        return state;
      });
    }
  }, {
    key: "removeListener",
    value: function removeListener() {
      if ((0, _utils.isFunction)(this.unListener)) {
        this.unListener();
        this.unListener = null;
      }
    }
  }, {
    key: "nuomiInit",
    value: function nuomiInit() {
      var props = this.props;
      this.removeListener();

      if (props.onInit) {
        this.unListener = props.onInit();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var children = props.render ? props.render() : props.children;
      return children || null;
    }
  }]);

  return BaseNuomi;
}(_react.default.PureComponent);

_defineProperty(BaseNuomi, "propTypes", {
  id: _propTypes.default.string,
  state: _propTypes.default.object,
  data: _propTypes.default.object,
  store: _propTypes.default.object,
  reducers: _propTypes.default.object,
  effects: _propTypes.default.func,
  render: _propTypes.default.func,
  onInit: _propTypes.default.func
});

_defineProperty(BaseNuomi, "childContextTypes", {
  nuomiStore: _propTypes.default.object,
  sourceProps: _propTypes.default.object
});

_defineProperty(BaseNuomi, "nuomiId", 0);

var _default = BaseNuomi;
exports.default = _default;