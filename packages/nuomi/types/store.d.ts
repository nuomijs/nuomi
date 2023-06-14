import { Store, Middleware } from 'redux';

export type State = {
  [key: string]: any;
};

export type Loading = {
  [key: string]: boolean | string;
}

export type NuomiStoreDispatch = (type: string, payload?: any) => Promise<any>;

export type NuomiStoreCommit<S = any> = (type: string, payload?: any) => S;

export interface NuomiStore<S = any, G = any> {
  id: string;
  dispatch: NuomiStoreDispatch;
  getState(): S;
  commit(type: string, payload: any): S;
  commit(payload: any): S;
  restoreState(): S;
  state: S;
  getter: G;
}

export interface StoreAPI extends Store {
  applyMiddleware(...middlewares: Middleware[]): void;
  createState(state: State): void;
  getStore<S = any, G = any>(id: string): NuomiStore<S, G>;
}

export const globalStore: StoreAPI;

export const INITIALISE_STATE: string;
