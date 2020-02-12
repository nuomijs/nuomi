import { nuomi, store } from 'nuomi';
import immutable from 'redux-immutable-state-invariant';

if (process.env.NODE_ENV !== 'production') {
  store.applyMiddleware(immutable());
}

nuomi.config({
  wrapper: true,
  effects: {
    updateState(payload) {
      this.dispatch({
        type: '_updateState',
        payload,
      });
    },
  },
});
