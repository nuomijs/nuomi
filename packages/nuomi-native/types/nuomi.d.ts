import { DefineNuomiProps } from './props';

export type DefineNuomi = <S = any>(props: DefineNuomiProps<S>) => DefineNuomiProps<S>;
export type ExtendNuomi = <S = any>(...props: DefineNuomiProps<S>[]) => DefineNuomiProps<S>;
export interface ConfigureNuomi {
  (): DefineNuomiProps;
  (props: DefineNuomiProps): DefineNuomiProps;
}

export const configureNuomi: ConfigureNuomi;
export const extendNuomi: ExtendNuomi;
export const defineNuomi: DefineNuomi;




