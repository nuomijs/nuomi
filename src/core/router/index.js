import warning from 'warning';
import { isFunction, isObject } from '../../utils';
import parser from '../../utils/parser';
import globalWindow from '../../utils/globalWindow';
import { isString } from '../../utils';

let globalLocation = globalWindow.location;
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
// 阻塞路由控制
let blockRouter = {};
// 当前location
let currentLocation = null;
// beforeEnter回调
let beforeEnterCallback = null;

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

function beforeEnter(callback) {
  if (!beforeEnterCallback) {
    if (isFunction(callback)) {
      beforeEnterCallback = (enter, restore, toLocation) => {
        const isEnter = callback(currentLocation, toLocation, enter) !== false;
        if (isEnter) {
          enter(isEnter);
        } else {
          restore(currentLocation.url);
        }
      }
    }
  } else {
    warning(false, 'beforeEnter只能创建一次');
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
    if (isFunction(blockRouter.callback) || isFunction(beforeEnterCallback)) {
      // 记录待跳转的数据
      if (!blockRouter.toLocation) {
        blockRouter.toLocation = getMergeLocation();
      }
      const { url, reload, data } = blockRouter.toLocation;
      const callback = blockRouter.callback || beforeEnterCallback;
      callback((isLeave) => {
        blockRouter = {};
        allowCallListener = true;
        if (isLeave) {
          callListener();
        } else {
          location(url, data, reload);
        }
      }, (url) => {
        allowCallListener = false;
        replace(url);
      }, blockRouter.toLocation);
    } else {
      callListener();
    }
  } else {
    allowCallListener = true;
  }
}

function combinePath(path = '') {
  return parser.replacePath(`${options.basename}/${path}`);
}

function locationHandle(...args) {
  const type = args[0];
  let path = args[1];
  const data = args[2];
  let isReload = args[3];
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
      extraData.reload = isReload;
    }
    if (isObject(data) || isFunction(data)) {
      extraData.data = data;
    }

    const url = combinePath(path);
    const originPath = getOriginPath();

    if (url !== originPath) {
      if (isHash) {
        if (type === 'push') {
          globalLocation.hash = url;
        } else {
          const { pathname, search } = globalLocation;
          globalLocation.replace(`${pathname + search}#${url}`);
        }
      } else {
        globalWindow.history[type === 'push' ? 'pushState' : 'replaceState']({ url }, null, url);
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

function back() {
  globalWindow.history.back();
}

function forward() {
  globalWindow.history.forward();
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
    listener((location) => {
      callback(currentLocation = location);
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
      beforeEnterCallback = null;
      blockRouter = {};
    };
  }
}

function matchPath(current, path) {
  const normalPath = parser.replacePath(path);
  const pathRegexp = pathRegexps[normalPath];
  if (pathRegexp) {
    return pathRegexp.test(current.pathname);
  }
  return false;
}

function savePath(path) {
  const normalPath = parser.replacePath(path);
  if (!pathRegexps[normalPath]) {
    pathRegexps[normalPath] = parser.toRegexp(normalPath);
    return true;
  }
  return false;
}

function removePath(path) {
  delete pathRegexps[parser.replacePath(path)];
}

function getParamsLocation(locationData, path) {
  const { pathname, ...rest } = locationData;
  const normalPath = parser.replacePath(path);
  const pathRegexp = pathRegexps[normalPath];
  if (pathRegexp) {
    const pathnameMatch = pathname.match(pathRegexp);
    const pathMatch = path.match(/\/:(\w+)/g);
    const params = {};
    const paramsPathArray = [];
    // let paramsPath = '';
    // let newPathname = pathname;
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
      // if (paramsPathArray.length > 0) {
      //   paramsPath = paramsPathArray.join('');
      //   const lastIndex = pathname.lastIndexOf(paramsPath);
      //   if (lastIndex !== -1) {
      //     newPathname = pathname.substr(0, lastIndex);
      //   }
      // }
    }
    return {
      ...rest,
      // pathname: newPathname,
      params,
    };
  }
  return locationData;
}

function mergePath(...args) {
  let paths = args.filter((path) => path && isString(path));
  const maxIndex = paths.length - 1;
  paths = paths.map((path, index) => index < maxIndex ? path.replace(/\*$/, '') : path);
  return parser.replacePath(paths.join('/'));
}

export {
  getLocation,
  createRouter,
  blockRouter,
  savePath,
  removePath,
  getParamsLocation,
  combinePath,
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
  beforeEnter,
};
