import { combineReducers } from 'redux';
import store from './store';

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
  replaceReducer();
};
