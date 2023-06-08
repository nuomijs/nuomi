export const extend = (obj1 = {}, obj2 = {}) => {
  const {
    state = {}, reducers = {}, effects = {}, ...rest
  } = obj1;
  const {
    state: s = {}, reducers: r = {}, effects: e = {}, ...newRest
  } = obj2;
  return {
    state: {
      ...state,
      ...s,
      loading: {
        ...state.loading,
        ...s.loading,
      },
    },
    reducers: {
      ...reducers,
      ...r,
    },
    effects: {
      ...effects,
      ...e,
    },
    ...rest,
    ...newRest,
  };
};

export const extendArray = (obj = {}, array = []) => {
  const { extends: exts, ...rest } = obj;
  if (Array.isArray(exts) && exts.length) {
    obj = extendArray(exts[0], exts.slice(1).concat(rest));
  }
  if (!array.length) {
    return obj;
  }
  return extendArray(extend(obj, extendArray(array[0])), array.slice(1));
};
