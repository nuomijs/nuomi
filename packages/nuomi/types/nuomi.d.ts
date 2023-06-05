import { Props } from './props';

export interface DefaultNuomiProps {
  state: any;
  reducers: any;
  effects: any;
}
export type DefineNuomi = <S = any>(props: Props<S>) => Props<S>;
export type ExtendNuomi = <S = any>(...props: Props<S>[]) => Props<S>;

export const configureNuomi: () => Props;
export const getDefaultNuomi: () => DefaultNuomiProps;
export const extendNuomi: ExtendNuomi;
export const defineNuomi: DefineNuomi;




