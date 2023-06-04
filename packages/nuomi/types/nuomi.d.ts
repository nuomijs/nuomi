import { Props } from './props';

export type DefineNuomi = <S = any>(props: Props<S>) => Props<S>;

export interface NuomiAPI {
  config(opts: Props): any;
  getDefaultProps(): any;
  extend(...props: Props[]): Props;
}

export const defineNuomi: DefineNuomi;

export const nuomi: NuomiAPI;


