export default {
  state: {
    loading: {},
  },
  reducers: {
    '@replaceState': (state, payload) => payload,
    '@updateState': (state, payload) => ({ ...state, ...payload }),
    '@updateLoading': (state, payload) => ({
      ...state,
      loading: { ...state.loading, ...payload },
    }),
  },
  effects: {},
};
