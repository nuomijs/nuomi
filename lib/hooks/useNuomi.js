"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _react = require("react");

var _Context = require("../components/Context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useNuomi = function useNuomi() {
  var _useContext = (0, _react.useContext)(_Context.NuomiContext),
      nuomiProps = _useContext.nuomiProps;

  (0, _invariant.default)(nuomiProps, '不允许在 <Route>、<Nuomi>、<NuomiRoute> 外部使用 useNuomi');
  return {
    nuomiProps: nuomiProps
  };
};

var _default = useNuomi;
exports.default = _default;