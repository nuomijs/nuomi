import { Props } from './props';
import { ConnectGetState } from './connect';
import { NuomiStoreDispatch } from './store';

export function useConnect<S = any>(getState?: ConnectGetState): [S, NuomiStoreDispatch];

export function useNuomi<S = any>(): { nuomiProps: Props<S> };
