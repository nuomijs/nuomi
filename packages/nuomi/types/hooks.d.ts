import { Props } from './props';
import { ConnectGetState, NuomiState } from './connect';
import { NuomiStoreDispatch } from './store';

export function useConnect(getState?: ConnectGetState): [NuomiState, NuomiStoreDispatch];

export function useNuomi(): { nuomiProps: Props };
