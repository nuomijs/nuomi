import { isObject, isString } from './index';

export function normalizePath(path) {
  return `/${path}`
    // /a//b//c => /a/b/c
    .replace(/\/{2,}/g, '/')
    // /a/b/c/ => /a/b/c
    .replace(/([^/])\/$/, '$1')
    // /a/***/b/*** => /a/*/b/*
    .replace(/\*{2,}/g, '*');
}

export function pathToRegexp(path) {
  const regexpPath = path
    // ( => (?:
    // (?: => (?:
    .replace(/(\()(?!\?[:=!<>])/g, '$1?:')
    // /:id => /(\/\w+)
    .replace(/\/:\w+/g, '(/\\w+)')
    // /a/b => \/a\/b
    // a.html => a\.html
    .replace(/([./])/g, '\\$1')
    // * => (?:.*)?
    // /* => (?:\/.*)?
    .replace(/(\\\/)?\*/g, '(?:$1.*)?');
  return new RegExp(`^${regexpPath}\\/?$`, 'i');
}

export function restorePath(object) {
  if (isString(object)) {
    return object;
  }
  let path = '';
  const {
    pathname, query, search, url, hash,
  } = object;
  if (!!url && isString(url)) {
    path = url;
  } else if (!!pathname && isString(pathname)) {
    path = pathname;
    if (!!search && isString(search)) {
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

export default function parser(path) {
  let pathname = path;
  let url = '';
  let hash = '';
  let search = '';
  const query = {};
  const params = {};
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
  pathname = normalizePath(pathname);
  url = pathname + search + hash;
  return {
    pathname,
    url,
    hash,
    search,
    query,
    params,
  };
}
