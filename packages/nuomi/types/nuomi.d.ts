import { Props } from './props';

export interface DefaultNuomiProps {
  state: any;
  reducers: any;
  effects: any;
}
export type DefineNuomi = <S = any>(props: Props<S>) => Props<S>;
export type ExtendNuomi = <S = any>(...props: Props<S>[]) => Props<S>;
export interface ConfigureNuomi {
  (): Props;
  (props: Props): Props;
}

export const configureNuomi: ConfigureNuomi;
export const extendNuomi: ExtendNuomi;
export const defineNuomi: DefineNuomi;




