import { DefineProps } from './props';

export type DefinePropsFunc = <S = any, G = any>(props: DefineProps<S, G>) => DefineProps<S, G>;
export interface ConfigureFunc {
  (): DefineProps;
  (props: DefineProps): DefineProps;
}

export const configure: ConfigureFunc;
export const defineProps: DefinePropsFunc;




