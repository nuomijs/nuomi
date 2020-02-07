"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = getLocation;
exports.normalLocation = normalLocation;
exports.location = location;
exports.listener = listener;
exports.createRouter = createRouter;
exports.reload = reload;
exports.matchPath = matchPath;
exports.matchPathname = matchPathname;
exports.savePath = savePath;
exports.removePath = removePath;
exports.getParamsLocation = getParamsLocation;
exports.getHashPrefix = getHashPrefix;
exports.default = void 0;

var _utils = require("../../utils");

var _parser = _interopRequireDefault(require("../../utils/parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 监听列表
var listeners = []; // hash前缀，紧跟在#后面的符号

var hashPrefix = ''; // location额外的数据

var extraData = {}; // 是否创建过路由

var created = false; // 是否允许执行路由监听器

var allowExecListener = true; // path对应的正则集合

var pathRegexps = {};

function back() {
  window.history.back();
}

function forward() {
  window.history.forward();
}

function getHashPrefix() {
  return "#".concat(hashPrefix);
}

function getLocation() {
  var hashPath = window.location.hash.substr(getHashPrefix().length);
  return (0, _parser.default)(hashPath);
}

function getMergeLocation() {
  var mergeLocation = _objectSpread({}, getLocation(), extraData); // 临时数据，仅用一次


  extraData = {};
  return mergeLocation;
}

function hashchange() {
  if (allowExecListener) {
    // 一次change可能有多个listeners，只创建一次location
    var currentLocation = null;
    listeners.forEach(function (callback) {
      if (!currentLocation) {
        currentLocation = getMergeLocation();
      }

      callback(currentLocation);
    });
  } else {
    allowExecListener = true;
  }
}

function location() {
  if (!arguments.length) {
    return getLocation();
  }

  var path = arguments.length <= 0 ? undefined : arguments[0];
  var data = arguments.length <= 1 ? undefined : arguments[1];
  var isReload = arguments.length <= 2 ? undefined : arguments[2];
  var force = arguments.length <= 3 ? undefined : arguments[3];

  if (path && (typeof path === 'string' || (0, _utils.isObject)(path))) {
    if ((0, _utils.isObject)(path)) {
      path = _parser.default.restore(path);
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

    if ((0, _utils.isObject)(data) || (0, _utils.isFunction)(data)) {
      extraData.data = data;
    }

    var hash = getHashPrefix() + _parser.default.replacePath(path);

    if (hash !== window.location.hash) {
      window.location.hash = hash; // hash相同时强制执行回调
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
  var _getLocation = getLocation(),
      url = _getLocation.url;

  location(url, true);
}

function removeListener() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // 移除所有
  if (!args.length) {
    listeners = [];
  } else {
    listeners = listeners.filter(function (cb) {
      return cb !== args[0];
    });
  }
}

function listener(callback) {
  if ((0, _utils.isFunction)(callback)) {
    listeners.push(callback); // 执行一次

    callback(getLocation());
    return function () {
      removeListener(callback);
    };
  }

  return function () {};
}

function createRouter(_ref, callback) {
  var prefix = _ref.hashPrefix;

  if (!created) {
    created = true;
    hashPrefix = prefix;
    listener(callback);
    window.addEventListener('hashchange', hashchange);
    return function () {
      created = false;
      window.removeEventListener('hashchange', hashchange); // 移除所有回调

      removeListener();
    };
  }

  return null;
}

function matchPathname(_ref2) {
  var pathname = _ref2.pathname;
  Object.keys(pathRegexps).forEach(function (i) {
    if (pathRegexps[i].test(pathname)) {
      return true;
    }
  });
  return false;
}

function matchPath(currentLocation, path) {
  var normalPath = _parser.default.normalize(path);

  var pathRegexp = pathRegexps[normalPath];

  if (pathRegexp) {
    return pathRegexp.test(currentLocation.pathname);
  }

  return false;
}

function savePath(path) {
  var normalPath = _parser.default.normalize(path);

  if (!pathRegexps[normalPath]) {
    pathRegexps[normalPath] = _parser.default.toRegexp(normalPath);
    return true;
  }

  return false;
}

function removePath(path) {
  delete pathRegexps[_parser.default.normalize(path)];
}

function getParamsLocation(locationData, path) {
  var pathname = locationData.pathname,
      rest = _objectWithoutProperties(locationData, ["pathname"]);

  var normalPath = _parser.default.normalize(path);

  var pathRegexp = pathRegexps[normalPath];

  if (pathRegexp) {
    var pathnameMatch = pathname.match(pathRegexp);
    var pathMatch = path.match(/\/:([^/]+)/g);
    var params = {};
    var paramsPathArray = [];
    var paramsPath = '';
    var newPathname = pathname;

    if (pathnameMatch && pathMatch) {
      pathMatch.forEach(function (param, i) {
        var name = param.replace(/^\/:/, '');
        var value = pathnameMatch[i + 1];
        paramsPathArray.push(value);

        if (value !== undefined) {
          params[name] = value.replace(/^\//, '');
        }
      }); // pathname排除params部分

      if (paramsPathArray.length > 0) {
        paramsPath = paramsPathArray.join('');
        var lastIndex = pathname.lastIndexOf(paramsPath);

        if (lastIndex !== -1) {
          newPathname = pathname.substr(0, lastIndex);
        }
      }
    }

    return _objectSpread({}, rest, {
      pathname: newPathname,
      params: params
    });
  }

  return locationData;
}

var _default = {
  listener: listener,
  location: location,
  matchPath: matchPath,
  reload: reload,
  back: back,
  forward: forward
};
exports.default = _default;