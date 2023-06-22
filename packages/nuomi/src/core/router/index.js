import warning from 'warning';
import { isFunction, isObject, isString } from '../../utils';
import parserPath, { pathToRegexp, normalizePath } from '../../utils/parser';
import globalWindow from '../../utils/globalWindow';

let globalLocation = globalWindow.location;
const globalHistory = globalWindow.history;
// 监听列表
let listeners = [];
// location额外的数据
let extraData = {};
// 是否允许清除额外数据
let clearExtraData = true;
// 是否允许执行路由监听器
let allowCallListener = true;
// path对应的正则集合
let pathRegexpMap = {};
// name对应path集合
let namePathMap = {};
// 是否是hash类型
let isHash = true;
// 默认路由选项
const defaultOptions = {
  // 路由类型 hash or browser
  type: 'hash',
  // 路由路径通用前缀
  basename: '/',
};
// 路由选项
let options = defaultOptions;
// 清理路由数据
let clear = null;
// 当前location
let currentLocation = {};
// 阻塞路由控制
// eslint-disable-next-line import/no-mutable-exports
let blockData = {};
// 阻塞回调
let blockCallback = null;

function getOriginPath() {
  const { pathname, search, hash } = globalLocation;
  let originPath = '';

  if (isHash) {
    originPath = hash.substr(1);
  } else {
    originPath = pathname + search + hash;
  }

  return decodeURI(originPath);
}

function getLocation() {
  const originPath = getOriginPath();
  return Object.assign(parserPath(originPath.replace(new RegExp(`^${options.basename}`), '')), {
    state: extraData.state || {},
  });
}

function getMergeLocation() {
  return Object.assign(getLocation(), extraData);
}

function block(callback) {
  if (!blockCallback) {
    if (isFunction(callback)) {
      blockCallback = (enter, restore, to) => {
        const isEnter = callback(currentLocation, to, enter) !== false;
        if (isEnter) {
          enter(isEnter);
        } else {
          restore(currentLocation.url);
        }
      };
    }
  } else {
    warning(false, 'router.block只能创建一次');
  }
}

function routerListener() {
  if (allowCallListener) {
    if (clearExtraData) {
      extraData = {};
    } else {
      clearExtraData = true;
    }
    // 检测路由是否冻结
    if (isFunction(blockData.callback) || isFunction(blockCallback)) {
      // 记录待跳转的数据
      if (!blockData.to) {
        blockData.to = getMergeLocation();
      }
      const { reload: isReload, ...rest } = blockData.to;
      const callback = blockData.callback || blockCallback;
      callback(
        (isLeave) => {
          blockData = {};
          allowCallListener = true;
          if (isLeave) {
            callListener();
          } else {
            push(rest, isReload);
          }
        },
        (path) => {
          clearExtraData = true;
          extraData = {};
          allowCallListener = false;
          blockData.to = null;
          replace(path);
        },
        blockData.to,
      );
    } else {
      callListener();
    }
  } else {
    allowCallListener = true;
  }
}

function restorePath(object) {
  if (isString(object)) {
    return object;
  }
  let path = '';
  const {
    pathname, name, params, query, search, url, hash,
  } = object;
  let { path: p } = object;
  if (isString(url) && url) {
    path = url;
  } else {
    if (isString(name) && name) {
      p = namePathMap[name];
    }
    if (isString(p) && p && !pathname) {
      path = p;
      if (isObject(params)) {
        Object.keys(params).forEach((key) => {
          path = path.replace(new RegExp(`\\/:${key}`), `/${params[key] || '0'}`);
        });
      }
      path = path.replace(/\*/g, '');
    } else if (isString(pathname) && pathname) {
      path = pathname;
    }
    if (isString(search) && search) {
      if (search.indexOf('?') !== 0) {
        path += `?${search}`;
      } else {
        path += search;
      }
    } else if (isObject(query) && Object.keys(query).length) {
      path += '?';
      const querys = [];
      Object.keys(query).forEach((key) => {
        querys.push(`${key}=${query[key]}`);
      });
      path += querys.join('&');
    }
    if (hash && isString(hash)) {
      if (hash.indexOf('#') === 0) {
        path += hash;
      } else {
        path += `#${hash}`;
      }
    }
  }
  return path;
}

function combinePath(path = '') {
  const url = restorePath(path);
  const searchIndex = url.indexOf('?');
  const hashIndex = url.indexOf('#');
  let pathname = url;
  let rest = '';

  if (searchIndex !== -1) {
    pathname = url.substr(0, searchIndex);
    rest = url.substr(searchIndex);
  } else if (hashIndex !== -1) {
    pathname = url.substr(0, hashIndex);
    rest = url.substr(hashIndex);
  }

  return normalizePath(`${options.basename}/${pathname}`) + rest;
}

function routerHandle(...args) {
  const type = args[0];
  const path = args[1];
  const isReload = args[2];
  if (path) {
    clearExtraData = false;
    extraData = {};

    if (isReload === true) {
      extraData.reload = isReload;
    }

    if (isObject(path) && isObject(path.state)) {
      extraData.state = path.state;
    }

    let url = combinePath(path);
    const originPath = getOriginPath();

    if (url !== originPath) {
      if (isHash && !globalHistory.pushState && !globalHistory.replaceState) {
        if (type === 'push') {
          globalLocation.hash = url;
        } else {
          const { pathname, search } = globalLocation;
          globalLocation.replace(`${pathname + search}#${url}`);
        }
      } else {
        if (isHash) {
          url = `#${url}`;
        }
        globalHistory[type === 'push' ? 'pushState' : 'replaceState']({ url }, null, url);
        routerListener();
      }
    } else if (isReload === true) {
      reload();
    }
  }
}

