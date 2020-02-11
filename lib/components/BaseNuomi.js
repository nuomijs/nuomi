"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _reducer = require("../core/redux/reducer");

var _store = _interopRequireWildcard(require("../core/redux/store"));

var _utils = require("../utils");

var _effectsProxy = _interopRequireWildcard(require("../utils/effectsProxy"));

var _Context = require("./Context");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    _this.effects = null;
    _this.contextValue = {
      nuomiProps: _this.props
    };

    _this.initialize();

    return _this;
  }

  _createClass(BaseNuomi, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var store = this.props.store;
      (0, _reducer.removeReducer)(store.id);
      store.id = null;
      this.removeListener();
    }
  }, {
    key: "getId",
    value: function getId() {
      var id = this.props.id; // 没有定义id或者id已经被使用

      if (!id || !!(0, _store.getStore)(id)) {
        BaseNuomi.nuomiId += 1;
        var newId = "nuomi_".concat(BaseNuomi.nuomiId);
        (0, _warning.default)(!id, "storeId\uFF1A".concat(id, " \u5DF2\u88AB\u4F7F\u7528\uFF0C\u5C06\u7531 ").concat(newId, " \u66FF\u4EE3"));
        return newId;
      }

      return id;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.createStore();
      this.createReducer();
      this.nuomiInit();
    }
  }, {
    key: "getEffects",
    value: function getEffects() {
      var _this2 = this;

      var props = this.props;
      var effects = props.effects,
          store = props.store;
      var newEffects = {};

      if ((0, _utils.isObject)(effects)) {
        newEffects = _objectSpread({}, effects, {
          getNuomiProps: function getNuomiProps() {
            return _this2.props;
          },
          getState: store.getState,
          dispatch: store.dispatch
        });
      } else if ((0, _utils.isFunction)(effects)) {
        newEffects = props.effects() || {};
      }

      return newEffects.constructor === Object ? newEffects : (0, _effectsProxy.getClassEffects)(newEffects);
    }
  }, {
    key: "createStore",
    value: function createStore() {
      var _this3 = this;

      var props = this.props;
      var store = props.store,
          reducers = props.reducers;
      store.id = this.getId();

      store.dispatch =
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(action) {
          var type, payload, splitIndex, loadingQueue, effectsProxy, loadingPayload, lastEffect, id, effect, $store, dispatchReturn;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  type = action.type, payload = action.payload;

                  if (!_this3.effects) {
                    _this3.effects = _this3.getEffects();
                  } // type中包含斜杠视为调用其他模块方法


                  splitIndex = type.indexOf('/');

                  if (!(splitIndex === -1)) {
                    _context.next = 29;
                    break;
                  }

                  if (!((0, _utils.isObject)(_this3.effects) && (0, _utils.isFunction)(_this3.effects[type]))) {
                    _context.next = 22;
                    break;
                  }

                  // 带有loading功能的方法队列
                  loadingQueue = [];
                  _context.prev = 6;
                  // 通过代理可以知道调用的方法内部调用情况，调用的函数本身以及函数内部调用的方法或者属性都会走get
                  effectsProxy = new _effectsProxy.default(_this3.effects, {
                    // name是当前调用的方法或者属性名
                    get: function get(target, name) {
                      var effect = _this3.effects[name]; // $开头的方法进行loading特殊处理

                      if ((0, _utils.isFunction)(effect) && name.indexOf('$') === 0) {
                        // 获取上一次调用的方法
                        var prevEffect = loadingQueue.slice(-1)[0]; // 开启loading

                        var loadingPayload = _defineProperty({}, name, true); // 当前方法调用，说明上一个方法肯定调用结束了，因此关闭上一个loading
                        // 需排除最外层调用方法，该方法在finally中处理


                        if (prevEffect !== type && prevEffect) {
                          loadingPayload[prevEffect] = false; // 从队列中移除执行完的loading方法名

                          loadingQueue.pop();
                        } // 更新loading状态


                        _store.default.dispatch({
                          type: "".concat(store.id, "/_updateLoading"),
                          payload: loadingPayload
                        }); // 将当前loading方法名添加到队列中，如果最后执行的方法带有loading，在finally中处理


                        loadingQueue.push(name);
                      } // 返回当前调用对象


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

                  if (!(_context.t0 && _context.t0.constructor !== Object)) {
                    _context.next = 17;
                    break;
                  }

                  throw _context.t0;

                case 17:
                  _context.prev = 17;

                  // 所有方法全部执行完，检测队列中是否有值，关闭剩余的loading
                  if (loadingQueue.length) {
                    // 最初的loading
                    loadingPayload = _defineProperty({}, loadingQueue[0], false); // 末尾的loading

                    lastEffect = loadingQueue.slice(-1)[0];

                    if (lastEffect) {
                      loadingPayload[lastEffect] = false;
                    }

                    _store.default.dispatch({
                      type: "".concat(store.id, "/_updateLoading"),
                      payload: loadingPayload
                    });
                  }

                  return _context.finish(17);

                case 20:
                  _context.next = 27;
                  break;

                case 22:
                  if (!reducers[type]) {
                    _context.next = 26;
                    break;
                  }

                  return _context.abrupt("return", _store.default.dispatch({
                    type: "".concat(store.id, "/").concat(type),
                    payload: payload
                  }));

                case 26:
                  return _context.abrupt("return", action);

                case 27:
                  _context.next = 37;
                  break;

                case 29:
                  id = type.substr(0, splitIndex);
                  effect = type.substr(splitIndex + 1);
                  $store = (0, _store.getStore)(id);

                  if (!$store) {
                    _context.next = 37;
                    break;
                  }

                  _context.next = 35;
                  return $store.dispatch({
                    type: effect,
                    payload: payload
                  });

                case 35:
                  dispatchReturn = _context.sent;
                  return _context.abrupt("return", dispatchReturn);

                case 37:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[6, 13, 17, 20]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();

      store.getState = function () {
        return _store.default.getState()[store.id] || props.state;
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

          (0, _warning.default)(false, "\u672A\u5B9A\u4E49actionType\u4E3A ".concat(type, " \u7684reducer\uFF0C\u5982\u679C\u4F60\u662F\u60F3\u8C03\u7528effects\u4E2D\u7684\u65B9\u6CD5\uFF0C\u8BF7\u4F7F\u7528\n          \nstore.getStore('").concat(store.id, "').dispatch({\n  type: '").concat(key, "',\n  payload,\n})"));
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
      return children ? _react.default.createElement(_Context.NuomiContext.Provider, {
        value: this.contextValue
      }, children) : null;
    }
  }]);

  return BaseNuomi;
}(_react.default.PureComponent);

_defineProperty(BaseNuomi, "propTypes", {
  id: _propTypes.default.string,
  state: _propTypes.default.object,
  data: _propTypes.default.object,
  store: _propTypes.default.object,
  reducers: _propTypes.default.objectOf(_propTypes.default.func),
  effects: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  render: _propTypes.default.func,
  onInit: _propTypes.default.func
});

_defineProperty(BaseNuomi, "nuomiId", 0);

var _default = BaseNuomi;
exports.default = _default;