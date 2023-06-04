export default {
  state: {
    loading: {},
  },
  reducers: {
    '@replace': (state, payload) => payload,
    '@update': (state, payload) => ({ ...state, ...payload }),
    '@loading': (state, payload) => ({
      ...state,
      loading: { ...state.loading, ...payload },
    }),
  },
  effects: {},
};
