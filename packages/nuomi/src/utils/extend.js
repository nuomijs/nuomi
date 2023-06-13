export function extend(obj1 = {}, obj2 = {}) {
  const {
    state = {}, reducer = {}, action = {}, ...rest
  } = obj1;
  const {
    state: s = {}, reducer: r = {}, action: a = {}, ...newRest
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
    reducer: {
      ...reducer,
      ...r,
    },
    action: {
      ...action,
      ...a,
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
