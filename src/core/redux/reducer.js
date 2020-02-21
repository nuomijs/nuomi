import { combineReducers } from 'redux';
import store, { setStore } from './store';
import { noop as rootReducer } from '../../utils';

const reducers = {};

const replaceReducer = () => {
  if (Object.keys(reducers).length) {
    store.replaceReducer(combineReducers(reducers));
  } else {
    store.replaceReducer(rootReducer);
  }
};

export const createReducer = (key, reducer) => {
  if (key && reducer) {
    reducers[key] = reducer;
    replaceReducer();
  }
};

export const removeReducer = (key) => {
  if (reducers[key]) {
    delete reducers[key];
    setStore(key, null);
    replaceReducer();
  }
};
