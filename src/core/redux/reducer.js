import { combineReducers } from 'redux';
import store from './store';

const reducers = {};

export const createReducer = (key, reducer) => {
  reducers[key] = reducer;
  return combineReducers({
    ...reducers,
  });
};

export const removeReducer = () => {};
