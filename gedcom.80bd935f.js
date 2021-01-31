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
})({"node_modules/tree-crawl/dist/tree-crawl.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.crawl = factory();
})(this, function () {
  'use strict';

  function Context(flags, cursor) {
    this.flags = flags;
    this.cursor = cursor;
  }

  Context.prototype = {
    skip: function skip() {
      this.flags.skip = true;
    },
    break: function _break() {
      this.flags.break = true;
    },
    remove: function remove() {
      this.flags.remove = true;
    },
    replace: function replace(node) {
      this.flags.replace = node;
    },

    get parent() {
      return this.cursor.parent;
    },

    get depth() {
      return this.cursor.depth;
    },

    get level() {
      return this.cursor.depth + 1;
    },

    get index() {
      return this.cursor.index;
    }

  };

  function ContextFactory(flags, cursor) {
    return new Context(flags, cursor);
  }

  function Stack(initial) {
    this.xs = [initial];
    this.top = 0;
  }

  Stack.prototype = {
    push: function push(x) {
      this.top++;

      if (this.top < this.xs.length) {
        this.xs[this.top] = x;
      } else {
        this.xs.push(x);
      }
    },
    pushArrayReverse: function pushArrayReverse(xs) {
      for (var i = xs.length - 1; i >= 0; i--) {
        this.push(xs[i]);
      }
    },
    pop: function pop() {
      var x = this.peek();
      this.top--;
      return x;
    },
    peek: function peek() {
      return this.xs[this.top];
    },
    isEmpty: function isEmpty() {
      return -1 === this.top;
    }
  };

  function QueueFactory(initial) {
    return new Stack(initial);
  }

  function DfsCursor() {
    this.depth = 0;
    this.stack = QueueFactory({
      node: null,
      index: -1
    });
  }

  DfsCursor.prototype = {
    moveDown: function moveDown(node) {
      this.depth++;
      this.stack.push({
        node: node,
        index: 0
      });
    },
    moveUp: function moveUp() {
      this.depth--;
      this.stack.pop();
    },
    moveNext: function moveNext() {
      this.stack.peek().index++;
    },

    get parent() {
      return this.stack.peek().node;
    },

    get index() {
      return this.stack.peek().index;
    }

  };

  function CursorFactory() {
    return new DfsCursor();
  }

  function Flags() {
    this.break = false;
    this.skip = false;
    this.remove = false;
    this.replace = null;
  }

  Flags.prototype = {
    reset: function reset() {
      this.break = false;
      this.skip = false;
      this.remove = false;
      this.replace = null;
    }
  };

  function FlagsFactory() {
    return new Flags();
  }

  function isNotEmpty(xs) {
    return xs && 0 !== xs.length;
  }

  function dfsPre(root, iteratee, getChildren) {
    var flags = FlagsFactory();
    var cursor = CursorFactory();
    var context = ContextFactory(flags, cursor);
    var stack = QueueFactory(root);
    var dummy = Object.assign({}, root);

    while (!stack.isEmpty()) {
      var node = stack.pop();

      if (node === dummy) {
        cursor.moveUp();
        continue;
      }

      flags.reset();
      iteratee(node, context);
      if (flags.break) break;
      if (flags.remove) continue;
      cursor.moveNext();

      if (!flags.skip) {
        if (flags.replace) {
          node = flags.replace;
        }

        var children = getChildren(node);

        if (isNotEmpty(children)) {
          stack.push(dummy);
          stack.pushArrayReverse(children);
          cursor.moveDown(node);
        }
      }
    }
  }

  function dfsPost(root, iteratee, getChildren) {
    var flags = FlagsFactory();
    var cursor = CursorFactory();
    var context = ContextFactory(flags, cursor);
    var stack = QueueFactory(root);
    var ancestors = QueueFactory(null);

    while (!stack.isEmpty()) {
      var node = stack.peek();
      var parent = ancestors.peek();
      var children = getChildren(node);
      flags.reset();

      if (node === parent || !isNotEmpty(children)) {
        if (node === parent) {
          ancestors.pop();
          cursor.moveUp();
        }

        stack.pop();
        iteratee(node, context);
        if (flags.break) break;
        if (flags.remove) continue;
        cursor.moveNext();
      } else {
        ancestors.push(node);
        cursor.moveDown(node);
        stack.pushArrayReverse(children);
      }
    }
  }

  var THRESHOLD = 32768;

  function Queue(initial) {
    this.xs = [initial];
    this.top = 0;
    this.maxLength = 0;
  }

  Queue.prototype = {
    enqueue: function enqueue(x) {
      this.xs.push(x);
    },
    enqueueMultiple: function enqueueMultiple(xs) {
      for (var i = 0, len = xs.length; i < len; i++) {
        this.enqueue(xs[i]);
      }
    },
    dequeue: function dequeue() {
      var x = this.peek();
      this.top++;

      if (this.top === THRESHOLD) {
        this.xs = this.xs.slice(this.top);
        this.top = 0;
      }

      return x;
    },
    peek: function peek() {
      return this.xs[this.top];
    },
    isEmpty: function isEmpty() {
      return this.top === this.xs.length;
    }
  };

  function QueueFactory$1(initial) {
    return new Queue(initial);
  }

  function BfsCursor() {
    this.depth = 0;
    this.index = -1;
    this.queue = QueueFactory$1({
      node: null,
      arity: 1
    });
    this.levelNodes = 1;
    this.nextLevelNodes = 0;
  }

  BfsCursor.prototype = {
    store: function store(node, arity) {
      this.queue.enqueue({
        node: node,
        arity: arity
      });
      this.nextLevelNodes += arity;
    },
    moveNext: function moveNext() {
      this.index++;
    },
    moveForward: function moveForward() {
      this.queue.peek().arity--;
      this.levelNodes--;

      if (0 === this.queue.peek().arity) {
        this.index = 0;
        this.queue.dequeue();
      }

      if (0 === this.levelNodes) {
        this.depth++;
        this.levelNodes = this.nextLevelNodes;
        this.nextLevelNodes = 0;
      }
    },

    get parent() {
      return this.queue.peek().node;
    }

  };

  function CursorFactory$1() {
    return new BfsCursor();
  }

  function bfs(root, iteratee, getChildren) {
    var flags = FlagsFactory();
    var cursor = CursorFactory$1();
    var context = ContextFactory(flags, cursor);
    var queue = QueueFactory$1(root);

    while (!queue.isEmpty()) {
      var node = queue.dequeue();
      flags.reset();
      iteratee(node, context);
      if (flags.break) break;

      if (!flags.remove) {
        cursor.moveNext();

        if (flags.replace) {
          node = flags.replace;
        }

        if (!flags.skip) {
          var children = getChildren(node);

          if (isNotEmpty(children)) {
            queue.enqueueMultiple(children);
            cursor.store(node, children.length);
          }
        }
      }

      cursor.moveForward();
    }
  }

  var defaultGetChildren = function defaultGetChildren(node) {
    return node.children;
  };

  function crawl(root, iteratee, options) {
    if (null == root) return;
    options = options || {};
    var order = options.order || 'pre';
    var getChildren = options.getChildren || defaultGetChildren;

    if ('pre' === order) {
      dfsPre(root, iteratee, getChildren);
    } else if ('post' === order) {
      dfsPost(root, iteratee, getChildren);
    } else if ('bfs' === order) {
      bfs(root, iteratee, getChildren);
    }
  }

  return crawl;
});
},{}],"node_modules/parse-gedcom/d3ize.js":[function(require,module,exports) {
function hasTag(val) {
    return function(node) {
        return node.tag === val;
    };
}

function d3ize(tree) {
    var peopleNodes = tree
        .filter(hasTag('INDI'))
        .map(toNode);
    var families = tree.filter(hasTag('FAM'));
    var familyNodes = families.map(toNode);
    var links = families.reduce(function(memo, family) {
        return memo.concat(familyLinks(family));
    }, []);
    var allNodes = peopleNodes.concat(familyNodes);
    var indexedNodes = allNodes.reduce(function(memo, node, i) {
        memo[node.id] = i;
        return memo;
    }, {});
    links = links.map(idToIndex(indexedNodes));
    return {
        nodes: allNodes,
        links: links
    };
}

function getName(p) {
    if (p.tag === 'INDI') {
        var nameNode = (p.tree.filter(hasTag('NAME')) || [])[0];
        if (nameNode) {
            return nameNode.data.replace(/\//g, '');
        } else {
            return '?';
        }
    } else {
        return 'Family';
    }
}

function toNode(p) {
    p.id = p.pointer;
    p.name = getName(p);
    return p;
}

function idToIndex(indexedNodes) {
    return function(link) {
        function getIndexed(id) {
            return indexedNodes[id];
        }
        return {
            source: getIndexed(link.source),
            target: getIndexed(link.target)
        };
    };
}

function familyLinks(family) {
    var memberLinks = family.tree.filter(function(member) {
        // avoid connecting MARR, etc: things that are not
        // people.
        return member.data && member.data[0] === '@';
    }).map(function(member) {
        return {
            source: family.pointer,
            target: member.data
        };
    });
    return memberLinks;
}

module.exports = d3ize;

},{}],"node_modules/parse-gedcom/index.js":[function(require,module,exports) {
var crawl = require('tree-crawl');

// from https://github.com/madprime/python-gedcom/blob/master/gedcom/__init__.py
// * Level must start with nonnegative int, no leading zeros.
// * Pointer optional, if it exists it must be flanked by '@'
// * Tag must be alphanumeric string
// * Value optional, consists of anything after a space to end of line
//   End of line defined by \n or \r
var lineRe = /\s*(0|[1-9]+[0-9]*) (@[^@]+@ |)([A-Za-z0-9_]+)( [^\n\r]*|)/;

function parse(input) {
    var start = { root: { tree: [] }, level: 0 };
    start.pointer = start.root;

    var data = input
        .split('\n')
        .map(mapLine)
        .filter(function(_) { return _; })
        .reduce(buildTree, start)
        .root;

    crawl(data, cleanUp, { getChildren });
    return data.tree;

    // the basic trick of this module is turning the suggested tree
    // structure of a GEDCOM file into a tree in JSON. This reduction
    // does that. The only real trick is the `.up` member of objects
    // that points to a level up in the structure. This we have to
    // censor before JSON.stringify since it creates circular references.
    function buildTree(memo, data) {
        if (data.level === memo.level) {
            memo.pointer.tree.push(data);
        } else if (data.level > memo.level) {
            var up = memo.pointer;
            memo.pointer = memo.pointer.tree[
                memo.pointer.tree.length - 1];
                memo.pointer.tree.push(data);
                memo.pointer.up = up;
                memo.level = data.level;
        } else if (data.level < memo.level) {
            // the jump up in the stack may be by more than one, so ascend
            // until we're at the right level.
            while (data.level <= memo.pointer.level && memo.pointer.up) {
                memo.pointer = memo.pointer.up;
            }
            memo.pointer.tree.push(data);
            memo.level = data.level;
        }
        return memo;
    }

    function mapLine(data) {
        var match = data.match(lineRe);
        if (!match) return null;
        return {
            level: parseInt(match[1], 10),
            pointer: match[2].trim(),
            tag: match[3].trim(),
            data: match[4].trimLeft(),
            tree: []
        };
    }

    function cleanUp(node) {
        delete node.up;
        delete node.level;
    }

    function getChildren(node) {
        return node.tree;
    }
}

module.exports.parse = parse;
module.exports.d3ize = require('./d3ize');

},{"tree-crawl":"node_modules/tree-crawl/dist/tree-crawl.js","./d3ize":"node_modules/parse-gedcom/d3ize.js"}],"gedcom.js":[function(require,module,exports) {
"use strict";

var _parseGedcom = _interopRequireDefault(require("parse-gedcom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"parse-gedcom":"node_modules/parse-gedcom/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63564" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","gedcom.js"], null)
//# sourceMappingURL=/gedcom.80bd935f.js.map