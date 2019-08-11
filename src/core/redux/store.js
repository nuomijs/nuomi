import { createStore } from 'redux';

const rootReducer = () => {};
const stores = {};
const rootStore =
  process.env.NODE_ENV === 'production'
    ? createStore(rootReducer)
    : createStore(
        rootReducer,
        /* eslint-disable no-underscore-dangle */
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      );

export const getStore = (id) => {
  return stores[id];
};

export const setStore = (id, store) => {
  if (!stores[id]) {
    stores[id] = store;
  } else if (!store) {
    delete stores[id];
  }
};

rootStore.getStore = getStore;

export default rootStore;
