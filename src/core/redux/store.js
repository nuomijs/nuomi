import { createStore, compose } from 'redux';
import applyMiddleware from './applyMiddleware';
import { isFunction } from '../../utils';

const rootReducer = () => {};
const stores = {};
let middlewares = [];
const composeEnhancers =
  /* eslint-disable no-underscore-dangle */
  process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#trace
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 20 })
    : compose;

const rootStore = createStore(rootReducer, composeEnhancers(applyMiddleware(() => middlewares)));

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

rootStore.applyMiddleware = (...args) => {
  middlewares = args.filter((middleware) => isFunction(middleware));
};

export default rootStore;
