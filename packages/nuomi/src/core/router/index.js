import warning from 'warning';
import { isFunction, isObject, isString } from '../../utils';
import parser, { pathToRegexp, normalizePath, restorePath } from '../../utils/parser';
import globalWindow from '../../utils/globalWindow';

let globalLocation = globalWindow.location;
const globalHistory = globalWindow.history;
// 监听列表
let listeners = [];
// route额外的数据
let extraData = {};
// 是否允许清除额外数据
let clearExtraData = true;
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
// 当前route
let currentRoute = null;
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

function getRoute() {
  const originPath = getOriginPath();
  return Object.assign(parser(originPath.replace(new RegExp(`^${options.basename}`), '')), { state: extraData.state || {} });
}

function getMergeRoute() {
  return Object.assign(getRoute(), extraData);
}

function block(callback) {
  if (!blockCallback) {
    if (isFunction(callback)) {
      blockCallback = (enter, restore, toRoute) => {
        const isEnter = callback(currentRoute, toRoute, enter) !== false;
        if (isEnter) {
          enter(isEnter);
        } else {
          restore(currentRoute.url);
        }
      };
    }
  } else {
    warning(false, 'router.block只能创建一次');
  }
}

function callListener() {
  // 一次change可能有多个listeners，只创建一次route
  let current = null;
  listeners.forEach((callback) => {
    if (!current) {
      current = getMergeRoute();
    }
    callback(current);
  });
}

function routerEventListener() {
  if (allowCallListener) {
    if (clearExtraData) {
      extraData = {};
    } else {
      clearExtraData = true;
    }
    // 检测路由是否冻结
    if (isFunction(blockData.callback) || isFunction(blockCallback)) {
      // 记录待跳转的数据
      if (!blockData.toRoute) {
        blockData.toRoute = getMergeRoute();
      }
      const { reload: isReload, ...rest } = blockData.toRoute;
      const callback = blockData.callback || blockCallback;
      callback(
        (isLeave) => {
          blockData = {};
          allowCallListener = true;
          if (isLeave) {
            callListener();
          } else {
            // eslint-disable-next-line no-use-before-define
            push(rest, isReload);
          }
        },
        (path) => {
          clearExtraData = true;
          extraData = {};
          allowCallListener = false;
          blockData.toRoute = null;
          // eslint-disable-next-line no-use-before-define
          replace(path);
        },
        blockData.toRoute,
      );
    } else {
      callListener();
    }
  } else {
    allowCallListener = true;
  }
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

function routeHandle(...args) {
  const type = args[0];
  const path = args[1];
  const isReload = args[2];
  if (path) {
    clearExtraData = false;
    extraData = {};

    if (typeof isReload === 'boolean') {
      extraData.reload = isReload;
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

function route() {
  return getRoute();
}

function push(...args) {
  routeHandle('push', ...args);
}

function replace(...args) {
  routeHandle('replace', ...args);
}

function reload() {
  const { url } = getRoute();
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
    callback(getRoute(), true);
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
    listener((route) => {
      callback((currentRoute = route));
    });
    globalWindow.addEventListener(eventType, routerEventListener);
    return (clear = () => {
      created = false;
      globalWindow.removeEventListener(eventType, routerEventListener);
      removeListener();
      pathRegexps = {};
      options = defaultOptions;
      isHash = true;
      globalLocation = globalWindow.location;
      clear = null;
      currentRoute = null;
      blockCallback = null;
      blockData = {};
      clearExtraData = true;
      extraData = {};
    });
  }
}

function match(route, path, returns) {
  const { pathname } = route;
  const normalPath = normalizePath(path);
  let pathRegexp = pathRegexps[normalPath];

  if (!pathRegexp) {
    pathRegexp = pathToRegexp(normalPath);
    pathRegexps[normalPath] = pathRegexp;
  }

  const pathnameMatch = pathname.match(pathRegexp);
  const isMatch = !!pathnameMatch;

  if (isMatch && returns) {
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
        ...route,
        params,
      };
    }
    return route;
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
  createRouter, blockData, combinePath, match,
};

export default {
  listener,
  route,
  reload,
  replace,
  back,
  forward,
  matchPath,
  mergePath,
  block,
};
