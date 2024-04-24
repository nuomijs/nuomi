import { Context } from './props';
import { ConnectGetState } from './connect';
import { NuomiStoreDispatch } from './store';
import { Location } from './router';

export function useConnect<S = any, G = any>(getState?: ConnectGetState<S, G>): [S & G, NuomiStoreDispatch];

export function useNuomi<S = any, G = any>(): Context<S, G>;

export function useLocation(): Location;
