import { ElementType } from 'react';
import {
  NuomiReducer, NuomiAction, NuomiGetter, NuomiProps,
} from 'nuomi/types/props';
import { NuomiStore } from 'nuomi/types/store';

export interface NuomiNativeProps<S = any, G = any> extends NuomiProps<S, G> {
  onShow?: (props: Props<S, G>) => any;
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
