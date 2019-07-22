import { createStore } from 'redux';

const rootReducer = () => {};
const store =
  process.env.NODE_ENV === 'production'
    ? createStore(rootReducer)
    : createStore(
        rootReducer,
        /* eslint-disable no-underscore-dangle */
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      );

export default store;
