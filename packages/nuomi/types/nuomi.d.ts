import { DefineProps } from './props';

export type DefineFunc = <S = any>(props: DefineProps<S>) => DefineProps<S>;
export interface ConfigureFunc {
  (): DefineProps;
  (props: DefineProps): DefineProps;
}

export const configure: ConfigureFunc;
export const define: DefineFunc;




