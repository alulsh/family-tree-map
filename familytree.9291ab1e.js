// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/dayjs/esm/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEX_FORMAT = exports.REGEX_PARSE = exports.INVALID_DATE_STRING = exports.FORMAT_DEFAULT = exports.DATE = exports.Y = exports.Q = exports.M = exports.W = exports.D = exports.H = exports.MIN = exports.S = exports.MS = exports.MILLISECONDS_A_WEEK = exports.MILLISECONDS_A_DAY = exports.MILLISECONDS_A_HOUR = exports.MILLISECONDS_A_MINUTE = exports.MILLISECONDS_A_SECOND = exports.SECONDS_A_WEEK = exports.SECONDS_A_DAY = exports.SECONDS_A_HOUR = exports.SECONDS_A_MINUTE = void 0;
var SECONDS_A_MINUTE = 60;
exports.SECONDS_A_MINUTE = SECONDS_A_MINUTE;
var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
exports.SECONDS_A_HOUR = SECONDS_A_HOUR;
var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
exports.SECONDS_A_DAY = SECONDS_A_DAY;
var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
exports.SECONDS_A_WEEK = SECONDS_A_WEEK;
var MILLISECONDS_A_SECOND = 1e3;
exports.MILLISECONDS_A_SECOND = MILLISECONDS_A_SECOND;
var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
exports.MILLISECONDS_A_MINUTE = MILLISECONDS_A_MINUTE;
var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
exports.MILLISECONDS_A_HOUR = MILLISECONDS_A_HOUR;
var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
exports.MILLISECONDS_A_DAY = MILLISECONDS_A_DAY;
var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND; // English locales

exports.MILLISECONDS_A_WEEK = MILLISECONDS_A_WEEK;
var MS = 'millisecond';
exports.MS = MS;
var S = 'second';
exports.S = S;
var MIN = 'minute';
exports.MIN = MIN;
var H = 'hour';
exports.H = H;
var D = 'day';
exports.D = D;
var W = 'week';
exports.W = W;
var M = 'month';
exports.M = M;
var Q = 'quarter';
exports.Q = Q;
var Y = 'year';
exports.Y = Y;
var DATE = 'date';
exports.DATE = DATE;
var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';
exports.FORMAT_DEFAULT = FORMAT_DEFAULT;
var INVALID_DATE_STRING = 'Invalid Date'; // regex

exports.INVALID_DATE_STRING = INVALID_DATE_STRING;
var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?\.?(\d+)?$/;
exports.REGEX_PARSE = REGEX_PARSE;
var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
exports.REGEX_FORMAT = REGEX_FORMAT;
},{}],"node_modules/dayjs/esm/locale/en.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// English [en]
// We don't need weekdaysShort, weekdaysMin, monthsShort in en.js locale
var _default = {
  name: 'en',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')
};
exports.default = _default;
},{}],"node_modules/dayjs/esm/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var C = _interopRequireWildcard(require("./constant"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var padStart = function padStart(string, length, pad) {
  var s = String(string);
  if (!s || s.length >= length) return string;
  return "" + Array(length + 1 - s.length).join(pad) + string;
};

var padZoneStr = function padZoneStr(instance) {
  var negMinutes = -instance.utcOffset();
  var minutes = Math.abs(negMinutes);
  var hourOffset = Math.floor(minutes / 60);
  var minuteOffset = minutes % 60;
  return "" + (negMinutes <= 0 ? '+' : '-') + padStart(hourOffset, 2, '0') + ":" + padStart(minuteOffset, 2, '0');
};

var monthDiff = function monthDiff(a, b) {
  // function from moment.js in order to keep the same result
  if (a.date() < b.date()) return -monthDiff(b, a);
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
  var anchor = a.clone().add(wholeMonthDiff, C.M);
  var c = b - anchor < 0;
  var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), C.M);
  return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
};

var absFloor = function absFloor(n) {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
};

var prettyUnit = function prettyUnit(u) {
  var special = {
    M: C.M,
    y: C.Y,
    w: C.W,
    d: C.D,
    D: C.DATE,
    h: C.H,
    m: C.MIN,
    s: C.S,
    ms: C.MS,
    Q: C.Q
  };
  return special[u] || String(u || '').toLowerCase().replace(/s$/, '');
};

var isUndefined = function isUndefined(s) {
  return s === undefined;
};

