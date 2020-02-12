import { isObject, isFunction } from '../../utils';

export default (...args) => {
  const [object, newObject] = args;
  let currentObject = { ...object };
  if (isObject(newObject)) {
    const keys = Object.keys(newObject);
    const { state, data, reducers, effects, onChange, ...rest } = newObject;
    currentObject = { ...currentObject, ...rest };
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
    if (keys.includes('effects')) {
      if (isObject(effects)) {
        currentObject.effects = { ...currentObject.effects, ...effects };
      } else {
        currentObject.effects = effects;
      }
    }
    if (keys.includes('onChange')) {
      if (isObject(onChange)) {
        currentObject.onChange = { ...currentObject.onChange, ...onChange };
      } else if (isFunction(onChange)) {
        currentObject.onChange = { ...currentObject.onChange, _onChange: onChange };
      } else {
        currentObject.onChange = onChange;
      }
    }
  }
  return currentObject;
};
