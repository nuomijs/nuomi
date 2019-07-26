import { combineReducers } from 'redux';
import store, { setStore } from './store';

const reducers = {};

const replaceReducer = () => {
  store.replaceReducer(combineReducers(reducers));
};

export const createReducer = (key, reducer) => {
  reducers[key] = reducer;
  replaceReducer();
};

export const removeReducer = (key) => {
  delete reducers[key];
  setStore(key, null);
  replaceReducer();
};