var _default = {
  s: padStart,
  z: padZoneStr,
  m: monthDiff,
  a: absFloor,
  p: prettyUnit,
  u: isUndefined
};
exports.default = _default;
},{"./constant":"node_modules/dayjs/esm/constant.js"}],"node_modules/dayjs/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var C = _interopRequireWildcard(require("./constant"));

var _en = _interopRequireDefault(require("./locale/en"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var L = 'en'; // global locale

var Ls = {}; // global loaded locale

Ls[L] = _en.default;

var isDayjs = function isDayjs(d) {
  return d instanceof Dayjs;
}; // eslint-disable-line no-use-before-define


var parseLocale = function parseLocale(preset, object, isLocal) {
  var l;
  if (!preset) return L;

  if (typeof preset === 'string') {
    if (Ls[preset]) {
      l = preset;
    }

    if (object) {
      Ls[preset] = object;
      l = preset;
    }
  } else {
    var name = preset.name;
    Ls[name] = preset;
    l = name;
  }

  if (!isLocal && l) L = l;
  return l || !isLocal && L;
};

var dayjs = function dayjs(date, c) {
  if (isDayjs(date)) {
    return date.clone();
  } // eslint-disable-next-line no-nested-ternary


  var cfg = typeof c === 'object' ? c : {};
  cfg.date = date;
  cfg.args = arguments; // eslint-disable-line prefer-rest-params

  return new Dayjs(cfg); // eslint-disable-line no-use-before-define
};

var wrapper = function wrapper(date, instance) {
  return dayjs(date, {
    locale: instance.$L,
    utc: instance.$u,
    x: instance.$x,
    $offset: instance.$offset // todo: refactor; do not use this.$offset in you code

  });
};

var Utils = _utils.default; // for plugin use

Utils.l = parseLocale;
Utils.i = isDayjs;
Utils.w = wrapper;

var parseDate = function parseDate(cfg) {
  var date = cfg.date,
      utc = cfg.utc;
  if (date === null) return new Date(NaN); // null is invalid

  if (Utils.u(date)) return new Date(); // today

  if (date instanceof Date) return new Date(date);

  if (typeof date === 'string' && !/Z$/i.test(date)) {
    var d = date.match(C.REGEX_PARSE);

    if (d) {
      var m = d[2] - 1 || 0;
      var ms = (d[7] || '0').substring(0, 3);

      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
      }

      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
    }
  }

  return new Date(date); // everything else
};

var Dayjs = /*#__PURE__*/function () {
  function Dayjs(cfg) {
    this.$L = parseLocale(cfg.locale, null, true);
    this.parse(cfg); // for plugin
  }

  var _proto = Dayjs.prototype;

  _proto.parse = function parse(cfg) {
    this.$d = parseDate(cfg);
    this.$x = cfg.x || {};
    this.init();
  };

  _proto.init = function init() {
    var $d = this.$d;
    this.$y = $d.getFullYear();
    this.$M = $d.getMonth();
    this.$D = $d.getDate();
    this.$W = $d.getDay();
    this.$H = $d.getHours();
    this.$m = $d.getMinutes();
    this.$s = $d.getSeconds();
    this.$ms = $d.getMilliseconds();
  } // eslint-disable-next-line class-methods-use-this
  ;

  _proto.$utils = function $utils() {
    return Utils;
  };

  _proto.isValid = function isValid() {
    return !(this.$d.toString() === C.INVALID_DATE_STRING);
  };

  _proto.isSame = function isSame(that, units) {
    var other = dayjs(that);
    return this.startOf(units) <= other && other <= this.endOf(units);
  };

  _proto.isAfter = function isAfter(that, units) {
    return dayjs(that) < this.startOf(units);
  };

  _proto.isBefore = function isBefore(that, units) {
    return this.endOf(units) < dayjs(that);
  };

  _proto.$g = function $g(input, get, set) {
    if (Utils.u(input)) return this[get];
    return this.set(set, input);
  };

  _proto.unix = function unix() {
    return Math.floor(this.valueOf() / 1000);
  };

  _proto.valueOf = function valueOf() {
    // timezone(hour) * 60 * 60 * 1000 => ms
    return this.$d.getTime();
  };

  _proto.startOf = function startOf(units, _startOf) {
    var _this = this; // startOf -> endOf


    var isStartOf = !Utils.u(_startOf) ? _startOf : true;
    var unit = Utils.p(units);

    var instanceFactory = function instanceFactory(d, m) {
      var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
      return isStartOf ? ins : ins.endOf(C.D);
    };

    var instanceFactorySet = function instanceFactorySet(method, slice) {
      var argumentStart = [0, 0, 0, 0];
      var argumentEnd = [23, 59, 59, 999];
      return Utils.w(_this.toDate()[method].apply( // eslint-disable-line prefer-spread
      _this.toDate('s'), (isStartOf ? argumentStart : argumentEnd).slice(slice)), _this);
    };

    var $W = this.$W,
        $M = this.$M,
        $D = this.$D;
    var utcPad = "set" + (this.$u ? 'UTC' : '');

    switch (unit) {
      case C.Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);

      case C.M:
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);

      case C.W:
        {
          var weekStart = this.$locale().weekStart || 0;
          var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
          return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
        }

      case C.D:
      case C.DATE:
        return instanceFactorySet(utcPad + "Hours", 0);

      case C.H:
        return instanceFactorySet(utcPad + "Minutes", 1);

      case C.MIN:
        return instanceFactorySet(utcPad + "Seconds", 2);

      case C.S:
        return instanceFactorySet(utcPad + "Milliseconds", 3);

      default:
        return this.clone();
    }
  };

  _proto.endOf = function endOf(arg) {
    return this.startOf(arg, false);
  };

  _proto.$set = function $set(units, _int) {
    var _C$D$C$DATE$C$M$C$Y$C; // private set


    var unit = Utils.p(units);
    var utcPad = "set" + (this.$u ? 'UTC' : '');
    var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[C.D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[C.DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[C.M] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[C.Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[C.H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[C.MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[C.S] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[C.MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
    var arg = unit === C.D ? this.$D + (_int - this.$W) : _int;

    if (unit === C.M || unit === C.Y) {
      // clone is for badMutable plugin
      var date = this.clone().set(C.DATE, 1);
      date.$d[name](arg);
      date.init();
      this.$d = date.set(C.DATE, Math.min(this.$D, date.daysInMonth())).$d;
    } else if (name) this.$d[name](arg);

    this.init();
    return this;
  };

  _proto.set = function set(string, _int2) {
    return this.clone().$set(string, _int2);
  };

  _proto.get = function get(unit) {
    return this[Utils.p(unit)]();
  };

  _proto.add = function add(number, units) {
    var _this2 = this,
        _C$MIN$C$H$C$S$unit;

    number = Number(number); // eslint-disable-line no-param-reassign

    var unit = Utils.p(units);

    var instanceFactorySet = function instanceFactorySet(n) {
      var d = dayjs(_this2);
      return Utils.w(d.date(d.date() + Math.round(n * number)), _this2);
    };

    if (unit === C.M) {
      return this.set(C.M, this.$M + number);
    }

    if (unit === C.Y) {
      return this.set(C.Y, this.$y + number);
    }

    if (unit === C.D) {
      return instanceFactorySet(1);
    }

    if (unit === C.W) {
      return instanceFactorySet(7);
    }

    var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[C.MIN] = C.MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[C.H] = C.MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[C.S] = C.MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1; // ms

    var nextTimeStamp = this.$d.getTime() + number * step;
    return Utils.w(nextTimeStamp, this);
  };

  _proto.subtract = function subtract(number, string) {
    return this.add(number * -1, string);
  };

  _proto.format = function format(formatStr) {
    var _this3 = this;

    if (!this.isValid()) return C.INVALID_DATE_STRING;
    var str = formatStr || C.FORMAT_DEFAULT;
    var zoneStr = Utils.z(this);
    var locale = this.$locale();
    var $H = this.$H,
        $m = this.$m,
        $M = this.$M;
    var weekdays = locale.weekdays,
        months = locale.months,
        meridiem = locale.meridiem;

    var getShort = function getShort(arr, index, full, length) {
      return arr && (arr[index] || arr(_this3, str)) || full[index].substr(0, length);
    };

    var get$H = function get$H(num) {
      return Utils.s($H % 12 || 12, num, '0');
    };

    var meridiemFunc = meridiem || function (hour, minute, isLowercase) {
      var m = hour < 12 ? 'AM' : 'PM';
      return isLowercase ? m.toLowerCase() : m;
    };

    var matches = {
      YY: String(this.$y).slice(-2),
      YYYY: this.$y,
      M: $M + 1,
      MM: Utils.s($M + 1, 2, '0'),
      MMM: getShort(locale.monthsShort, $M, months, 3),
      MMMM: getShort(months, $M),
      D: this.$D,
      DD: Utils.s(this.$D, 2, '0'),
      d: String(this.$W),
      dd: getShort(locale.weekdaysMin, this.$W, weekdays, 2),
      ddd: getShort(locale.weekdaysShort, this.$W, weekdays, 3),
      dddd: weekdays[this.$W],
      H: String($H),
      HH: Utils.s($H, 2, '0'),
      h: get$H(1),
      hh: get$H(2),
      a: meridiemFunc($H, $m, true),
      A: meridiemFunc($H, $m, false),
      m: String($m),
      mm: Utils.s($m, 2, '0'),
      s: String(this.$s),
      ss: Utils.s(this.$s, 2, '0'),
      SSS: Utils.s(this.$ms, 3, '0'),
      Z: zoneStr // 'ZZ' logic below

    };
    return str.replace(C.REGEX_FORMAT, function (match, $1) {
      return $1 || matches[match] || zoneStr.replace(':', '');
    }); // 'ZZ'
  };

  _proto.utcOffset = function utcOffset() {
    // Because a bug at FF24, we're rounding the timezone offset around 15 minutes
    // https://github.com/moment/moment/pull/1871
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  };

  _proto.diff = function diff(input, units, _float) {
    var _C$Y$C$M$C$Q$C$W$C$D$;

    var unit = Utils.p(units);
    var that = dayjs(input);
    var zoneDelta = (that.utcOffset() - this.utcOffset()) * C.MILLISECONDS_A_MINUTE;
    var diff = this - that;
    var result = Utils.m(this, that);
    result = (_C$Y$C$M$C$Q$C$W$C$D$ = {}, _C$Y$C$M$C$Q$C$W$C$D$[C.Y] = result / 12, _C$Y$C$M$C$Q$C$W$C$D$[C.M] = result, _C$Y$C$M$C$Q$C$W$C$D$[C.Q] = result / 3, _C$Y$C$M$C$Q$C$W$C$D$[C.W] = (diff - zoneDelta) / C.MILLISECONDS_A_WEEK, _C$Y$C$M$C$Q$C$W$C$D$[C.D] = (diff - zoneDelta) / C.MILLISECONDS_A_DAY, _C$Y$C$M$C$Q$C$W$C$D$[C.H] = diff / C.MILLISECONDS_A_HOUR, _C$Y$C$M$C$Q$C$W$C$D$[C.MIN] = diff / C.MILLISECONDS_A_MINUTE, _C$Y$C$M$C$Q$C$W$C$D$[C.S] = diff / C.MILLISECONDS_A_SECOND, _C$Y$C$M$C$Q$C$W$C$D$)[unit] || diff; // milliseconds

    return _float ? result : Utils.a(result);
  };

  _proto.daysInMonth = function daysInMonth() {
    return this.endOf(C.M).$D;
  };

  _proto.$locale = function $locale() {
    // get locale object
    return Ls[this.$L];
  };

  _proto.locale = function locale(preset, object) {
    if (!preset) return this.$L;
    var that = this.clone();
    var nextLocaleName = parseLocale(preset, object, true);
    if (nextLocaleName) that.$L = nextLocaleName;
    return that;
  };

  _proto.clone = function clone() {
    return Utils.w(this.$d, this);
  };

  _proto.toDate = function toDate() {
    return new Date(this.valueOf());
  };

  _proto.toJSON = function toJSON() {
    return this.isValid() ? this.toISOString() : null;
  };

  _proto.toISOString = function toISOString() {
    // ie 8 return
    // new Dayjs(this.valueOf() + this.$d.getTimezoneOffset() * 60000)
    // .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    return this.$d.toISOString();
  };

  _proto.toString = function toString() {
    return this.$d.toUTCString();
  };

  return Dayjs;
}();

var proto = Dayjs.prototype;
dayjs.prototype = proto;
[['$ms', C.MS], ['$s', C.S], ['$m', C.MIN], ['$H', C.H], ['$W', C.D], ['$M', C.M], ['$y', C.Y], ['$D', C.DATE]].forEach(function (g) {
  proto[g[1]] = function (input) {
    return this.$g(input, g[0], g[1]);
  };
});

dayjs.extend = function (plugin, option) {
  if (!plugin.$i) {
    // install plugin only once
    plugin(option, Dayjs, dayjs);
    plugin.$i = true;
  }

  return dayjs;
};

dayjs.locale = parseLocale;
dayjs.isDayjs = isDayjs;

dayjs.unix = function (timestamp) {
  return dayjs(timestamp * 1e3);
};

dayjs.en = Ls[L];
dayjs.Ls = Ls;
dayjs.p = {};
var _default = dayjs;
exports.default = _default;
},{"./constant":"node_modules/dayjs/esm/constant.js","./locale/en":"node_modules/dayjs/esm/locale/en.js","./utils":"node_modules/dayjs/esm/utils.js"}],"node_modules/dayjs/plugin/localizedFormat.js":[function(require,module,exports) {
var define;
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.dayjs_plugin_localizedFormat=t()}(this,function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(t,n,o){var r=n.prototype,M=r.format;o.en.formats=e,r.format=function(t){void 0===t&&(t="YYYY-MM-DDTHH:mm:ssZ");var n=this.$locale().formats,o=function(t,n){return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(t,o,r){var M=r&&r.toUpperCase();return o||n[r]||e[r]||n[M].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(e,t,n){return t||n.slice(1)})})}(t,void 0===n?{}:n);return M.call(this,o)}}});

},{}],"node_modules/dayjs/plugin/customParseFormat.js":[function(require,module,exports) {
var define;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.dayjs_plugin_customParseFormat=e()}(this,function(){"use strict";var t,e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},n=function(t,n){return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(t,r,i){var o=i&&i.toUpperCase();return r||n[i]||e[i]||n[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(t,e,n){return e||n.slice(1)})})},r=/(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,i=/\d\d/,o=/\d\d?/,s=/\d*[^\s\d-:/()]+/;var a=function(t){return function(e){this[t]=+e}},f=[/[+-]\d\d:?(\d\d)?/,function(t){(this.zone||(this.zone={})).offset=function(t){if(!t)return 0;var e=t.match(/([+-]|\d\d)/g),n=60*e[1]+(+e[2]||0);return 0===n?0:"+"===e[0]?-n:n}(t)}],u=function(e){var n=t[e];return n&&(n.indexOf?n:n.s.concat(n.f))},h=function(e,n){var r,i=t.meridiem;if(i){for(var o=1;o<=24;o+=1)if(e.indexOf(i(o,0,n))>-1){r=o>12;break}}else r=e===(n?"pm":"PM");return r},d={A:[s,function(t){this.afternoon=h(t,!1)}],a:[s,function(t){this.afternoon=h(t,!0)}],S:[/\d/,function(t){this.milliseconds=100*+t}],SS:[i,function(t){this.milliseconds=10*+t}],SSS:[/\d{3}/,function(t){this.milliseconds=+t}],s:[o,a("seconds")],ss:[o,a("seconds")],m:[o,a("minutes")],mm:[o,a("minutes")],H:[o,a("hours")],h:[o,a("hours")],HH:[o,a("hours")],hh:[o,a("hours")],D:[o,a("day")],DD:[i,a("day")],Do:[s,function(e){var n=t.ordinal,r=e.match(/\d+/);if(this.day=r[0],n)for(var i=1;i<=31;i+=1)n(i).replace(/\[|\]/g,"")===e&&(this.day=i)}],M:[o,a("month")],MM:[i,a("month")],MMM:[s,function(t){var e=u("months"),n=(u("monthsShort")||e.map(function(t){return t.substr(0,3)})).indexOf(t)+1;if(n<1)throw new Error;this.month=n%12||n}],MMMM:[s,function(t){var e=u("months").indexOf(t)+1;if(e<1)throw new Error;this.month=e%12||e}],Y:[/[+-]?\d+/,a("year")],YY:[i,function(t){t=+t,this.year=t+(t>68?1900:2e3)}],YYYY:[/\d{4}/,a("year")],Z:f,ZZ:f};var c=function(e,i,o){try{var s=function(e){for(var i=(e=n(e,t&&t.formats)).match(r),o=i.length,s=0;s<o;s+=1){var a=i[s],f=d[a],u=f&&f[0],h=f&&f[1];i[s]=h?{regex:u,parser:h}:a.replace(/^\[|\]$/g,"")}return function(t){for(var e={},n=0,r=0;n<o;n+=1){var s=i[n];if("string"==typeof s)r+=s.length;else{var a=s.regex,f=s.parser,u=t.substr(r),h=a.exec(u)[0];f.call(e,h),t=t.replace(h,"")}}return function(t){var e=t.afternoon;if(void 0!==e){var n=t.hours;e?n<12&&(t.hours+=12):12===n&&(t.hours=0),delete t.afternoon}}(e),e}}(i)(e),a=s.year,f=s.month,u=s.day,h=s.hours,c=s.minutes,m=s.seconds,l=s.milliseconds,M=s.zone,Y=new Date,v=u||(a||f?1:Y.getDate()),p=a||Y.getFullYear(),D=0;a&&!f||(D=f>0?f-1:Y.getMonth());var y=h||0,L=c||0,g=m||0,$=l||0;return M?new Date(Date.UTC(p,D,v,y,L,g,$+60*M.offset*1e3)):o?new Date(Date.UTC(p,D,v,y,L,g,$)):new Date(p,D,v,y,L,g,$)}catch(t){return new Date("")}};return function(e,n,r){r.p.customParseFormat=!0;var i=n.prototype,o=i.parse;i.parse=function(e){var n=e.date,i=e.utc,s=e.args;this.$u=i;var a=s[1];if("string"==typeof a){var f=!0===s[2],u=!0===s[3],h=f||u,d=s[2];u&&(d=s[2]),f||(t=d?r.Ls[d]:this.$locale()),this.$d=c(n,a,i),this.init(),d&&!0!==d&&(this.$L=this.locale(d).$L),h&&n!==this.format(a)&&(this.$d=new Date("")),t=void 0}else if(a instanceof Array)for(var m=a.length,l=1;l<=m;l+=1){s[1]=a[l-1];var M=r.apply(this,s);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}l===m&&(this.$d=new Date(""))}else o.call(this,e)}}});

},{}],"familytree.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getName = getName;
exports.getBirthInfo = getBirthInfo;
exports.processDate = processDate;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _localizedFormat = _interopRequireDefault(require("dayjs/plugin/localizedFormat"));

