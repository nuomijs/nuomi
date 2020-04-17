import { noop } from './index';

export default typeof window !== 'undefined' && typeof window.document !== 'undefined'
  ? window
  : {
    Proxy: global.Proxy,
    addEventListener: noop,
    removeEventListener: noop,
    history: {
      pushState: noop,
      replaceState: noop,
    },
  };
