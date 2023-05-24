import proxyPolyfill from './proxyPolyfill';
import { isNative } from './index';
import globalWindow from './globalWindow';

const ProxyObject = globalWindow.Proxy;

// 是否原生支持Proxy
const supportProxy = isNative(ProxyObject);

const Proxy = supportProxy ? ProxyObject : proxyPolyfill();

export default Proxy;
