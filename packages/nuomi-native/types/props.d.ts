import { NuomiProps, Context } from 'nuomi/types/props';

export interface NuomiNativeProps<S = any, G = any> extends NuomiProps<S, G> {
  onShow?: (context: Context<S, G>) => any;
}

export interface DefineProps<S = any, G = any> extends NuomiNativeProps<S, G> {}
