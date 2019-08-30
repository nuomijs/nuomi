import proxyPolyfill from './proxyPolyfill';
import { isNative } from './index';

// 是否原生支持Proxy
const supportProxy = isNative(window.Proxy);

const EffectsProxy = supportProxy ? window.Proxy : proxyPolyfill();

// 获取以类方式创建的effects实例对象
export const getClassEffects = (effects) => {
  // 原生不支持Proxy，需要遍历获取类中的方法属性（包括继承的），存到对象中
  if (!supportProxy) {
    // 所有属性方法都存储到该对象中
    const propertys = {};
    const setPropertys = (key, value) => {
      // 排除constructor和已经存储过的
      if (key !== 'constructor' && !propertys[key]) {
        propertys[key] = value;
      }
    };
    // 遍历的对象
    let object = effects;
    // 只要对象构造函数不是顶层Object，都视为Effects对象
    while (object.constructor !== Object) {
      // 获取实例对象的原型
      const prototype = Object.getPrototypeOf(object);
      // 原型是Object跳出
      if (prototype.constructor === Object) {
        break;
      }
      // 获取对象可枚举的属性集合，通过this定义的属性
      const entries = Object.entries(object);
      // 获取原型链上可枚举和不可枚举的属性
      const propertyNames = Object.getOwnPropertyNames(prototype);
      // 继续遍历查找是否有继承的对象
      object = prototype;
      // 存储所有可枚举的属性
      entries.forEach((data) => {
        const [name, value] = data;
        setPropertys(name, value);
      });
      // 存储原型上全部属性
      propertyNames.forEach((key) => {
        setPropertys(key, prototype[key]);
      });
    }
    // 返回所有的对象属性
    return propertys;
  }
  // 原生支持Proxy直接返回实例
  return effects;
};

export default EffectsProxy;
