import { isFunction, isObject } from '../../utils';
import parser from '../../utils/parser';

// 监听列表
let listeners = [];
// hash前缀，紧跟在#后面的符号
let hashPrefix = '';
// location额外的数据
let extraData = {};
// 是否创建过路由
let created = false;
// 是否允许执行路由监听器
let allowExecListener = true;
// path对应的正则集合
const pathRegexps = {};

function back() {
  window.history.back();
}

function forward() {
  window.history.forward();
}

function getHashPrefix() {
  return `#${hashPrefix}`;
}

function getLocation() {
  const hashPath = window.location.hash.substr(getHashPrefix().length);
  return parser(hashPath);
}

function getMergeLocation() {
  const mergeLocation = { ...getLocation(), ...extraData };
  // 临时数据，仅用一次
  extraData = {};
  return mergeLocation;
}

function hashchange() {
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
    const hash = getHashPrefix() + parser.replacePath(path);
    if (hash !== window.location.hash) {
      window.location.hash = hash;
      // hash相同时强制执行回调
    } else if (force === true) {
      hashchange();
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

function createRouter({ hashPrefix: prefix }, callback) {
  if (!created) {
    created = true;
    hashPrefix = prefix;
    listener(callback);
    window.addEventListener('hashchange', hashchange);
    return () => {
      created = false;
      window.removeEventListener('hashchange', hashchange);
      // 移除所有回调
      removeListener();
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
  getHashPrefix,
};

export default {
  listener,
  location,
  matchPath,
  reload,
  back,
  forward,
};
