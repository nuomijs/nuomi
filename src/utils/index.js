export const isType = (type) => {
  return (obj) => {
    return {}.toString.call(obj) === `[object ${type}]`;
  };
};

export const isFunction = isType('Function');

export const isString = isType('String');

export const isObject = (obj) => obj && isType('Object')(obj);

export const isArray = Array.isArray || isType('Array');

export const isNative = (obj) => typeof obj !== 'undefined' && /native code/i.test(obj.toString());
