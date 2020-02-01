import { Store, Middleware } from 'redux';

export interface StoreAPI extends Store {
  applyMiddleware(...middlewares: Middleware[]): void,
}

export const store: StoreAPI;
