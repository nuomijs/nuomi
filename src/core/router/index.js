import { isFunction, isArray, isObject, parser } from '../../utils';

// 监听列表
let listeners = [];
// hash前缀，紧跟在#后面的符号
let prefix = '';
// location额外的数据
let extraData = {};
// 路由器回调
let createdListener = null;
// path对应的正则集合
const pathRegexps = {};

function back() {
  window.history.back();
}

function forward() {
  window.history.forward();
}

function hashPrefix() {
  return `#${prefix}`;
}

function getLocation() {
  const hashPath = window.location.hash.substr(hashPrefix().length);
  return parser(hashPath);
}

function getMergeLocation() {
  const mergeLocation = { ...getLocation(), ...extraData };
  // 临时数据，仅用一次
  extraData = {};
  return mergeLocation;
}

function hashchange() {
  // 当刷新路由的时候，无需执行用户自己的监听器
  if (createdListener && extraData.reload) {
    createdListener(getMergeLocation());
  } else {
    let currentLocation = null;
    listeners.forEach((callback) => {
      if (callback === createdListener) {
        callback(getMergeLocation());
      } else {
        if (!currentLocation) {
          currentLocation = getLocation();
        }
        callback(currentLocation);
      }
    });
    currentLocation = null;
  }
}

function location(...args) {
  if (!args.length) {
    return getLocation();
  }
  let path = args[0];
  const data = args[1];
  let isReload = args[2];
  if (path && (typeof path === 'string' || typeof path === 'object')) {
    if (isArray(path)) {
      path = '';
    } else if (isObject(path)) {
      path = '';
    }
  } else {
    path = null;
  }
  if (path) {
    if (typeof data === 'boolean') {
      isReload = data;
    }
    if (isReload === true) {
      extraData.reload = true;
    }
    if (isObject(data) || isFunction(data)) {
      extraData.data = data;
    }
    const hash = hashPrefix() + parser.replacePath(path);
    if (hash !== window.location.hash) {
      window.location.hash = hash;
      // hash相同时强制执行回调
    } else if (isReload === true) {
      hashchange();
    }
  }
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
    callback(location());
    return () => {
      removeListener(callback);
    };
  }
  return () => {};
}

function createRouter({ prefix: routerPrefix }, callback) {
  if (!createdListener) {
    prefix = routerPrefix;
    createdListener = callback;
    listeners.push(createdListener);
    createdListener(getMergeLocation());
    window.addEventListener('hashchange', hashchange);
    return () => {
      createdListener = null;
      window.removeEventListener('hashchange', hashchange);
      removeListener();
    };
  }
  return null;
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

function getParams({ pathname }, path) {
  const normalPath = parser.normalize(path);
  const pathRegexp = pathRegexps[normalPath];
  if (pathRegexp) {
    const pathnameMatch = pathname.match(pathRegexp);
    const pathMatch = path.match(/\/:([^/]+)/g);
    const params = {};
    if (pathnameMatch && pathMatch) {
      pathMatch.forEach((param, i) => {
        const name = param.replace(/^\/:/, '');
        const value = pathnameMatch[i + 1];
        if (value !== undefined) {
          params[name] = value;
        }
      });
    }
    return params;
  }
  return {};
}

export {
  getLocation,
  location,
  listener,
  createRouter,
  reload,
  matchPath,
  savePath,
  removePath,
  getParams,
};

export default {
  listener,
  removeListener,
  location,
  matchPath,
  reload,
  back,
  forward,
};
