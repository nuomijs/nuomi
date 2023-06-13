import { combineReducers } from 'redux';
import globalStore, { setStore, getStore } from './store';
import { noop as rootReducer } from '../../utils';
import globalWindow from '../../utils/globalWindow';

const reducers = {};

function replaceReducer() {
  if (Object.keys(reducers).length) {
    globalStore.replaceReducer(combineReducers(reducers));
  } else {
    globalStore.replaceReducer(rootReducer);
  }
}

export function createReducer(key, reducer) {
  if (key && reducer) {
    reducers[key] = reducer;
    replaceReducer();
  }
}

export function removeReducer(key) {
  if (reducers[key]) {
    // 解决REDUX_DEVTOOLS缓存状态问题
    if (process.env.NODE_ENV !== 'production' && globalWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      const store = getStore(key);
      if (store) {
        store.restoreState();
      }
    }
    delete reducers[key];
    setStore(key, null);
    replaceReducer();
  }
}
