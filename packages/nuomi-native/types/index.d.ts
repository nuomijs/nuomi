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
import { Nuomi, withNuomi, connect } from 'nuomi/types/component';

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
  Nuomi,
  withNuomi,
  connect
}

export interface NuomiNativeProps extends NuomiProps {
  onChange?: object | Function;
}

export class NuomiNative<P extends NuomiNativeProps> extends PureComponent<P, any> {}
