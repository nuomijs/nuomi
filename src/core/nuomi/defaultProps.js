export default {
  state: {
    loadings: {},
  },
  data: {},
  reducers: {
    replaceState: (state, { payload }) => payload,
    updateState: (state, { payload }) => ({ ...state, ...payload }),
    updateLoading: (state, { payload }) => ({
      ...state,
      loadings: { ...state.loadings, ...payload },
    }),
  },
};
