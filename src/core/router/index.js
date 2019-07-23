import { isFunction } from '../../utils';

// 监听列表
let listeners = [];
// 路由是否被创建过
let created = false;
// hash前缀，紧跟在#后面的符号
let prefix = '/';

function back() {
  window.history.back();
}

function forward() {
  window.history.forward();
}

function hashchange() {

}

export function location(...args) {
  if (!args.length) {

  } else {
    let [path, data, isReload] = args;
  }
}

export function removeListener(...args) {
  // 移除所有
  if (!args.length) {
    listeners = [];
  } else {
    listeners = listeners.filter((cb) => cb !== args[0]);
  }
}

export function listener(callback) {
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

export function createRouter({ prefix: hashPrefix }) {
  if (!created) {
    prefix = hashPrefix;
    created = true;
    window.addEventListener('hashchange', hashchange);
    return () => {
      created = false;
      window.removeEventListener('hashchange', hashchange);
      removeListener();
    };
  }
  return null;
}

export function matchPath() {}

export function reload() {}

export default {
  listener,
  removeListener,
  location,
  matchPath,
  reload,
  back,
  forward,
};
