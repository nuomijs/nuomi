export default (object = {}, newObject = {}) => {
  const {
    state = {}, reducers = {}, effects = {}, ...rest
  } = object;
  const {
    state: s = {}, reducers: r = {}, effects: e = {}, ...newRest
  } = newObject;
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
