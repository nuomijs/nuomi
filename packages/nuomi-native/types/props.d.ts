import { NuomiProps } from 'nuomi/types/props';
import { NuomiStore } from 'nuomi/types/store';

export interface NuomiNativeProps<S = any, G = any> extends NuomiProps<S, G> {
  onShow?: (context: Context<S, G>) => any;
}

export interface DefineProps<S = any, G = any> extends NuomiNativeProps<S, G> {
  extends?: DefineProps[];
  parent?: Context;
}

export type Context<S = any, G = any> = {
  store: NuomiStore<S, G>;
  reload: () => void;
  parent?: Context;
}
