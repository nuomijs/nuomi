export default {
  state: {
    loadings: {},
  },
  data: {},
  reducers: {
    _replaceState: (state, { payload }) => payload,
    _updateState: (state, { payload }) => ({ ...state, ...payload }),
    _updateLoading: (state, { payload }) => ({
      ...state,
      loadings: { ...state.loadings, ...payload },
    }),
  },
};
