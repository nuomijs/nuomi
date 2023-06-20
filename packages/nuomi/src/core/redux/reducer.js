import { combineReducers } from 'redux';
import globalStore, { setStore } from './store';
import { noop as rootReducer } from '../../utils';

const reducers = {};

function replaceReducer() {
  const keys = Object.keys(reducers);
  if (keys.length) {
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
    delete reducers[key];
    setStore(key, null);
    replaceReducer();
  }
}
