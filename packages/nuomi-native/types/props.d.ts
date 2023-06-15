import { NuomiProps } from 'nuomi/types/props';
import { NuomiStore } from 'nuomi/types/store';

export interface NuomiNativeProps<S = any, G = any> extends NuomiProps<S, G> {
  onShow?: (context: Context<S, G>) => any;
}

export interface DefineProps<S = any, G = any> extends NuomiNativeProps<S, G> {
  store?: NuomiStore<S, G>;
  extends?: DefineProps[];
  location?: any;
  parent?: Context;
}

export type Context<S = any, G = any> = {
  store: NuomiStore<S, G>;
  location: any;
  parent?: Context;
}
