import { extend, extendArray } from '../../utils/extend';

const defaultNuomiProps = {
  state: {},
  reducers: {
    '@replace': (state, payload) => ({ ...payload }),
    '@update': (state, payload) => ({ ...state, ...payload }),
  },
};

let nuomiProps = extend({}, defaultNuomiProps);

export default function (props) {
  if (props) {
    nuomiProps = extendArray(nuomiProps, [props]);
  }
  return nuomiProps;
}
