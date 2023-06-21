export function normalizePath(path) {
  return (
    `/${path}`
      // /a//b//c => /a/b/c
      .replace(/\/{2,}/g, '/')
      // /a/b/c/ => /a/b/c
      .replace(/([^/])\/$/, '$1')
      // /a/***/b/*** => /a/*/b/*
      .replace(/\*{2,}/g, '*')
  );
}

export function pathToRegexp(path) {
  const regexpPath = path
    // ( => (?:
    // (?: => (?:
    .replace(/(\()(?!\?[:=!<>])/g, '$1?:')
    // /:id => /(\/\w+)
    .replace(/\/:[\w-]+/g, '(/[\\w-]+)')
    // /a/b => \/a\/b
    // a.html => a\.html
    .replace(/([./])/g, '\\$1')
    // * => (?:.*)?
    // /* => (?:\/.*)?
    .replace(/(\\\/)?\*/g, '(?:$1.*)?');
  return new RegExp(`^${regexpPath}\\/?$`, 'i');
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
