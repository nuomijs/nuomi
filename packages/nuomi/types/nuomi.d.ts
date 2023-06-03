import { Props } from './props';

type State = {
  [key: string]: any;
};

export interface DefineNuomi {
  (props: Props): Props;
}
export interface NuomiAPI {
  config(opts: Props): void;
  getDefaultProps(): object;
  extend(...props: Props[]): Props;
}

export const defineNuomi: DefineNuomi;

export const nuomi: NuomiAPI;


