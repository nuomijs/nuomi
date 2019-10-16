import { isObject, isString } from './index';

function replacePath(path) {
  // a//b//c => a/b/c
  // a/b/c => /a/b/c
  return `${path}/`
    .replace(/\/{2,}/g, '/')
    .replace(/^([^/])/, '/$1')
    .replace(/([^/])\/$/, '$1');
}

function normalize(path) {
  // /a/:b/ => /a/:b
  // /a/b => /a/b/
  return replacePath(path).replace(/(\/:[^/]+)\/$/, '$1');
}

function toRegexp(path) {
  const regexpPath = path.replace(/\/:([^/]+)/g, '(/[^/]+)?').replace(/\//g, '\\/');
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
  let path = '';
  const { pathname, params, query, search, url } = object;
  if (!!url && isString(url)) {
    path = url;
  } else if (!!pathname && isString(pathname)) {
    path = pathname;
    if (isObject(params)) {
      Object.values(params).forEach((param) => {
        path += `/${param}`;
      });
    }
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

function merge(...args) {
  return normalize(args.filter((path) => !!path).join('/'));
}

parser.replacePath = replacePath;

parser.normalize = normalize;

parser.toRegexp = toRegexp;

parser.restore = restore;

parser.merge = merge;

export default parser;
