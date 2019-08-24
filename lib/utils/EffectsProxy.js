"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _proxyPolyfill = _interopRequireDefault(require("./proxyPolyfill"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// 是否原生支持Proxy
var supportProxy = (0, _index.isNative)(window.Proxy);
var EffectsProxy = supportProxy ? window.Proxy : (0, _proxyPolyfill.default)(); // 获取以类方式创建的effects实例对象

var getEffects = function getEffects(effects) {
  // 原生不支持Proxy，需要遍历获取类中的方法属性（包括继承的），存到对象中
  if (!supportProxy) {
    var _ret = function () {
      // 所有属性方法都存储到该对象中
      var propertys = {};

      var setPropertys = function setPropertys(key, value) {
        // 排除constructor和已经存储过的
        if (key !== 'constructor' && !propertys[key]) {
          propertys[key] = value;
        }
      }; // 遍历的对象


      var object = effects; // 只要对象构造函数不是顶层Object，都视为Effects对象

      var _loop = function _loop() {
        // 获取实例对象的原型
        var prototype = Object.getPrototypeOf(object); // 原型是Object跳出

        if (prototype.constructor === Object) {
          return "break";
        } // 获取对象可枚举的属性集合，通过this定义的属性


        var entries = Object.entries(object); // 获取原型链上可枚举和不可枚举的属性

        var propertyNames = Object.getOwnPropertyNames(prototype); // 继续遍历查找是否有继承的对象

        object = prototype; // 存储所有可枚举的属性

        entries.forEach(function (data) {
          var _data = _slicedToArray(data, 2),
              name = _data[0],
              value = _data[1];

          setPropertys(name, value);
        }); // 存储原型上全部属性

        propertyNames.forEach(function (key) {
          setPropertys(key, prototype[key]);
        });
      };

      while (object.constructor !== Object) {
        var _ret2 = _loop();

        if (_ret2 === "break") break;
      } // 返回所有的对象属性


      return {
        v: propertys
      };
    }();

    if (_typeof(_ret) === "object") return _ret.v;
  } // 原生支持Proxy直接返回实例


  return effects;
};

var _default = function _default(effects, handler) {
  return new EffectsProxy(effects.constructor === Object ? effects : getEffects(effects), handler);
};

exports.default = _default;