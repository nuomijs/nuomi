"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _invariant = _interopRequireDefault(require("invariant"));

var _Context = require("../components/Context");

var _store = _interopRequireWildcard(require("../core/redux/store"));

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useConnect = function useConnect(callback) {
  var _useContext = (0, _react.useContext)(_Context.NuomiContext),
      nuomiProps = _useContext.nuomiProps;

  (0, _invariant.default)(nuomiProps, '不允许在 <Route>、<Nuomi>、<NuomiRoute> 外部使用 useConnect'); // 获取最近的Nuomi组件store

  var store = nuomiProps.store; // 用于强制更新

  var _useReducer = (0, _react.useReducer)(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1]; // 用于记忆旧状态


  var selectedState = (0, _react.useRef)(); // 获取最新状态

  var getState = function getState() {
    if ((0, _store.getStore)(store.id)) {
      if ((0, _utils.isFunction)(callback)) {
        // 第一个参数是当前Nuomi组件状态，第二个参数是所有组件状态
        return callback(store.getState(), _store.default.getState());
      }

      return store.getState();
    }
  }; // 当前组件状态


  var state = selectedState.current || getState();
  (0, _react.useEffect)(function () {
    // 订阅状态变化触发组件更新
    var unSubcribe = _store.default.subscribe(function () {
      var newState = getState(); // 浅比较旧状态与新状态，发生变化则更新组件

      if ((0, _utils.shallowEqual)(state, newState)) {
        return;
      } // 记忆状态


      selectedState.current = newState; // 强制更新

      forceRender({});
    }); // 组件卸载时取消订阅


    return function () {
      return unSubcribe();
    };
  }, []);
  return [state, store.dispatch];
};

var _default = useConnect;
exports.default = _default;