import { Props } from './props';
import { ConnectGetState } from './connect';
import { NuomiStoreDispatch } from './store';

export function useConnect<S = any, G = any>(getState?: ConnectGetState<S, G>): [S & { getter: G }, NuomiStoreDispatch];

export function useNuomi<S = any, G = any>(): [Props<S, G>];
