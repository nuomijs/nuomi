import { NuomiProps } from './props';

interface Nuomi {
  config: (opts: NuomiProps) => void,
  getDefaultProps: () => Object,
  extend: (props: NuomiProps, ...args: NuomiProps) => Object,
}

declare const nuomi: Nuomi;

export { nuomi };