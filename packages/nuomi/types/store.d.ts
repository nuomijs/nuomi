import { Store, Middleware } from 'redux';

export interface DispatchAction {
  type: string;
  payload?: any;
}

export type NuomiStoreDispatch = (action: DispatchAction) => Promise<any>;

export interface NuomiStore {
  id: string;
  dispatch: NuomiStoreDispatch;
  getState(): {
    [key: string]: any;
  };
}

export interface StoreAPI extends Store {
  applyMiddleware(...middlewares: Middleware[]): void;
  createState(state: object): void;
  getStore<S>(id: string): NuomiStore;
}

export const store: StoreAPI;

export const INITIALISE_STATE: string;
