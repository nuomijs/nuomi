import { isObject, isString } from './index';

function replacePath(path) {
  return `/${path}`
    // /a//b//c => /a/b/c
    .replace(/\/{2,}/g, '/')
    // /a/b/c/ => /a/b/c
    .replace(/([^/])\/$/, '$1');
}

function toRegexp(path) {
  const regexpPath = path
  // ( => (?:
  // (?: => (?:
  .replace(/(\()(?!\?[:=!<>])/g, '$1?:')
  // /:id => /(\/\w+)
  .replace(/\/:\w+/g, '(\/\\w+)')
  // /a/b => \/a\/b
  // a.html => a\.html
  .replace(/([./])/g, '\\$1')
  // * => (?:.*)?
  // /* => (?:\/.*)?
  .replace(/(\\\/)?\*/g, '(?:$1.*)?');
  return new RegExp(`^${regexpPath}\\/?$`, 'i');
}

function parser(path) {
  let pathname = path;
  let url = '';
  let hash = '';
  let search = '';
  const query = {};
  const hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }
  const searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    search
      .substr(1)
      .split('&')
      .forEach((param) => {
        const [name, value] = param.split('=');
        if (name) {
          query[name] = value;
        }
      });
    pathname = pathname.substr(0, searchIndex);
  }
  pathname = replacePath(pathname);
  url = pathname + search + hash;
  return {
    pathname,
    url,
    hash,
    search,
    query,
  };
}

function restore(object) {
  if (isString(object)) {
    return object;
  }
  let path = '';
  const { pathname, params, query, search, url } = object;
  if (!!url && isString(url)) {
    path = url;
  } else if (!!pathname && isString(pathname)) {
    path = pathname;
    // if (isObject(params)) {
    //   Object.values(params).forEach((param) => {
    //     path += `/${param}`;
    //   });
    // }
    if (!!search && isString(search)) {
      if (search.indexOf('?') !== 0) {
        path += `?${search}`;
      } else {
        path += search;
      }
    } else if (isObject(query)) {
      path += '?';
      const querys = [];
      Object.keys(query).forEach((key) => {
        querys.push(`${key}=${query[key]}`);
      });
      path += querys.join('&');
    }
  }
  return path;
}

parser.replacePath = replacePath;

parser.toRegexp = toRegexp;

parser.restore = restore;

export default parser;
