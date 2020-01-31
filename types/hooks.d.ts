import { Dispatch } from 'redux';
import { NuomiProps } from './props';

export function useConnect<State>(getState: (nuomiState: State, reduxState: State) => State): [State, Dispatch];

export function useNuomi(): { nuomiProps: NuomiProps };
