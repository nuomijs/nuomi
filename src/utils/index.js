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

export const extend = (...args) => {
  const [object, newObject] = args;
  const currentObject = { ...object };
  if (isObject(newObject)) {
    const { state, data, reducers, ...rest } = newObject;
    for (const i in rest) {
      if (rest[i] !== undefined) {
        currentObject[i] = rest[i];
      }
    }
    if (isObject(state)) {
      const { loadings, ...restState } = state;
      const states = object.state;
      currentObject.state = {
        ...states,
        ...restState,
        loadings: {
          ...states.loadings,
          ...loadings,
        },
      };
    }
    if (isObject(data)) {
      currentObject.data = { ...object.data, ...data };
    }
    if (isObject(reducers)) {
      currentObject.reducers = { ...object.reducers };
      for (const i in reducers) {
        if (isFunction(reducers[i])) {
          currentObject.reducers[i] = reducers[i];
        }
      }
    }
  }
  return currentObject;
};

export { default as parser } from './parser';
