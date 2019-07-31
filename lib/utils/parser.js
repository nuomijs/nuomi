"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function replacePath(path) {
  // a//b//c => a/b/c
  // a/b/c => /a/b/c
  return path.replace(/\/{2,}/g, '/').replace(/^([^/])/, '/$1');
}

function normalize(path) {
  // /a/:b/ => /a/:b
  // /a/b => /a/b/
  return replacePath("".concat(path, "/")).replace(/(\/:[^/]+)\/$/, '$1');
}

function toRegexp(path) {
  var regexpPath = path.replace(/:([^/]+)$/, '([^/]+)?').replace(/\/:([^/]+)/g, '(/[^/]+)?').replace(/\/$/g, '/?').replace(/\//g, '\\/');
  return new RegExp("^".concat(regexpPath, "$"), 'i');
}

function parser(path) {
  var pathname = path;
  var url = '';
  var hash = '';
  var search = '';
  var query = {};
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    search.substr(1).split('&').forEach(function (param) {
      var _param$split = param.split('='),
          _param$split2 = _slicedToArray(_param$split, 2),
          name = _param$split2[0],
          value = _param$split2[1];

      if (name) {
        query[name] = value;
      }
    });
    pathname = pathname.substr(0, searchIndex);
  }

  pathname = replacePath(pathname);
  url = pathname + search + hash;
  return {
    pathname: pathname,
    url: url,
    hash: hash,
    search: search,
    query: query
  };
}

function merge() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return normalize(args.filter(function (path) {
    return !!path;
  }).join('/'));
}

parser.replacePath = replacePath;
parser.normalize = normalize;
parser.toRegexp = toRegexp;
parser.merge = merge;
var _default = parser;
exports.default = _default;