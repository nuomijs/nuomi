import { isFunction, isObject } from '../../utils';
import parser from '../../utils/parser';

// 监听列表
let listeners = [];
// location额外的数据
let extraData = {};
// 是否创建过路由
let created = false;
// 是否允许执行路由监听器
let allowExecListener = true;
// path对应的正则集合
let pathRegexps = {};
// 是否是hash类型
let isHash = true;
// 默认路由选项
const defaultOptions = {
  // 路由类型 hash or browser
  type: 'hash',
  // 路由路径通用前缀
  basePath: '/',
};
let options = defaultOptions;

function back() {
  window.history.back();
}

function forward() {
  window.history.forward();
}

function getOriginPath() {
  const { pathname, search, hash } = window.location;
  if (isHash) {
    return hash.substr(1);
  }
  return pathname + search + hash;
}

function getLocation() {
  return parser(getOriginPath());
}

function getMergeLocation() {
  const mergeLocation = { ...getLocation(), ...extraData };
  // 临时数据，仅用一次
  extraData = {};
  return mergeLocation;
}

function routerEventListener() {
  if (allowExecListener) {
    // 一次change可能有多个listeners，只创建一次location
    let currentLocation = null;
    listeners.forEach((callback) => {
      if (!currentLocation) {
        currentLocation = getMergeLocation();
      }
      callback(currentLocation);
    });
  } else {
    allowExecListener = true;
  }
}

function combinePath(path = '') {
  const { basePath } = options;
  return parser.replacePath(`${basePath}/${path.replace(`^${basePath}`, '')}`);
}

function location(...args) {
  if (!args.length) {
    return getLocation();
  }
  let path = args[0];
  const data = args[1];
  let isReload = args[2];
  let force = args[3];
  if (path && (typeof path === 'string' || isObject(path))) {
    if (isObject(path)) {
      path = parser.restore(path);
    }
  } else {
    path = null;
  }
  if (path) {
    if (typeof data === 'boolean') {
      isReload = data;
    }
    if (typeof isReload === 'boolean') {
      force = isReload === true ? isReload : force;
      extraData.reload = isReload;
    }
    if (force === undefined) {
      force = true;
    }
    if (isObject(data) || isFunction(data)) {
      extraData.data = data;
    }

    const url = combinePath(path);
    const originPath = getOriginPath();
    if (url !== originPath) {
      if (isHash) {
        window.location.hash = url;
      } else {
        window.history.pushState({ a: 1 }, null, url);
        routerEventListener();
      }
      // hash相同时强制执行回调
    } else if (force === true) {
      routerEventListener();
    }
  }
}

function normalLocation(url) {
  allowExecListener = false;
  location(url);
}

function reload() {
  const { url } = getLocation();
  location(url, true);
}

function replace() {
  //
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
    callback(getLocation());
    return () => {
      removeListener(callback);
    };
  }
  return () => {};
}

function createRouter(routerOptions, callback) {
  if (!created) {
    created = true;
    options = { ...options, ...routerOptions };
    isHash = options.type !== 'browser';
    const eventType = isHash ? 'hashchange' : 'popstate';
    listener(callback);
    window.addEventListener(eventType, routerEventListener);
    return () => {
      created = false;
      window.removeEventListener(eventType, routerEventListener);
      removeListener();
      pathRegexps = {};
      options = defaultOptions;
      isHash = true;
    };
  }
  return null;
}

function matchPathname({ pathname }) {
  Object.keys(pathRegexps).forEach((i) => {
    if (pathRegexps[i].test(pathname)) {
      return true;
    }
  });
  return false;
}

function matchPath(currentLocation, path) {
  const normalPath = parser.normalize(path);
  const pathRegexp = pathRegexps[normalPath];
  if (pathRegexp) {
    return pathRegexp.test(currentLocation.pathname);
  }
  return false;
}

function savePath(path) {
  const normalPath = parser.normalize(path);
  if (!pathRegexps[normalPath]) {
    pathRegexps[normalPath] = parser.toRegexp(normalPath);
    return true;
  }
  return false;
}

function removePath(path) {
  delete pathRegexps[parser.normalize(path)];
}

function getParamsLocation(locationData, path) {
  const { pathname, ...rest } = locationData;
  const normalPath = parser.normalize(path);
  const pathRegexp = pathRegexps[normalPath];
  if (pathRegexp) {
    const pathnameMatch = pathname.match(pathRegexp);
    const pathMatch = path.match(/\/:([^/]+)/g);
    const params = {};
    const paramsPathArray = [];
    let paramsPath = '';
    let newPathname = pathname;
    if (pathnameMatch && pathMatch) {
      pathMatch.forEach((param, i) => {
        const name = param.replace(/^\/:/, '');
        const value = pathnameMatch[i + 1];
        paramsPathArray.push(value);
        if (value !== undefined) {
          params[name] = value.replace(/^\//, '');
        }
      });
      // pathname排除params部分
      if (paramsPathArray.length > 0) {
        paramsPath = paramsPathArray.join('');
        const lastIndex = pathname.lastIndexOf(paramsPath);
        if (lastIndex !== -1) {
          newPathname = pathname.substr(0, lastIndex);
        }
      }
    }
    return {
      ...rest,
      pathname: newPathname,
      params,
    };
  }
  return locationData;
}

export {
  getLocation,
  normalLocation,
  location,
  listener,
  createRouter,
  reload,
  matchPath,
  matchPathname,
  savePath,
  removePath,
  getParamsLocation,
  combinePath,
};

export default {
  listener,
  location,
  matchPath,
  reload,
  replace,
  back,
  forward,
};
