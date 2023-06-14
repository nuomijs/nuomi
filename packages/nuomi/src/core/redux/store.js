import { createStore, compose } from 'redux';
import warning from 'warning';
import applyMiddleware from './applyMiddleware';
import { isFunction, isObject, noop as rootReducer } from '../../utils';
import globalWindow from '../../utils/globalWindow';

const initialiseState = {};
let stores = {};
let middlewares = [];
let usedDispatch = false;
const composeEnhancers = process.env.NODE_ENV !== 'production' && globalWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? globalWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 20 })
  : compose;

const globalStore = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      () => middlewares,
      () => (usedDispatch = true),
    ),
  ),
);

function getStore(id) {
  return stores[id];
}

function setStore(id, store) {
  if (!stores[id]) {
    stores[id] = store;
  } else if (!store) {
    delete stores[id];
  }
}

function clearStore() {
  stores = {};
  globalStore.replaceReducer(rootReducer);
}

globalStore.getStore = getStore;

globalStore.applyMiddleware = function (...args) {
  if (!usedDispatch) {
    middlewares = middlewares.concat(args.filter((middleware) => isFunction(middleware)));
  } else {
    warning(false, 'dispatch已经被使用，不能添加中间件，请确保添加中间件操作发生在dispatch之前');
  }
};

globalStore.createState = function (state = {}) {
  if (isObject(state)) {
    Object.keys(state).forEach((key) => {
      if (!stores[key]) {
        initialiseState[key] = state[key];
      }
    });
  }
};

export const INITIALISE_STATE = '__NUOMI_INITIALISE_STATE__';

export {
  getStore, setStore, clearStore, initialiseState,
};

export default globalStore;
