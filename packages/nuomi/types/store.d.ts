import { Store, Middleware } from 'redux';
export interface DispatchAction {
  type: string;
  payload?: any;
}

export type State = {
  [key: string]: any;
};

export type Loading = {
  [key: string]: boolean | string;
}

export type NuomiStoreDispatch = (action: DispatchAction) => Promise<any>;

export type NuomiStoreCommit<S = any> = (type: string, payload?: any) => S;

export interface NuomiStore<S = any> {
  id: string;
  dispatch: NuomiStoreDispatch;
  getState(): S;
  setState(type: string, payload: any): S;
  setState(payload: any): S;
  restoreState(): S;
}

export interface StoreAPI extends Store {
  applyMiddleware(...middlewares: Middleware[]): void;
  createState(state: State): void;
  getStore<S = any>(id: string): NuomiStore<S>;
}

export const store: StoreAPI;

export const INITIALISE_STATE: string;
