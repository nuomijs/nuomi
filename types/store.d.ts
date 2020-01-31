import { Store as ReduxStore, Middleware } from 'redux';

export interface Store extends ReduxStore {
  applyMiddleware(...middlewares: Middleware[]): void,
}

export const store: Store;
