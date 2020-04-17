// https://github.com/GoogleChrome/proxy-polyfill
module.exports = function proxyPolyfill() {
  let lastRevokeFn = null;
  let ProxyPolyfill;

  function isObject(o) {
    return o ? typeof o === 'object' || typeof o === 'function' : false;
  }

  ProxyPolyfill = function(target, handler) {
    if (!isObject(target) || !isObject(handler)) {
      throw new TypeError('Cannot create proxy with a non-object as target or handler');
    }

    let throwRevoked = function() {};
    lastRevokeFn = function() {
      target = null;
      throwRevoked = function(trap) {
        throw new TypeError(`Cannot perform '${trap}' on a proxy that has been revoked`);
      };
    };

    setTimeout(() => {
      lastRevokeFn = null;
    }, 0);

    const unsafeHandler = handler;
    handler = {
      get: null,
      set: null,
      apply: null,
      construct: null,
    };
    for (const k in unsafeHandler) {
      if (!(k in handler)) {
        throw new TypeError(`Proxy polyfill does not support trap '${k}'`);
      }
      handler[k] = unsafeHandler[k];
    }

    if (typeof unsafeHandler === 'function') {
      handler.apply = unsafeHandler.apply.bind(unsafeHandler);
    }

    let proxy = this;
    let isMethod = false;
    let isArray = false;

    if (typeof target === 'function') {
      proxy = function ProxyPolyfill() {
        const usingNew = this && this.constructor === proxy;
        const args = Array.prototype.slice.call(arguments);
        throwRevoked(usingNew ? 'construct' : 'apply');

        if (usingNew && handler.construct) {
          return handler.construct.call(this, target, args);
        }
        if (!usingNew && handler.apply) {
          return handler.apply(target, this, args);
        }

        if (usingNew) {
          args.unshift(target);
          const f = target.bind.apply(target, args);
          return new f();
        }
        return target.apply(this, args);
      };
      isMethod = true;
    } else if (target instanceof Array) {
      proxy = [];
      isArray = true;
    }

    const getter = handler.get
      ? function(prop) {
          throwRevoked('get');
          return handler.get(this, prop, proxy);
        }
      : function(prop) {
          throwRevoked('get');
          return this[prop];
        };
    const setter = handler.set
      ? function(prop, value) {
          throwRevoked('set');
          handler.set(this, prop, value, proxy);
        }
      : function(prop, value) {
          throwRevoked('set');
          this[prop] = value;
        };

    const propertyNames = Object.getOwnPropertyNames(target);
    const propertyMap = {};
    propertyNames.forEach((prop) => {
      if ((isMethod || isArray) && prop in proxy) {
        return;
      }
      const real = Object.getOwnPropertyDescriptor(target, prop);
      const desc = {
        enumerable: !!real.enumerable,
        get: getter.bind(target, prop),
        set: setter.bind(target, prop),
      };
      Object.defineProperty(proxy, prop, desc);
      propertyMap[prop] = true;
    });

    let prototypeOk = true;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(proxy, Object.getPrototypeOf(target));
    } else if (proxy.__proto__) {
      proxy.__proto__ = target.__proto__;
    } else {
      prototypeOk = false;
    }
    if (handler.get || !prototypeOk) {
      for (const k in target) {
        if (propertyMap[k]) {
          continue;
        }
        Object.defineProperty(proxy, k, { get: getter.bind(target, k) });
      }
    }

    Object.seal(target);
    Object.seal(proxy);

    return proxy;
  };

  ProxyPolyfill.revocable = function(target, handler) {
    const p = new ProxyPolyfill(target, handler);
    return { proxy: p, revoke: lastRevokeFn };
  };

  return ProxyPolyfill;
};
