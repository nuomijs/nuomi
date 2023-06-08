import { NuomiReducers, NuomiEffects } from 'nuomi/types/props';
import { NuomiStore } from 'nuomi/types/store';

export interface NuomiNativeProps<S = any> {
  id?: string;
  state?: S;
  reducers?: NuomiReducers<S>;
  effects?: NuomiEffects<S>;
  extends?: NuomiNativeProps<S>[];
  render?: (props: Props<S> & { children: any }) => any;
  onInit?: (props: Props<S>) => any;
  onShow?: (props: Props<S>) => any;
  [key: string]: any;
}

export interface DefineProps<S = any> extends NuomiNativeProps<S> {
  store?: NuomiStore<S>;
  extends?: DefineProps<S>[];
  location?: any;
  parent?: Props;
}

export type Props<S = any> = {
  store: NuomiStore<S>;
  location: any;
  parent?: Props;
}
