import ProxyPolyfill from 'proxy-polyfill/src/proxy';
import { isNative } from './index';

const supportProxy = isNative(window.Proxy);

const EffectsProxy = supportProxy ? window.Proxy : ProxyPolyfill;

const getEffects = (effects) => {
  if (!supportProxy) {
    const propertys = {};
    const setPropertys = (key, value) => {
      if (key !== 'constructor' && !propertys[key]) {
        propertys[key] = value;
      }
    };
    let object = effects;
    while (object.constructor !== Object) {
      const prototype = Object.getPrototypeOf(object);
      const entries = Object.entries(object);
      const propertyNames = Object.getOwnPropertyNames(prototype);
      if (prototype.constructor === Object) {
        break;
      }
      object = prototype;
      entries.forEach((data) => {
        const [name, value] = data;
        setPropertys(name, value);
      });
      propertyNames.forEach((key) => {
        setPropertys(key, prototype[key]);
      });
    }
    return propertys;
  }
  return effects;
};

export default (effects, handler) => {
  return new EffectsProxy(effects.constructor === Object ? effects : getEffects(effects), handler);
};
