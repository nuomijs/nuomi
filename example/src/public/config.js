import { nuomi, store, router } from 'nuomi';
import immutable from 'redux-immutable-state-invariant';

if (process.env.NODE_ENV !== 'production') {
  store.applyMiddleware(immutable());
}

// router.block((from, to, enter) => {
//   enter();
// });

nuomi.config({
  // wrapper: true,
  effects: {
    updateState(payload) {
      this.dispatch({
        type: '_updateState',
        payload,
      });
    },
  },
});
