export default {
  state: {
    loadings: {},
  },
  data: {},
  reducers: {
    updateState: (state, { payload }) => ({ ...state, ...payload }),
    updateLoading: (state, { payload }) => ({
      ...state,
      loadings: { ...state.loadings, ...payload },
    }),
  },
};
