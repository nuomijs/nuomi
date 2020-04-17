import { NuomiStoreDispatch } from './store';

export type NuomiState = {
  [key: string]: any;
};

export interface ConnectGetState {
  (state: NuomiState, globalState: NuomiState): any;
}

export interface ConnectGetDispatch {
  (dispatch: NuomiStoreDispatch): any;
}
