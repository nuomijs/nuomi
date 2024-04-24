export function extend(obj1 = {}, obj2 = {}) {
  const {
    state = {}, reducers = {}, actions = {}, getters = {}, ...rest
  } = obj1;
  const {
    state: s = {}, reducers: r = {}, actions: a = {}, getters: g = {}, ...newRest
  } = obj2;
  return {
    state: {
      ...state,
      ...s,
    },
    reducers: {
      ...reducers,
      ...r,
    },
    actions: {
      ...actions,
      ...a,
    },
    getters: {
      ...getters,
      ...g,
    },
    ...rest,
    ...newRest,
  };
}

export function extendArray(obj = {}, array = []) {
  const { extends: exts, ...rest } = obj;
  if (Array.isArray(exts) && exts.length) {
    obj = extendArray(exts[0], exts.slice(1).concat(rest));
  }
  if (!array.length) {
    return obj;
  }
  return extendArray(extend(obj, extendArray(array[0])), array.slice(1));
}
