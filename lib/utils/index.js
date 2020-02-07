"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shallowEqual = exports.isNative = exports.isArray = exports.isObject = exports.isString = exports.isFunction = exports.isType = void 0;

/**
 * 检测类型方法
 * @param {String} type
 */
var isType = function isType(type) {
  return function (obj) {
    return {}.toString.call(obj) === "[object ".concat(type, "]");
  };
};
/**
 * @fucntion 检测对象是否是函数
 * @param {Object} obj
 */


exports.isType = isType;

var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};
/**
 * @fucntion 检测对象是否是字符串
 * @param {Object} obj
 */


exports.isFunction = isFunction;
var isString = isType('String');
/**
 * @fucntion 检测对象是否是对象字面量
 * @param {Object} obj
 */

exports.isString = isString;

var isObject = function isObject(obj) {
  return obj && isType('Object')(obj);
};
/**
 * @fucntion 检测对象是否是数组
 * @param {Object} obj
 */


exports.isObject = isObject;
var isArray = Array.isArray || isType('Array');
/**
 * @fucntion 检测对象是否浏览器原生支持
 * @param {Object} obj
 */

exports.isArray = isArray;

var isNative = function isNative(obj) {
  return typeof obj !== 'undefined' && /native code/i.test(obj.toString());
};
/**
 * @function 浅比较2组对象是否相等
 * @param {Object} objA
 * @param {Object} objB
 */


exports.isNative = isNative;

var shallowEqual = function shallowEqual(objA, objB) {
  // 检测2个对象是否相等
  if (Object.is(objA, objB)) return true; // 检测比较对象是否是对象

  if (!isObject(objA) || !isObject(objB)) {
    return false;
  } // 获取比较对象的属性集合


  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB); // 检测比较对象属性数量是否一致

  if (keysA.length !== keysB.length) return false; // 遍历检测比较对象属性值是否相同

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
};

exports.shallowEqual = shallowEqual;
