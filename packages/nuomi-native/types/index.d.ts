declare module 'nuomi-native';

import { PureComponent } from 'react';
import {
  NuomiReducers,
  Effects,
  FunctionEffects,
  NuomiEffects,
  Props as NuomiProps
} from 'nuomi/types/props';
import {
  DispatchAction,
  NuomiStoreDispatch,
  NuomiStore,
  StoreAPI,
  store
} from 'nuomi/types/store';
import { withNuomi, connect } from 'nuomi/types/component';

export * from 'nuomi/types/nuomi';
export * from 'nuomi/types/hooks';
export {
  NuomiReducers,
  Effects,
  FunctionEffects,
  NuomiEffects,
  NuomiProps,
  DispatchAction,
  NuomiStoreDispatch,
  NuomiStore,
  StoreAPI,
  store,
  withNuomi,
  connect
}

export interface NuomiNativeProps<S = any> {
  id?: string;
  state?: object;
  reducers?: NuomiReducers<S>;
  effects?: NuomiEffects<S>;
  render?: (props: Props<S>) => any;
  onInit?: (props: Props<S>) => any;
  onShow?: (props: Props<S>) => any;
  [key: string]: any;
}

export type Props<S = any> = NuomiProps<S> & {
  store?: NuomiStore<S>;
}

export class NuomiNative<P extends NuomiNativeProps> extends PureComponent<P, any> {}
