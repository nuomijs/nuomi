import { createStore, compose } from 'redux';
import warning from 'warning';
import applyMiddleware from './applyMiddleware';
import { isFunction, isObject } from '../../utils';
import globalWindow from '../../utils/globalWindow';

const rootReducer = () => {};
const stores = {};
const defaultStates = {};
let middlewares = [];
let usedDispatch = false;
const composeEnhancers =
  /* eslint-disable no-underscore-dangle */
  process.env.NODE_ENV !== 'production' && globalWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#trace
      globalWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 20 })
    : compose;

const rootStore = createStore(
  rootReducer,
  // eslint-disable-next-line no-return-assign
  composeEnhancers(applyMiddleware(() => middlewares, () => (usedDispatch = true))),
);

const getStore = (id) => {
  return stores[id];
};

const setStore = (id, store) => {
  if (!stores[id]) {
    stores[id] = store;
  } else if (!store) {
    delete stores[id];
  }
};

rootStore.getStore = getStore;

rootStore.applyMiddleware = (...args) => {
  if (!usedDispatch) {
    middlewares = middlewares.concat(args.filter((middleware) => isFunction(middleware)));
  } else {
    warning(false, 'dispatch已经被使用，不能添加中间件，请确保添加中间件操作发生在dispatch之前');
  }
};

rootStore.createState = (state = {}) => {
  if (isObject(state)) {
    const createdArray = [];
    Object.keys(state).forEach((key) => {
      if (!stores[key]) {
        defaultStates[key] = state[key];
      } else {
        createdArray.push(key);
      }
    });
    if (createdArray.length) {
      warning(false, `${createdArray.join(',')}已经被创建store，不能初始化state`);
    }
  }
};

export { getStore, setStore, defaultStates };

export default rootStore;
