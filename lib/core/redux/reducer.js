"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeReducer = exports.createReducer = void 0;

var _redux = require("redux");

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  replaceReducer();
};

exports.removeReducer = removeReducer;