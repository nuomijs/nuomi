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
  let currentObject = { ...object };
  if (isObject(newObject)) {
    const { state, data, reducers, onChange, ...rest } = newObject;
    currentObject = { ...currentObject, ...rest, onChange };
    if (isFunction(onChange)) {
      currentObject.onChange = onChange;
    } else if (isObject(onChange)) {
      currentObject.onChange = { ...currentObject.onChange, ...onChange };
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
      Object.keys(reducers).forEach((key) => {
        if (isFunction(reducers[key])) {
          currentObject.reducers[key] = reducers[key];
        }
      });
    }
  }
  return currentObject;
};

export { default as parser } from './parser';
