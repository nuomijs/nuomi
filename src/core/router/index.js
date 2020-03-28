import warning from 'warning';
import { isFunction, isObject, isString } from '../../utils';
import parser, { pathToRegexp, normalizePath, restorePath } from '../../utils/parser';
import globalWindow from '../../utils/globalWindow';

let globalLocation = globalWindow.location;
const globalHistory = globalWindow.history;
// 监听列表
let listeners = [];
// location额外的数据
let extraData = {};
// 是否创建过路由
let created = false;
// 是否允许执行路由监听器
let allowCallListener = true;
// path对应的正则集合
let pathRegexps = {};
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
let currentLocation = null;
// 阻塞路由控制
// eslint-disable-next-line import/no-mutable-exports
let blockData = {};
// 阻塞回调
let blockCallback = null;

function getOriginPath() {
  const { pathname, search, hash } = globalLocation;
  if (isHash) {
    return hash.substr(1);
  }
  return pathname + search + hash;
}

function getLocation() {
  const originPath = getOriginPath();
  return parser(originPath.replace(new RegExp(`^${options.basename}`), ''));
}

function getMergeLocation() {
  const mergeLocation = { ...getLocation(), ...extraData };
  // 临时数据，仅用一次
  extraData = {};
  return mergeLocation;
}

function block(callback) {
  if (!blockCallback) {
    if (isFunction(callback)) {
      blockCallback = (enter, restore, toLocation) => {
        const isEnter = callback(currentLocation, toLocation, enter) !== false;
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

function callListener() {
  // 一次change可能有多个listeners，只创建一次location
  let current = null;
  listeners.forEach((callback) => {
    if (!current) {
      current = getMergeLocation();
    }
    callback(current);
  });
}

function routerEventListener() {
  if (allowCallListener) {
    // 检测路由是否冻结
    if (isFunction(blockData.callback) || isFunction(blockCallback)) {
      // 记录待跳转的数据
      if (!blockData.toLocation) {
        blockData.toLocation = getMergeLocation();
      }
      const { url, reload: isReload, data } = blockData.toLocation;
      const callback = blockData.callback || blockCallback;
      callback((isLeave) => {
        blockData = {};
        allowCallListener = true;
        if (isLeave) {
          callListener();
        } else {
          // eslint-disable-next-line no-use-before-define
          location(url, data, isReload);
        }
      }, (path) => {
        allowCallListener = false;
        blockData.toLocation = null;
        // eslint-disable-next-line no-use-before-define
        replace(path);
      }, blockData.toLocation);
    } else {
      callListener();
    }
  } else {
    allowCallListener = true;
  }
}

function combinePath(path = '') {
  return normalizePath(`${options.basename}/${restorePath(path)}`);
}

function locationHandle(...args) {
  const type = args[0];
  const path = args[1];
  const data = args[2];
  let isReload = args[3];
  if (path) {
    if (typeof data === 'boolean') {
      isReload = data;
    }
    if (typeof isReload === 'boolean') {
      extraData.reload = isReload;
    }
    if (isObject(data) || isFunction(data)) {
      extraData.data = data;
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
        routerEventListener();
      }
    } else if (isReload === true) {
      routerEventListener();
    }
  }
}

function location(...args) {
  if (!args.length) {
    return getLocation();
  }
  locationHandle('push', ...args);
}

function replace(...args) {
  locationHandle('replace', ...args);
}

function reload() {
  const { url } = getLocation();
  replace(url, true);
}

function back(step) {
  globalHistory.back(step);
}

function forward(step) {
  globalHistory.forward(step);
}

function removeListener(...args) {
  // 移除所有
  if (!args.length) {
    listeners = [];
  } else {
    listeners = listeners.filter((cb) => cb !== args[0]);
  }
}

function listener(callback) {
  if (isFunction(callback)) {
    listeners.push(callback);
    // 执行一次
    callback(getLocation(), true);
    return () => {
      removeListener(callback);
    };
  }
  return () => {};
}

function createRouter(routerOptions, staticLocation, callback) {
  if (staticLocation) {
    if (isFunction(clear)) {
      clear();
    }
    globalLocation = staticLocation;
  }
  if (!created) {
    created = true;
    options = { ...options, ...routerOptions };
    isHash = options.type !== 'browser';
    const eventType = isHash ? 'hashchange' : 'popstate';
    listener((locationData) => {
      callback(currentLocation = locationData);
    });
    globalWindow.addEventListener(eventType, routerEventListener);
    return clear = () => {
      created = false;
      globalWindow.removeEventListener(eventType, routerEventListener);
      removeListener();
      pathRegexps = {};
      options = defaultOptions;
      isHash = true;
      globalLocation = globalWindow.location;
      clear = null;
      currentLocation = null;
      blockCallback = null;
      blockData = {};
    };
  }
}

function match(locationData, path, returnLocation) {
  const { pathname } = locationData;
  const normalPath = normalizePath(path);
  let pathRegexp = pathRegexps[normalPath];

  if (!pathRegexp) {
    pathRegexp = pathToRegexp(normalPath);
    pathRegexps[normalPath] = pathRegexp;
  }

  const pathnameMatch = pathname.match(pathRegexp);
  const isMatch = !!pathnameMatch;

  if (isMatch && returnLocation) {
    const pathMatch = path.match(/\/:(\w+)/g);
    if (pathMatch) {
      const params = {};
      pathMatch.forEach((param, i) => {
        const name = param.replace(/^\/:/, '');
        const value = pathnameMatch[i + 1];
        if (value !== undefined) {
          params[name] = value.replace(/^\//, '');
        }
      });
      return {
        ...locationData,
        params,
      };
    }
    return locationData;
  }

  return isMatch;
}

function matchPath(...args) {
  return match(args[0], args[1], true);
}

function mergePath(...args) {
  let paths = args.filter((path) => path && isString(path));
  const maxIndex = paths.length - 1;
  paths = paths.map((path, index) => (index < maxIndex ? path.replace(/\*$/, '') : path));
  return normalizePath(paths.join('/'));
}

export {
  getLocation,
  createRouter,
  blockData,
  combinePath,
  match,
};

export default {
  listener,
  location,
  reload,
  replace,
  back,
  forward,
  matchPath,
  mergePath,
  block,
};
