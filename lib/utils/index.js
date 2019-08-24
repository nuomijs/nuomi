"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNative = exports.isArray = exports.isObject = exports.isString = exports.isFunction = exports.isType = void 0;

var isType = function isType(type) {
  return function (obj) {
    return {}.toString.call(obj) === "[object ".concat(type, "]");
  };
};

exports.isType = isType;
var isFunction = isType('Function');
exports.isFunction = isFunction;
var isString = isType('String');
exports.isString = isString;

var isObject = function isObject(obj) {
  return obj && isType('Object')(obj);
};

exports.isObject = isObject;
var isArray = Array.isArray || isType('Array');
exports.isArray = isArray;

var isNative = function isNative(obj) {
  return typeof obj !== 'undefined' && /native code/i.test(obj.toString());
};

exports.isNative = isNative;