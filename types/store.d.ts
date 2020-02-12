import { Store, Middleware } from 'redux';

export interface StoreAPI extends Store {
  applyMiddleware(...middlewares: Middleware[]): void;
  createState(state: object): void;
}

export const store: StoreAPI;

export const INITIALISE_STATE: string;
