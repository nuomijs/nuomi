import { NuomiReducer, NuomiAction, NuomiGetter } from 'nuomi/types/props';
import { NuomiStore } from 'nuomi/types/store';

export interface NuomiNativeProps<S = any, G = any> {
  id?: string;
  state?: S;
  reducer?: NuomiReducer<S>;
  action?: NuomiAction<S, G>;
  getter?: NuomiGetter<S>;
  extends?: NuomiNativeProps[];
  render?: (props: Props<S, G> & { children: any }) => any;
  onInit?: (props: Props<S, G>) => any;
  onShow?: (props: Props<S, G>) => any;
  [key: string]: any;
}

export interface DefineProps<S = any, G = any> extends NuomiNativeProps<S, G> {
  store?: NuomiStore<S, G>;
  extends?: DefineProps[];
  location?: any;
  parent?: Props;
}

export type Props<S = any, G = any> = {
  store: NuomiStore<S, G>;
  location: any;
  parent?: Props;
}