function location() {
  return getMergeLocation();
}

function push(...args) {
  routerHandle('push', ...args);
}

function replace(...args) {
  routerHandle('replace', ...args);
}

function reload() {
  extraData = {};
  callReloadListener();
}

function back(step) {
  globalHistory.back(step);
}

function forward(step) {
  globalHistory.forward(step);
}

function callListener() {
  // 一次change可能有多个listeners，只创建一次location
  let current = null;
  const [beforeListeners = []] = listeners;
  beforeListeners.forEach((callback) => {
    if (!current) {
      current = getMergeLocation();
    }
    callback(currentLocation, current);
  });
}

function callShowedListener(matchLocation) {
  const [, afterListeners = []] = listeners;
  afterListeners.forEach((callback) => {
    callback(matchLocation);
  });
}

function callReloadListener() {
  const [, , reloadListeners = []] = listeners;
  reloadListeners.forEach((callback) => {
    callback(currentLocation);
  });
}

function removeListener(...args) {
  // 移除所有
  if (!args.length) {
    listeners = [];
  } else {
    const [beforeListeners = [], afterListeners = [], reloadListeners = []] = listeners;
    if (args[0]) {
      listeners[0] = beforeListeners.filter((cb) => cb !== args[0]);
    }
    if (args[1]) {
      listeners[1] = afterListeners.filter((cb) => cb !== args[1]);
    }
    if (args[2]) {
      listeners[2] = reloadListeners.filter((cb) => cb !== args[1]);
    }
  }
}

function listener(beforeCallback, afterCallback) {
  if (isFunction(beforeCallback) || isFunction(afterCallback)) {
    const [beforeListeners = [], afterListeners = []] = listeners;
    if (beforeCallback) {
      beforeListeners.push(beforeCallback);
      listeners[0] = beforeListeners;
      // 执行一次
      beforeCallback(currentLocation, getMergeLocation(), true);
    }
    if (afterCallback) {
      afterListeners.push(afterCallback);
      listeners[1] = afterListeners;
    }
    return () => {
      removeListener(beforeCallback, afterCallback);
    };
  }
  return () => {};
}

function addReloadListener(reloadCallback) {
  if (isFunction(reloadCallback)) {
    const [, , reloadListeners = []] = listeners;
    reloadListeners.push(reloadCallback);
    listeners[2] = reloadListeners;
    return () => {
      removeListener(null, null, reloadCallback);
    };
  }
  return () => {};
}

function createRouter(routerOptions, staticLocation, callback) {
  if (clear) {
    clear();
  }
  if (staticLocation) {
    globalLocation = staticLocation;
  }
  options = { ...options, ...routerOptions };
  isHash = options.type !== 'browser';
  const eventType = isHash ? 'hashchange' : 'popstate';
  listener((from, to) => {
    callback((currentLocation = to));
  });
  globalWindow.addEventListener(eventType, routerListener);
  return (clear = () => {
    globalWindow.removeEventListener(eventType, routerListener);
    removeListener();
    pathRegexpMap = {};
    namePathMap = {};
    options = defaultOptions;
    isHash = true;
    globalLocation = globalWindow.location;
    currentLocation = {};
    blockCallback = null;
    blockData = {};
    clearExtraData = true;
    extraData = {};
  });
}

function namePath(name, path) {
  if (name && path && !namePathMap[name]) {
    const normalPath = normalizePath(path);
    namePathMap[name] = normalPath;
    namePathMap[normalPath] = name;
  }
}

function match(locationData, { path, name }, returns = false) {
  const { pathname } = locationData;
  const normalPath = normalizePath(path);
  let pathRegexp = pathRegexpMap[normalPath];

  if (!pathRegexp) {
    pathRegexp = pathToRegexp(normalPath);
    pathRegexpMap[normalPath] = pathRegexp;
  }

  if (name && !namePathMap[name]) {
    namePathMap[name] = normalPath;
    namePathMap[normalPath] = name;
  }

  const pathnameMatch = pathname.match(pathRegexp);
  const isMatch = !!pathnameMatch;

  if (isMatch && returns) {
    let matchLocation;
    const pathMatch = path.match(/\/:([\w-]+)/g);
    if (pathMatch) {
      const params = {};
      pathMatch.forEach((param, i) => {
        const key = param.replace(/^\/:/, '');
        const value = pathnameMatch[i + 1];
        if (value !== undefined) {
          params[key] = value.replace(/^\//, '');
        }
      });
      matchLocation = {
        ...locationData,
        params,
      };
    } else {
      matchLocation = { ...locationData };
    }
    if (normalPath) {
      matchLocation.path = normalPath;
    }
    if (namePathMap[normalPath]) {
      matchLocation.name = namePathMap[normalPath];
    }
    return matchLocation;
  }

  return isMatch;
}

function matchPath(...args) {
  return match(args[0], { path: args[1] }, true);
}

function mergePath(...args) {
  let paths = args.filter((path) => path && isString(path));
  const maxIndex = paths.length - 1;
  paths = paths.map((path, index) => (index < maxIndex ? path.replace(/\*$/, '') : path));
  return normalizePath(paths.join('/'));
}

export {
  createRouter, blockData, combinePath, match, callShowedListener, addReloadListener, restorePath,
};

export default {
  listener,
  location,
  reload,
  push,
  replace,
  back,
  forward,
  matchPath,
  mergePath,
  normalizePath,
  parserPath,
  namePath,
  block,
};
