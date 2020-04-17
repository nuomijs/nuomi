import { Location } from './router';
import { NuomiStore, NuomiStoreDispatch, DispatchAction } from './store';

export interface NuomiReducers {
  [reducer: string]: (state: object, action: DispatchAction) => any;
}

export interface Effects {
  [effect: string]: any;
  dispatch?: NuomiStoreDispatch;
  getState?(): object;
  getNuomiProps?(): NuomiProps;
}

export type FunctionEffects = () => Effects;

export type NuomiEffects = Effects | FunctionEffects;

export interface Props {
  id?: string;
  state?: object;
  data?: object;
  reducers?: NuomiReducers;
  effects?: NuomiEffects;
  store?: NuomiStore;
  async?: (loadProps: (props: NuomiProps) => void) => void;
  render?: () => any;
  onInit?: () => any;
  [key: string]: any;
}

export interface RouteProps extends Props {
  path?: string;
  cache?: boolean | 'state';
  reload?: boolean | null;
  location?: Location;
  onEnter?: (enter: () => void) => boolean;
  onChange?: object | Function;
  onLeave?: (leave: () => void, to: Location) => boolean;
}

export interface NuomiRouteProps extends Props {
  pathPrefix?: string | RegExp;
  path?: string;
}

export interface NuomiProps extends RouteProps, NuomiRouteProps {}