var _customParseFormat = _interopRequireDefault(require("dayjs/plugin/customParseFormat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_localizedFormat.default);

_dayjs.default.extend(_customParseFormat.default);

function getName(person) {
  var firstName = null;
  var lastName = null;
  person.tree.forEach(function (element) {
    if (element.tag === 'NAME') {
      var name = element.data;

      if (name.length !== 0) {
        // Check for forward slash (/) for last name, if missing, just use the first name
        var forwardSlash = name.match('^(.*?)/');

        if (forwardSlash === null) {
          firstName = name;
          lastName = 'Missing last name';
        } else {
          firstName = forwardSlash[0].slice(0, -2); // match everything between forward slashes, then remove starting and trailing slashes

          lastName = name.match('/.+/')[0].slice(1, -1);
        }
      } else {
        firstName = 'Missing first name';
        lastName = 'Missing last name';
      }
    }
  });
  return {
    firstName: firstName,
    lastName: lastName
  };
}

function getBirthInfo(person) {
  var birthPlace = null;
  var birthDate = null;
  person.tree.forEach(function (element) {
    if (element.tag === 'BIRT') {
      element.tree.forEach(function (item) {
        if (item.tag === 'PLAC') {
          birthPlace = item.data;
        }

        if (item.tag === 'DATE') {
          birthDate = item.data;
        }
      });
    }
  });
  return {
    birthPlace: birthPlace,
    birthDate: birthDate
  };
}

function processDate(date) {
  var exactlyYear = (0, _dayjs.default)(date, 'YYYY', true).isValid();
  var containsAbout = (0, _dayjs.default)(date, '[about] YYYY', true).isValid();
  var containsAbt = (0, _dayjs.default)(date, '[abt] YYYY', true).isValid();

  if (exactlyYear === true || containsAbout === true || containsAbt === true) {
    return (0, _dayjs.default)(date).format('YYYY');
  }

  return (0, _dayjs.default)(date).format('LL');
}
},{"dayjs":"node_modules/dayjs/esm/index.js","dayjs/plugin/localizedFormat":"node_modules/dayjs/plugin/localizedFormat.js","dayjs/plugin/customParseFormat":"node_modules/dayjs/plugin/customParseFormat.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62992" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","familytree.js"], null)
//# sourceMappingURL=/familytree.9291ab1e.js.map