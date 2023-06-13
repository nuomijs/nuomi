import { extend, extendArray } from '../../utils/extend';

const defaultNuomiProps = {
  state: {
    loading: {},
  },
  reducer: {
    '@replace': (state, payload) => ({ ...payload }),
    '@update': (state, payload) => ({ ...state, ...payload }),
    '@loading': (state, payload) => ({
      ...state,
      loading: { ...state.loading, ...payload },
    }),
  },
};

let nuomiProps = extend({}, defaultNuomiProps);

export default function (props) {
  if (props) {
    nuomiProps = extendArray(nuomiProps, [props]);
  }
  return nuomiProps;
}
