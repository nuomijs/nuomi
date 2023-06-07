import { NuomiReducers, NuomiEffects } from 'nuomi/types/props';
import { NuomiStore } from 'nuomi/types/store';

export interface NuomiNativeProps<S = any> {
  id?: string;
  state?: S;
  reducers?: NuomiReducers<S>;
  effects?: NuomiEffects<S>;
  render?: (props: Props<S>) => any;
  onInit?: (props: Props<S>) => any;
  onShow?: (props: Props<S>) => any;
  [key: string]: any;
}

export interface DefineNuomiProps<S = any> extends NuomiNativeProps<S> {
  store?: NuomiStore<S>;
  location?: any;
}

export type Props<S = any> = {
  state: S,
  store: NuomiStore<S>;
  location: any;
  children: any,
}
