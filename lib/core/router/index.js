"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = getLocation;
exports.restoreLocation = restoreLocation;
exports.createRouter = createRouter;
exports.matchPath = matchPath;
exports.matchPathname = matchPathname;
exports.savePath = savePath;
exports.removePath = removePath;
exports.getParamsLocation = getParamsLocation;
exports.combinePath = combinePath;
exports.default = void 0;

var _utils = require("../../utils");

var _parser = _interopRequireDefault(require("../../utils/parser"));

var _globalWindow = _interopRequireDefault(require("../../utils/globalWindow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var globalLocation = _globalWindow.default.location; // 监听列表

var listeners = []; // location额外的数据

var extraData = {}; // 是否创建过路由

var created = false; // 是否允许执行路由监听器

var allowCallListener = true; // path对应的正则集合

var pathRegexps = {}; // 是否是hash类型

var isHash = true; // 默认路由选项

var defaultOptions = {
  // 路由类型 hash or browser
  type: 'hash',
  // 路由路径通用前缀
  basename: '/'
};
var options = defaultOptions;
var _clear = null;

function getOriginPath() {
  var _globalLocation = globalLocation,
      pathname = _globalLocation.pathname,
      search = _globalLocation.search,
      hash = _globalLocation.hash;

  if (isHash) {
    return hash.substr(1);
  }

  return pathname + search + hash;
}

function getLocation() {
  var originPath = getOriginPath();
  return (0, _parser.default)(originPath.replace(new RegExp("^".concat(options.basename)), ''));
}

function getMergeLocation() {
  var mergeLocation = _objectSpread({}, getLocation(), {}, extraData); // 临时数据，仅用一次


  extraData = {};
  return mergeLocation;
}

function routerEventListener() {
  if (allowCallListener) {
    // 一次change可能有多个listeners，只创建一次location
    var currentLocation = null;
    listeners.forEach(function (callback) {
      if (!currentLocation) {
        currentLocation = getMergeLocation();
      }

      callback(currentLocation);
    });
  } else {
    allowCallListener = true;
  }
}

function combinePath() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return _parser.default.replacePath("".concat(options.basename, "/").concat(path));
}

function locationHandle() {
  var type = arguments.length <= 0 ? undefined : arguments[0];
  var path = arguments.length <= 1 ? undefined : arguments[1];
  var data = arguments.length <= 2 ? undefined : arguments[2];
  var isReload = arguments.length <= 3 ? undefined : arguments[3];

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
      extraData.reload = isReload;
    }

    if ((0, _utils.isObject)(data) || (0, _utils.isFunction)(data)) {
      extraData.data = data;
    }

    var url = combinePath(path);
    var originPath = getOriginPath();

    if (url !== originPath) {
      if (isHash) {
        if (type === 'push') {
          globalLocation.hash = url;
        } else {
          var _globalLocation2 = globalLocation,
              pathname = _globalLocation2.pathname,
              search = _globalLocation2.search;
          globalLocation.replace("".concat(pathname + search, "#").concat(url));
        }
      } else {
        _globalWindow.default.history[type === 'push' ? 'pushState' : 'replaceState']({
          url: url
        }, null, url);

        routerEventListener();
      }
    } else if (isReload === true) {
      routerEventListener();
    }
  }
}

function location() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (!args.length) {
    return getLocation();
  }

  locationHandle.apply(void 0, ['push'].concat(args));
}

function replace() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  locationHandle.apply(void 0, ['replace'].concat(args));
}

function reload() {
  var _getLocation = getLocation(),
      url = _getLocation.url;

  location(url, true);
}

function back() {
  _globalWindow.default.history.back();
}

function forward() {
  _globalWindow.default.history.forward();
}

function restoreLocation(url) {
  allowCallListener = false;
  location(url);
}

function removeListener() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
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

function createRouter(routerOptions, staticLocation, callback) {
  if (staticLocation) {
    if ((0, _utils.isFunction)(_clear)) {
      _clear();
    }

    globalLocation = staticLocation;
  }

  if (!created) {
    created = true;
    options = _objectSpread({}, options, {}, routerOptions);
    isHash = options.type !== 'browser';
    var eventType = isHash ? 'hashchange' : 'popstate';
    listener(callback);

    _globalWindow.default.addEventListener(eventType, routerEventListener);

    _clear = function clear() {
      created = false;

      _globalWindow.default.removeEventListener(eventType, routerEventListener);

      removeListener();
      pathRegexps = {};
      options = defaultOptions;
      isHash = true;
      globalLocation = _globalWindow.default.location;
      _clear = null;
    };
  }

  return _clear;
}

function matchPathname(_ref) {
  var pathname = _ref.pathname;
  Object.keys(pathRegexps).forEach(function (i) {
    if (pathRegexps[i].test(pathname)) {
      return true;
    }
  });
  return false;
}

function matchPath(currentLocation, path) {
  var normalPath = _parser.default.replacePath(path);

  var pathRegexp = pathRegexps[normalPath];

  if (pathRegexp) {
    return pathRegexp.test(currentLocation.pathname);
  }

  return false;
}

function savePath(path) {
  var normalPath = _parser.default.replacePath(path);

  if (!pathRegexps[normalPath]) {
    pathRegexps[normalPath] = _parser.default.toRegexp(normalPath);
    return true;
  }

  return false;
}

function removePath(path) {
  delete pathRegexps[_parser.default.replacePath(path)];
}

function getParamsLocation(locationData, path) {
  var pathname = locationData.pathname,
      rest = _objectWithoutProperties(locationData, ["pathname"]);

  var normalPath = _parser.default.replacePath(path);

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
  replace: replace,
  back: back,
  forward: forward
};
exports.default = _default;