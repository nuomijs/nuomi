"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = getLocation;
exports.createRouter = createRouter;
exports.savePath = savePath;
exports.removePath = removePath;
exports.combinePath = combinePath;
exports.default = exports.blockData = void 0;

var _warning = _interopRequireDefault(require("warning"));

var _utils = require("../../utils");

var _parser = _interopRequireDefault(require("../../utils/parser"));

var _globalWindow = _interopRequireDefault(require("../../utils/globalWindow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}; // 路由选项

var options = defaultOptions; // 清理路由数据

var _clear = null; // 当前location

var currentLocation = null; // 阻塞路由控制

var blockData = {}; // 阻塞回调

exports.blockData = blockData;
var blockCallback = null;

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

function block(callback) {
  if (!blockCallback) {
    if ((0, _utils.isFunction)(callback)) {
      blockCallback = function blockCallback(enter, restore, toLocation) {
        var isEnter = callback(currentLocation, toLocation, enter) !== false;

        if (isEnter) {
          enter(isEnter);
        } else {
          restore(currentLocation.url);
        }
      };
    }
  } else {
    (0, _warning.default)(false, 'router.block只能创建一次');
  }
}

function callListener() {
  // 一次change可能有多个listeners，只创建一次location
  var current = null;
  listeners.forEach(function (callback) {
    if (!current) {
      current = getMergeLocation();
    }

    callback(current);
  });
}

function routerEventListener() {
  if (allowCallListener) {
    // 检测路由是否冻结
    if ((0, _utils.isFunction)(blockData.callback) || (0, _utils.isFunction)(blockCallback)) {
      // 记录待跳转的数据
      if (!blockData.toLocation) {
        blockData.toLocation = getMergeLocation();
      }

      var _blockData$toLocation = blockData.toLocation,
          url = _blockData$toLocation.url,
          _reload = _blockData$toLocation.reload,
          data = _blockData$toLocation.data;
      var callback = blockData.callback || blockCallback;
      callback(function (isLeave) {
        exports.blockData = blockData = {};
        allowCallListener = true;

        if (isLeave) {
          callListener();
        } else {
          location(url, data, _reload);
        }
      }, function (url) {
        allowCallListener = false;
        replace(url);
      }, blockData.toLocation);
    } else {
      callListener();
    }
  } else {
    allowCallListener = true;
  }
}

function combinePath() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return _parser.default.replacePath("".concat(options.basename, "/").concat(_parser.default.restore(path)));
}

function locationHandle() {
  var type = arguments.length <= 0 ? undefined : arguments[0];
  var path = arguments.length <= 1 ? undefined : arguments[1];
  var data = arguments.length <= 2 ? undefined : arguments[2];
  var isReload = arguments.length <= 3 ? undefined : arguments[3];

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

  replace(url, true);
}

function back() {
  _globalWindow.default.history.back();
}

function forward() {
  _globalWindow.default.history.forward();
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
    listener(function (location) {
      callback(currentLocation = location);
    });

    _globalWindow.default.addEventListener(eventType, routerEventListener);

    return _clear = function clear() {
      created = false;

      _globalWindow.default.removeEventListener(eventType, routerEventListener);

      removeListener();
      pathRegexps = {};
      options = defaultOptions;
      isHash = true;
      globalLocation = _globalWindow.default.location;
      _clear = null;
      currentLocation = null;
      beforeEnterCallback = null;
      exports.blockData = blockData = {};
    };
  }
}

function matchPath(location, path) {
  var pathname = location.pathname;

  var normalPath = _parser.default.replacePath(path);

  var pathRegexp = pathRegexps[normalPath];
  var pathnameMatch;

  if (pathRegexp && !!(pathnameMatch = pathname.match(pathRegexp))) {
    var pathMatch = path.match(/\/:(\w+)/g);

    if (pathMatch) {
      var params = {};
      pathMatch.forEach(function (param, i) {
        var name = param.replace(/^\/:/, '');
        var value = pathnameMatch[i + 1];

        if (value !== undefined) {
          params[name] = value.replace(/^\//, '');
        }
      });
      return _objectSpread({}, location, {
        params: params
      });
    }

    return location;
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

function mergePath() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  var paths = args.filter(function (path) {
    return path && (0, _utils.isString)(path);
  });
  var maxIndex = paths.length - 1;
  paths = paths.map(function (path, index) {
    return index < maxIndex ? path.replace(/\*$/, '') : path;
  });
  return _parser.default.replacePath(paths.join('/'));
}

var _default = {
  listener: listener,
  location: location,
  reload: reload,
  replace: replace,
  back: back,
  forward: forward,
  matchPath: matchPath,
  mergePath: mergePath,
  block: block
};
exports.default = _default;