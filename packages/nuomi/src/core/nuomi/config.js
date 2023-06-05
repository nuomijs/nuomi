import extend from './extend';

const defaultNuomiProps = {
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

let nuomiProps = extend({}, defaultNuomiProps);

export const configureNuomi = (props) => {
  nuomiProps = extend(nuomiProps, props);
  return nuomiProps;
};

export const getDefaultNuomi = () => defaultNuomiProps;
