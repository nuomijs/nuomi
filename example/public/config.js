import { nuomi, store } from 'nuomi';
// eslint-disable-next-line import/no-extraneous-dependencies
import immutable from 'redux-immutable-state-invariant';

if (process.env.NODE_ENV !== 'production') {
  store.applyMiddleware(immutable());
}

nuomi.config({
  wrapper: true,
});
