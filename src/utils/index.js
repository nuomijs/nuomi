/**
 * 检测类型方法
 * @param {String} type
 */
export const isType = (type) => {
  return (obj) => {
    return {}.toString.call(obj) === `[object ${type}]`;
  };
};

/**
 * @fucntion 检测对象是否是函数
 * @param {Object} obj
 */
export const isFunction = (obj) => typeof obj === 'function';

/**
 * @fucntion 检测对象是否是字符串
 * @param {Object} obj
 */
export const isString = isType('String');

/**
 * @fucntion 检测对象是否是对象字面量
 * @param {Object} obj
 */
export const isObject = (obj) => obj && isType('Object')(obj);

/**
 * @fucntion 检测对象是否是数组
 * @param {Object} obj
 */
export const isArray = Array.isArray || isType('Array');

/**
 * @fucntion 检测对象是否浏览器原生支持
 * @param {Object} obj
 */
export const isNative = (obj) => typeof obj !== 'undefined' && /native code/i.test(obj.toString());

/**
 * @function 浅比较2组对象是否相等
 * @param {Object} objA
 * @param {Object} objB
 */
export const shallowEqual = (objA, objB) => {
  // 检测2个对象是否相等
  if (Object.is(objA, objB)) return true;

  // 检测比较对象是否是对象
  if (!isObject(objA) || !isObject(objB)) {
    return false;
  }

  // 获取比较对象的属性集合
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 检测比较对象属性数量是否一致
  if (keysA.length !== keysB.length) return false;

  // 遍历检测比较对象属性值是否相同
  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !Object.is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
};
