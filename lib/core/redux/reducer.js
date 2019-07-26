"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeReducer = exports.createReducer = void 0;

var _redux = require("redux");

var _store = _interopRequireWildcard(require("./store"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var reducers = {};

var replaceReducer = function replaceReducer() {
  _store.default.replaceReducer((0, _redux.combineReducers)(reducers));
};

var createReducer = function createReducer(key, reducer) {
  reducers[key] = reducer;
  replaceReducer();
};

exports.createReducer = createReducer;

var removeReducer = function removeReducer(key) {
  delete reducers[key];
  (0, _store.setStore)(key, null);
  replaceReducer();
};

exports.removeReducer = removeReducer;