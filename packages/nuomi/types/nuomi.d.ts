import { NuomiProps } from './props';

export interface NuomiAPI {
  config(opts: NuomiProps): void;
  getDefaultProps(): object;
  extend(...props: NuomiProps[]): object;
}

export const nuomi: NuomiAPI;
