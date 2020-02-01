import { Dispatch } from 'redux';
import { NuomiProps } from './props';

interface GetState {
  <State>(): State, 
  <State>(nuomiState: State): State, 
  <State>(nuomiState: State, reduxState: State): State, 
}

export function useConnect<State>(getState?: GetState): [State, Dispatch];

export function useNuomi(): { nuomiProps: NuomiProps };
