(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('Simpla', factory) :
    (global.Simpla = factory());
}(this, (function () { 'use strict';

var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd() {
    return '/';
}
function chdir(dir) {
    throw new Error('process.chdir is not supported');
}
function umask() {
    return 0;
}

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
    return new Date().getTime();
};

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp) {
    var clocktime = performanceNow.call(performance) * 1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor(clocktime % 1 * 1e9);
    if (previousTimestamp) {
        seconds = seconds - previousTimestamp[0];
        nanoseconds = nanoseconds - previousTimestamp[1];
        if (nanoseconds < 0) {
            seconds--;
            nanoseconds += 1e9;
        }
    }
    return [seconds, nanoseconds];
}

var startTime = new Date();
function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
}

var process = {
    nextTick: nextTick,
    title: title,
    browser: browser,
    env: env,
    argv: argv,
    version: version,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform,
    release: release,
    config: config,
    uptime: uptime
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}



function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var es6Promise = createCommonjsModule(function (module, exports) {
  /*!
   * @overview es6-promise - a tiny implementation of Promises/A+.
   * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
   * @license   Licensed under MIT license
   *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
   * @version   4.1.0
   */

  (function (global, factory) {
    'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory() : typeof undefined === 'function' && undefined.amd ? undefined(factory) : global.ES6Promise = factory();
  })(commonjsGlobal, function () {
    'use strict';

    function objectOrFunction(x) {
      return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
    }

    function isFunction(x) {
      return typeof x === 'function';
    }

    var _isArray = undefined;
    if (!Array.isArray) {
      _isArray = function _isArray(x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      };
    } else {
      _isArray = Array.isArray;
    }

    var isArray = _isArray;

    var len = 0;
    var vertxNext = undefined;
    var customSchedulerFn = undefined;

    var asap = function asap(callback, arg) {
      queue[len] = callback;
      queue[len + 1] = arg;
      len += 2;
      if (len === 2) {
        // If len is 2, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        if (customSchedulerFn) {
          customSchedulerFn(flush);
        } else {
          scheduleFlush();
        }
      }
    };

    function setScheduler(scheduleFn) {
      customSchedulerFn = scheduleFn;
    }

    function setAsap(asapFn) {
      asap = asapFn;
    }

    var browserWindow = typeof window !== 'undefined' ? window : undefined;
    var browserGlobal = browserWindow || {};
    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
    var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

    // test for web worker but not in IE10
    var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

    // node
    function useNextTick() {
      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
      // see https://github.com/cujojs/when/issues/410 for details
      return function () {
        return nextTick(flush);
      };
    }

    // vertx
    function useVertxTimer() {
      if (typeof vertxNext !== 'undefined') {
        return function () {
          vertxNext(flush);
        };
      }

      return useSetTimeout();
    }

    function useMutationObserver() {
      var iterations = 0;
      var observer = new BrowserMutationObserver(flush);
      var node = document.createTextNode('');
      observer.observe(node, { characterData: true });

      return function () {
        node.data = iterations = ++iterations % 2;
      };
    }

    // web worker
    function useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = flush;
      return function () {
        return channel.port2.postMessage(0);
      };
    }

    function useSetTimeout() {
      // Store setTimeout reference so es6-promise will be unaffected by
      // other code modifying setTimeout (like sinon.useFakeTimers())
      var globalSetTimeout = setTimeout;
      return function () {
        return globalSetTimeout(flush, 1);
      };
    }

    var queue = new Array(1000);
    function flush() {
      for (var i = 0; i < len; i += 2) {
        var callback = queue[i];
        var arg = queue[i + 1];

        callback(arg);

        queue[i] = undefined;
        queue[i + 1] = undefined;
      }

      len = 0;
    }

    function attemptVertx() {
      try {
        var r = commonjsRequire;
        var vertx = r('vertx');
        vertxNext = vertx.runOnLoop || vertx.runOnContext;
        return useVertxTimer();
      } catch (e) {
        return useSetTimeout();
      }
    }

    var scheduleFlush = undefined;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (isNode) {
      scheduleFlush = useNextTick();
    } else if (BrowserMutationObserver) {
      scheduleFlush = useMutationObserver();
    } else if (isWorker) {
      scheduleFlush = useMessageChannel();
    } else if (browserWindow === undefined && typeof commonjsRequire === 'function') {
      scheduleFlush = attemptVertx();
    } else {
      scheduleFlush = useSetTimeout();
    }

    function then(onFulfillment, onRejection) {
      var _arguments = arguments;

      var parent = this;

      var child = new this.constructor(noop);

      if (child[PROMISE_ID] === undefined) {
        makePromise(child);
      }

      var _state = parent._state;

      if (_state) {
        (function () {
          var callback = _arguments[_state - 1];
          asap(function () {
            return invokeCallback(_state, child, callback, parent._result);
          });
        })();
      } else {
        subscribe(parent, child, onFulfillment, onRejection);
      }

      return child;
    }

    /**
      `Promise.resolve` returns a promise that will become resolved with the
      passed `value`. It is shorthand for the following:
    
      ```javascript
      let promise = new Promise(function(resolve, reject){
        resolve(1);
      });
    
      promise.then(function(value){
        // value === 1
      });
      ```
    
      Instead of writing the above, your code now simply becomes the following:
    
      ```javascript
      let promise = Promise.resolve(1);
    
      promise.then(function(value){
        // value === 1
      });
      ```
    
      @method resolve
      @static
      @param {Any} value value that the returned promise will be resolved with
      Useful for tooling.
      @return {Promise} a promise that will become fulfilled with the given
      `value`
    */
    function resolve(object) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor(noop);
      _resolve(promise, object);
      return promise;
    }

    var PROMISE_ID = Math.random().toString(36).substring(16);

    function noop() {}

    var PENDING = void 0;
    var FULFILLED = 1;
    var REJECTED = 2;

    var GET_THEN_ERROR = new ErrorObject();

    function selfFulfillment() {
      return new TypeError("You cannot resolve a promise with itself");
    }

    function cannotReturnOwn() {
      return new TypeError('A promises callback cannot return that same promise.');
    }

    function getThen(promise) {
      try {
        return promise.then;
      } catch (error) {
        GET_THEN_ERROR.error = error;
        return GET_THEN_ERROR;
      }
    }

    function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
      try {
        then.call(value, fulfillmentHandler, rejectionHandler);
      } catch (e) {
        return e;
      }
    }

    function handleForeignThenable(promise, thenable, then) {
      asap(function (promise) {
        var sealed = false;
        var error = tryThen(then, thenable, function (value) {
          if (sealed) {
            return;
          }
          sealed = true;
          if (thenable !== value) {
            _resolve(promise, value);
          } else {
            fulfill(promise, value);
          }
        }, function (reason) {
          if (sealed) {
            return;
          }
          sealed = true;

          _reject(promise, reason);
        }, 'Settle: ' + (promise._label || ' unknown promise'));

        if (!sealed && error) {
          sealed = true;
          _reject(promise, error);
        }
      }, promise);
    }

    function handleOwnThenable(promise, thenable) {
      if (thenable._state === FULFILLED) {
        fulfill(promise, thenable._result);
      } else if (thenable._state === REJECTED) {
        _reject(promise, thenable._result);
      } else {
        subscribe(thenable, undefined, function (value) {
          return _resolve(promise, value);
        }, function (reason) {
          return _reject(promise, reason);
        });
      }
    }

    function handleMaybeThenable(promise, maybeThenable, then$$) {
      if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
        handleOwnThenable(promise, maybeThenable);
      } else {
        if (then$$ === GET_THEN_ERROR) {
          _reject(promise, GET_THEN_ERROR.error);
          GET_THEN_ERROR.error = null;
        } else if (then$$ === undefined) {
          fulfill(promise, maybeThenable);
        } else if (isFunction(then$$)) {
          handleForeignThenable(promise, maybeThenable, then$$);
        } else {
          fulfill(promise, maybeThenable);
        }
      }
    }

    function _resolve(promise, value) {
      if (promise === value) {
        _reject(promise, selfFulfillment());
      } else if (objectOrFunction(value)) {
        handleMaybeThenable(promise, value, getThen(value));
      } else {
        fulfill(promise, value);
      }
    }

    function publishRejection(promise) {
      if (promise._onerror) {
        promise._onerror(promise._result);
      }

      publish(promise);
    }

    function fulfill(promise, value) {
      if (promise._state !== PENDING) {
        return;
      }

      promise._result = value;
      promise._state = FULFILLED;

      if (promise._subscribers.length !== 0) {
        asap(publish, promise);
      }
    }

    function _reject(promise, reason) {
      if (promise._state !== PENDING) {
        return;
      }
      promise._state = REJECTED;
      promise._result = reason;

      asap(publishRejection, promise);
    }

    function subscribe(parent, child, onFulfillment, onRejection) {
      var _subscribers = parent._subscribers;
      var length = _subscribers.length;

      parent._onerror = null;

      _subscribers[length] = child;
      _subscribers[length + FULFILLED] = onFulfillment;
      _subscribers[length + REJECTED] = onRejection;

      if (length === 0 && parent._state) {
        asap(publish, parent);
      }
    }

    function publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if (subscribers.length === 0) {
        return;
      }

      var child = undefined,
          callback = undefined,
          detail = promise._result;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
          invokeCallback(settled, child, callback, detail);
        } else {
          callback(detail);
        }
      }

      promise._subscribers.length = 0;
    }

    function ErrorObject() {
      this.error = null;
    }

    var TRY_CATCH_ERROR = new ErrorObject();

    function tryCatch(callback, detail) {
      try {
        return callback(detail);
      } catch (e) {
        TRY_CATCH_ERROR.error = e;
        return TRY_CATCH_ERROR;
      }
    }

    function invokeCallback(settled, promise, callback, detail) {
      var hasCallback = isFunction(callback),
          value = undefined,
          error = undefined,
          succeeded = undefined,
          failed = undefined;

      if (hasCallback) {
        value = tryCatch(callback, detail);

        if (value === TRY_CATCH_ERROR) {
          failed = true;
          error = value.error;
          value.error = null;
        } else {
          succeeded = true;
        }

        if (promise === value) {
          _reject(promise, cannotReturnOwn());
          return;
        }
      } else {
        value = detail;
        succeeded = true;
      }

      if (promise._state !== PENDING) {
        // noop
      } else if (hasCallback && succeeded) {
        _resolve(promise, value);
      } else if (failed) {
        _reject(promise, error);
      } else if (settled === FULFILLED) {
        fulfill(promise, value);
      } else if (settled === REJECTED) {
        _reject(promise, value);
      }
    }

    function initializePromise(promise, resolver) {
      try {
        resolver(function resolvePromise(value) {
          _resolve(promise, value);
        }, function rejectPromise(reason) {
          _reject(promise, reason);
        });
      } catch (e) {
        _reject(promise, e);
      }
    }

    var id = 0;
    function nextId() {
      return id++;
    }

    function makePromise(promise) {
      promise[PROMISE_ID] = id++;
      promise._state = undefined;
      promise._result = undefined;
      promise._subscribers = [];
    }

    function Enumerator(Constructor, input) {
      this._instanceConstructor = Constructor;
      this.promise = new Constructor(noop);

      if (!this.promise[PROMISE_ID]) {
        makePromise(this.promise);
      }

      if (isArray(input)) {
        this._input = input;
        this.length = input.length;
        this._remaining = input.length;

        this._result = new Array(this.length);

        if (this.length === 0) {
          fulfill(this.promise, this._result);
        } else {
          this.length = this.length || 0;
          this._enumerate();
          if (this._remaining === 0) {
            fulfill(this.promise, this._result);
          }
        }
      } else {
        _reject(this.promise, validationError());
      }
    }

    function validationError() {
      return new Error('Array Methods must be provided an Array');
    }

    Enumerator.prototype._enumerate = function () {
      var length = this.length;
      var _input = this._input;

      for (var i = 0; this._state === PENDING && i < length; i++) {
        this._eachEntry(_input[i], i);
      }
    };

    Enumerator.prototype._eachEntry = function (entry, i) {
      var c = this._instanceConstructor;
      var resolve$$ = c.resolve;

      if (resolve$$ === resolve) {
        var _then = getThen(entry);

        if (_then === then && entry._state !== PENDING) {
          this._settledAt(entry._state, i, entry._result);
        } else if (typeof _then !== 'function') {
          this._remaining--;
          this._result[i] = entry;
        } else if (c === Promise) {
          var promise = new c(noop);
          handleMaybeThenable(promise, entry, _then);
          this._willSettleAt(promise, i);
        } else {
          this._willSettleAt(new c(function (resolve$$) {
            return resolve$$(entry);
          }), i);
        }
      } else {
        this._willSettleAt(resolve$$(entry), i);
      }
    };

    Enumerator.prototype._settledAt = function (state, i, value) {
      var promise = this.promise;

      if (promise._state === PENDING) {
        this._remaining--;

        if (state === REJECTED) {
          _reject(promise, value);
        } else {
          this._result[i] = value;
        }
      }

      if (this._remaining === 0) {
        fulfill(promise, this._result);
      }
    };

    Enumerator.prototype._willSettleAt = function (promise, i) {
      var enumerator = this;

      subscribe(promise, undefined, function (value) {
        return enumerator._settledAt(FULFILLED, i, value);
      }, function (reason) {
        return enumerator._settledAt(REJECTED, i, reason);
      });
    };

    /**
      `Promise.all` accepts an array of promises, and returns a new promise which
      is fulfilled with an array of fulfillment values for the passed promises, or
      rejected with the reason of the first passed promise to be rejected. It casts all
      elements of the passed iterable to promises as it runs this algorithm.
    
      Example:
    
      ```javascript
      let promise1 = resolve(1);
      let promise2 = resolve(2);
      let promise3 = resolve(3);
      let promises = [ promise1, promise2, promise3 ];
    
      Promise.all(promises).then(function(array){
        // The array here would be [ 1, 2, 3 ];
      });
      ```
    
      If any of the `promises` given to `all` are rejected, the first promise
      that is rejected will be given as an argument to the returned promises's
      rejection handler. For example:
    
      Example:
    
      ```javascript
      let promise1 = resolve(1);
      let promise2 = reject(new Error("2"));
      let promise3 = reject(new Error("3"));
      let promises = [ promise1, promise2, promise3 ];
    
      Promise.all(promises).then(function(array){
        // Code here never runs because there are rejected promises!
      }, function(error) {
        // error.message === "2"
      });
      ```
    
      @method all
      @static
      @param {Array} entries array of promises
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise} promise that is fulfilled when all `promises` have been
      fulfilled, or rejected if any of them become rejected.
      @static
    */
    function all(entries) {
      return new Enumerator(this, entries).promise;
    }

    /**
      `Promise.race` returns a new promise which is settled in the same way as the
      first passed promise to settle.
    
      Example:
    
      ```javascript
      let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 1');
        }, 200);
      });
    
      let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 2');
        }, 100);
      });
    
      Promise.race([promise1, promise2]).then(function(result){
        // result === 'promise 2' because it was resolved before promise1
        // was resolved.
      });
      ```
    
      `Promise.race` is deterministic in that only the state of the first
      settled promise matters. For example, even if other promises given to the
      `promises` array argument are resolved, but the first settled promise has
      become rejected before the other promises became fulfilled, the returned
      promise will become rejected:
    
      ```javascript
      let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 1');
        }, 200);
      });
    
      let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
          reject(new Error('promise 2'));
        }, 100);
      });
    
      Promise.race([promise1, promise2]).then(function(result){
        // Code here never runs
      }, function(reason){
        // reason.message === 'promise 2' because promise 2 became rejected before
        // promise 1 became fulfilled
      });
      ```
    
      An example real-world use case is implementing timeouts:
    
      ```javascript
      Promise.race([ajax('foo.json'), timeout(5000)])
      ```
    
      @method race
      @static
      @param {Array} promises array of promises to observe
      Useful for tooling.
      @return {Promise} a promise which settles in the same way as the first passed
      promise to settle.
    */
    function race(entries) {
      /*jshint validthis:true */
      var Constructor = this;

      if (!isArray(entries)) {
        return new Constructor(function (_, reject) {
          return reject(new TypeError('You must pass an array to race.'));
        });
      } else {
        return new Constructor(function (resolve, reject) {
          var length = entries.length;
          for (var i = 0; i < length; i++) {
            Constructor.resolve(entries[i]).then(resolve, reject);
          }
        });
      }
    }

    /**
      `Promise.reject` returns a promise rejected with the passed `reason`.
      It is shorthand for the following:
    
      ```javascript
      let promise = new Promise(function(resolve, reject){
        reject(new Error('WHOOPS'));
      });
    
      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```
    
      Instead of writing the above, your code now simply becomes the following:
    
      ```javascript
      let promise = Promise.reject(new Error('WHOOPS'));
    
      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```
    
      @method reject
      @static
      @param {Any} reason value that the returned promise will be rejected with.
      Useful for tooling.
      @return {Promise} a promise rejected with the given `reason`.
    */
    function reject(reason) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor(noop);
      _reject(promise, reason);
      return promise;
    }

    function needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise's eventual value or the reason
      why the promise cannot be fulfilled.
    
      Terminology
      -----------
    
      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.
    
      A promise can be in one of three states: pending, fulfilled, or rejected.
    
      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.
    
      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.
    
    
      Basic Usage:
      ------------
    
      ```js
      let promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);
    
        // on failure
        reject(reason);
      });
    
      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```
    
      Advanced Usage:
      ---------------
    
      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.
    
      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          let xhr = new XMLHttpRequest();
    
          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();
    
          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }
    
      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```
    
      Unlike callbacks, promises are great composable primitives.
    
      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON
    
        return values;
      });
      ```
    
      @class Promise
      @param {function} resolver
      Useful for tooling.
      @constructor
    */
    function Promise(resolver) {
      this[PROMISE_ID] = nextId();
      this._result = this._state = undefined;
      this._subscribers = [];

      if (noop !== resolver) {
        typeof resolver !== 'function' && needsResolver();
        this instanceof Promise ? initializePromise(this, resolver) : needsNew();
      }
    }

    Promise.all = all;
    Promise.race = race;
    Promise.resolve = resolve;
    Promise.reject = reject;
    Promise._setScheduler = setScheduler;
    Promise._setAsap = setAsap;
    Promise._asap = asap;

    Promise.prototype = {
      constructor: Promise,

      /**
        The primary way of interacting with a promise is through its `then` method,
        which registers callbacks to receive either a promise's eventual value or the
        reason why the promise cannot be fulfilled.
      
        ```js
        findUser().then(function(user){
          // user is available
        }, function(reason){
          // user is unavailable, and you are given the reason why
        });
        ```
      
        Chaining
        --------
      
        The return value of `then` is itself a promise.  This second, 'downstream'
        promise is resolved with the return value of the first promise's fulfillment
        or rejection handler, or rejected if the handler throws an exception.
      
        ```js
        findUser().then(function (user) {
          return user.name;
        }, function (reason) {
          return 'default name';
        }).then(function (userName) {
          // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
          // will be `'default name'`
        });
      
        findUser().then(function (user) {
          throw new Error('Found user, but still unhappy');
        }, function (reason) {
          throw new Error('`findUser` rejected and we're unhappy');
        }).then(function (value) {
          // never reached
        }, function (reason) {
          // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
          // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
        });
        ```
        If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
      
        ```js
        findUser().then(function (user) {
          throw new PedagogicalException('Upstream error');
        }).then(function (value) {
          // never reached
        }).then(function (value) {
          // never reached
        }, function (reason) {
          // The `PedgagocialException` is propagated all the way down to here
        });
        ```
      
        Assimilation
        ------------
      
        Sometimes the value you want to propagate to a downstream promise can only be
        retrieved asynchronously. This can be achieved by returning a promise in the
        fulfillment or rejection handler. The downstream promise will then be pending
        until the returned promise is settled. This is called *assimilation*.
      
        ```js
        findUser().then(function (user) {
          return findCommentsByAuthor(user);
        }).then(function (comments) {
          // The user's comments are now available
        });
        ```
      
        If the assimliated promise rejects, then the downstream promise will also reject.
      
        ```js
        findUser().then(function (user) {
          return findCommentsByAuthor(user);
        }).then(function (comments) {
          // If `findCommentsByAuthor` fulfills, we'll have the value here
        }, function (reason) {
          // If `findCommentsByAuthor` rejects, we'll have the reason here
        });
        ```
      
        Simple Example
        --------------
      
        Synchronous Example
      
        ```javascript
        let result;
      
        try {
          result = findResult();
          // success
        } catch(reason) {
          // failure
        }
        ```
      
        Errback Example
      
        ```js
        findResult(function(result, err){
          if (err) {
            // failure
          } else {
            // success
          }
        });
        ```
      
        Promise Example;
      
        ```javascript
        findResult().then(function(result){
          // success
        }, function(reason){
          // failure
        });
        ```
      
        Advanced Example
        --------------
      
        Synchronous Example
      
        ```javascript
        let author, books;
      
        try {
          author = findAuthor();
          books  = findBooksByAuthor(author);
          // success
        } catch(reason) {
          // failure
        }
        ```
      
        Errback Example
      
        ```js
      
        function foundBooks(books) {
      
        }
      
        function failure(reason) {
      
        }
      
        findAuthor(function(author, err){
          if (err) {
            failure(err);
            // failure
          } else {
            try {
              findBoooksByAuthor(author, function(books, err) {
                if (err) {
                  failure(err);
                } else {
                  try {
                    foundBooks(books);
                  } catch(reason) {
                    failure(reason);
                  }
                }
              });
            } catch(error) {
              failure(err);
            }
            // success
          }
        });
        ```
      
        Promise Example;
      
        ```javascript
        findAuthor().
          then(findBooksByAuthor).
          then(function(books){
            // found books
        }).catch(function(reason){
          // something went wrong
        });
        ```
      
        @method then
        @param {Function} onFulfilled
        @param {Function} onRejected
        Useful for tooling.
        @return {Promise}
      */
      then: then,

      /**
        `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
        as the catch block of a try/catch statement.
      
        ```js
        function findAuthor(){
          throw new Error('couldn't find that author');
        }
      
        // synchronous
        try {
          findAuthor();
        } catch(reason) {
          // something went wrong
        }
      
        // async with promises
        findAuthor().catch(function(reason){
          // something went wrong
        });
        ```
      
        @method catch
        @param {Function} onRejection
        Useful for tooling.
        @return {Promise}
      */
      'catch': function _catch(onRejection) {
        return this.then(null, onRejection);
      }
    };

    function polyfill() {
      var local = undefined;

      if (typeof commonjsGlobal !== 'undefined') {
        local = commonjsGlobal;
      } else if (typeof self !== 'undefined') {
        local = self;
      } else {
        try {
          local = Function('return this')();
        } catch (e) {
          throw new Error('polyfill failed because global object is unavailable in this environment');
        }
      }

      var P = local.Promise;

      if (P) {
        var promiseToString = null;
        try {
          promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
          // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
          return;
        }
      }

      local.Promise = Promise;
    }

    // Strange compat..
    Promise.polyfill = polyfill;
    Promise.Promise = Promise;

    return Promise;
  });
  });

var auto = es6Promise.polyfill();

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global$1 === 'undefined' ? 'undefined' : _typeof(global$1)) == 'object' && global$1 && global$1.Object === Object && global$1;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var _Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */
var root$2;

if (typeof self !== 'undefined') {
  root$2 = self;
} else if (typeof window !== 'undefined') {
  root$2 = window;
} else if (typeof global$1 !== 'undefined') {
  root$2 = global$1;
} else if (typeof module !== 'undefined') {
  root$2 = module;
} else {
  root$2 = Function('return this')();
}

var result = symbolObservablePonyfill(root$2);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'
};

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/zenparsing/es-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[result] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[result] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var sanityError;
  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    if (sanityError) {
      throw sanityError;
    }

    var hasChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  var last = funcs[funcs.length - 1];
  var rest = funcs.slice(0, -1);
  return function () {
    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}

var _extends$1 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(undefined, chain)(store.dispatch);

      return _extends$1({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if ("production" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

// Imports




// Options
var SET_OPTION = 'set-option';

// Authentication
var LOGIN = 'login';
var LOGIN_SUCCESSFUL = 'login-successful';
var LOGIN_FAILED = 'login-failed';

var LOGOUT = 'logout';
var LOGOUT_SUCCESSFUL = 'logout-successful';


// Saving
var SAVE = 'save';
var SAVE_SUCCESSFUL = 'save-successful';
var SAVE_FAILED = 'save-failed';

// Data
var FIND_DATA = 'find-data';
var FIND_DATA_SUCCESSFUL = 'find-data-successful';


var GET_DATA = 'get-data';
var GET_DATA_SUCCESSFUL = 'get-data-successful';


var SET_DATA = 'set-data';
var SET_DATA_SUCCESSFUL = 'set-data-successful';
var SET_DATA_FAILED = 'set-data-failed';

var REMOVE_DATA = 'remove-data';
var REMOVE_DATA_SUCCESSFUL = 'remove-data-successful';


// Data + API
var FIND_DATA_FROM_API = 'find-data-from-api';
var FIND_DATA_FROM_API_SUCCESSFUL = 'find-data-from-api-successful';
var FIND_DATA_FROM_API_FAILED = 'find-data-from-api-failed';

var GET_DATA_FROM_API = 'get-data-from-api';
var GET_DATA_FROM_API_SUCCESSFUL = 'get-data-from-api-successful';
var GET_DATA_FROM_API_FAILED = 'get-data-from-api-failed';

var SET_DATA_TO_API = 'set-data-to-api';
var SET_DATA_TO_API_SUCCESSFUL = 'set-data-to-api-successful';
var SET_DATA_TO_API_FAILED = 'set-data-to-api-failed';

var REMOVE_DATA_FROM_API = 'remove-data-from-api';
var REMOVE_DATA_FROM_API_SUCCESSFUL = 'remove-data-from-api-successful';
var REMOVE_DATA_FROM_API_FAILED = 'remove-data-from-api-failed';

// Editable
var EDIT_ACTIVE = 'edit-active';
var EDIT_INACTIVE = 'edit-inactive';

// Querying
var OBSERVE_QUERY = 'observe-query';

function setOption(prop, value) {
  return {
    type: SET_OPTION,
    prop: prop,
    value: value
  };
}

function editActive() {
  return {
    type: EDIT_ACTIVE
  };
}

function editInactive() {
  return {
    type: EDIT_INACTIVE
  };
}

var index = typeof fetch == 'function' ? fetch : function (url, options) {
	options = options || {};
	return new Promise(function (resolve, reject) {
		var request = new XMLHttpRequest();

		request.open(options.method || 'get', url);

		for (var i in options.headers) {
			request.setRequestHeader(i, options.headers[i]);
		}

		request.withCredentials = options.credentials == 'include';

		request.onload = function () {
			resolve(response());
		};

		request.onerror = reject;

		request.send(options.body);

		function response() {
			var _keys = [],
			    all = [],
			    headers = {},
			    header;

			request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, function (m, key, value) {
				_keys.push(key = key.toLowerCase());
				all.push([key, value]);
				header = headers[key];
				headers[key] = header ? header + "," + value : value;
			});

			return {
				ok: (request.status / 200 | 0) == 1, // 200-399
				status: request.status,
				statusText: request.statusText,
				url: request.responseURL,
				clone: response,
				text: function text() {
					return Promise.resolve(request.responseText);
				},
				json: function json() {
					return Promise.resolve(request.responseText).then(JSON.parse);
				},
				xml: function xml() {
					return Promise.resolve(request.responseXML);
				},
				blob: function blob() {
					return Promise.resolve(new Blob([request.response]));
				},
				headers: {
					keys: function keys() {
						return _keys;
					},
					entries: function entries() {
						return all;
					},
					get: function get(n) {
						return headers[n.toLowerCase()];
					},
					has: function has(n) {
						return n.toLowerCase() in headers;
					}
				}
			};
		}
	});
};




var unfetch_es = Object.freeze({
	default: index
});

var require$$0$1 = ( unfetch_es && unfetch_es['default'] ) || unfetch_es;

if (!window.fetch) window.fetch = require$$0$1.default || require$$0$1;

/**
 * Check Status and request courtesy of feathers-rest
 * See https://github.com/feathersjs/feathers-rest/blob/master/src/client/fetch.js
 */
function checkStatus(response) {
  if (response.ok) {
    return response;
  }

  return Promise.resolve().then(function () {
    return response.json();
  }).then(function (error) {
    error.code = error.code || response.status;
    error.statusText = error.statusText || response.statusText;
    return Promise.reject(error);
  });
}

function request(options) {
  var fetchOptions = _extends({}, options);

  fetchOptions.headers = _extends({
    Accept: 'application/json'
  }, fetchOptions.headers);

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
    fetchOptions.headers = _extends({
      'Content-Type': 'application/json'
    }, fetchOptions.headers);
  }

  return fetch(options.url, fetchOptions).then(checkStatus).then(function (response) {
    return response.status === 204 ? null : response.json();
  });
}

function requestWithToken(options) {
  var token = options.token;

  if (token) {
    options.headers = _extends({
      'Authorization': 'Bearer ' + token
    }, options.headers);
  }

  return request(options);
}

var client = {
  get: function get(url, options) {
    return request(_extends({ method: 'GET' }, options, { url: url }));
  },
  post: function post(url, options) {
    return requestWithToken(_extends({ method: 'POST' }, options, { url: url }));
  },
  put: function put(url, options) {
    return requestWithToken(_extends({ method: 'PUT' }, options, { url: url }));
  },
  delete: function _delete(url, options) {
    return requestWithToken(_extends({ method: 'DELETE' }, options, { url: url }));
  }
};

function syncLogin(_ref) {
  var email = _ref.email,
      password = _ref.password;

  return {
    type: LOGIN,
    email: email,
    password: password
  };
}

function loginSuccessful(token) {
  return {
    type: LOGIN_SUCCESSFUL,
    response: token
  };
}

function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    response: error
  };
}

function login$1(_ref2) {
  var email = _ref2.email,
      password = _ref2.password;

  return function (dispatch, getState) {
    var authEndpoint = getState().config.authEndpoint;


    dispatch(syncLogin({ email: email, password: password }));

    return client.post(authEndpoint + '/login', {
      body: { email: email, password: password }
    }).then(function (success) {
      return dispatch(loginSuccessful(success.token));
    }, function (error) {
      return dispatch(loginFailed(error));
    });
  };
}

function syncLogout() {
  return {
    type: LOGOUT
  };
}

function logoutSuccessful() {
  return {
    type: LOGOUT_SUCCESSFUL
  };
}



function logout$1() {
  return function (dispatch) {
    dispatch(syncLogout());
    return Promise.resolve().then(function () {
      return dispatch(logoutSuccessful());
    });
  };
}

var INVALID_DATA = 'Invalid content: only type and data properties are allowed';

var DATA_PREFIX = '_data';
var QUERIES_PREFIX = '_queries';

function selectPropByPath(path, obj) {
  var selector = void 0,
      numberSelector = void 0;

  if (typeof obj === 'undefined') {
    return obj;
  }

  if (typeof path === 'string') {
    return selectPropByPath(path.split('.'), obj);
  }

  selector = path[0];
  numberSelector = parseInt(selector);

  if (!isNaN(numberSelector)) {
    selector = numberSelector;
  }

  if (path.length === 0) {
    return obj;
  }

  return selectPropByPath(path.slice(1), obj[selector]);
}

function selectDataFromState(uid, state) {
  var dataState = state[DATA_PREFIX],
      data = void 0;

  if (dataState) {
    data = dataState.content[uid];
  }

  return data;
}

function uidsToResponse(uids, state) {
  var content = state[DATA_PREFIX].content;


  return {
    items: uids.map(function (uid) {
      return content[uid];
    })
  };
}

function findDataInState(query, state) {
  var dataState = state[DATA_PREFIX],
      uids = [],
      content = void 0,
      hierarchy = void 0;

  if (!dataState) {
    return { items: [] };
  }

  // Parent filter
  content = dataState.content;
  hierarchy = dataState.hierarchy;
  if (query.parent) {
    var childObject = selectPropByPath(query.parent, hierarchy);

    if (childObject) {
      uids = Object.keys(childObject).map(function (id) {
        return query.parent + '.' + id;
      });
    }
  } else {
    uids = Object.keys(content);
  }

  return uidsToResponse(uids, state);
}

function storeToObserver(store) {
  return {
    observe: function observe() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var onChange = args.pop(),
          selector = args[0],
          lastState = void 0,
          getState = void 0,
          handleChange = void 0;

      getState = function getState() {
        return selector ? selectPropByPath(selector, store.getState()) : store.getState();
      };

      lastState = getState();
      handleChange = function handleChange() {
        var currentState = getState();
        if (currentState !== lastState) {
          var _args = [currentState, lastState];
          lastState = currentState;
          onChange.apply(undefined, _args);
        }
      };

      return {
        unobserve: store.subscribe(handleChange)
      };
    }
  };
}

function matchesQuery() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var content = arguments[1];

  if (typeof content === 'undefined' || content === null) {
    return false;
  }

  if (query.parent) {
    return content.id !== query.parent && content.id.indexOf(query.parent) === 0;
  }

  if (Object.keys(query).length === 0) {
    return true;
  }

  return false;
}

function ensureActionMatches(expectedType) {
  return function (action) {
    return action.type === expectedType ? Promise.resolve(action) : Promise.reject(action);
  };
}

function runDispatchAndExpect(dispatch, action, expectedType) {
  var isAction = function isAction(response) {
    return typeof response.type !== 'undefined' && typeof response.response !== 'undefined';
  };

  return dispatch(action).then(ensureActionMatches(expectedType)).then(function (action) {
    return action.response;
  }, function (action) {
    return isAction(action) ? Promise.reject(action.response) : Promise.reject(action);
  });
}

function dispatchThunkAndExpect(store) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return runDispatchAndExpect.apply(undefined, [store.dispatch].concat(args));
}

/**
 * Clone's the given object using JSON.parse(JSON.stringify(...));
 * @param  {Object} object Object should be JSON compatible
 * @return {Object}        Clone of given object
 */
function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

function dataIsValid(data) {
  var whitelist = ['type', 'data'],
      props = Object.keys(data || {});

  if (props.length === 0) {
    return false;
  }

  return props.every(function (prop) {
    return whitelist.indexOf(prop) !== -1;
  });
}

function toQueryParams() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Sort alphabetically, so that when caching it will always be the same key
  var alphabetically = function alphabetically(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  };

  return Object.keys(query).sort(alphabetically).reduce(function (working, param) {
    var value = query[param],
        prefix = void 0;

    if (!working) {
      prefix = '?';
    } else {
      prefix = working + '&';
    }

    return '' + prefix + param + '=' + encodeURIComponent(value);
  }, '');
}

function hasRunQuery(query, state) {
  var queryState = state[QUERIES_PREFIX],
      queryParams = toQueryParams(query);
  return !!(queryState && queryState[queryParams] && queryState[queryParams].queriedRemote);
}

function makeBlankItem() {
  return {
    type: null,
    data: null
  };
}

function makeItemWith(uid, item) {
  if (item === null) {
    return null;
  }

  return _extends(clone(item), { id: uid });
}

function pathToUid(path) {
  if (!path) {
    return path;
  }

  path = path.replace(/^\/+/, '').replace(/\/+$/, '');

  return path.split('/').join('.');
}

function uidToPath(uid) {
  if (!uid) {
    return uid;
  }

  // Normalize so there's always a leading /
  if (uid.charAt(0) !== '.') {
    uid = '.' + uid;
  }

  return uid.split('.').join('/');
}

function itemUidToPath(item) {
  var path = void 0,
      transformed = void 0;

  if (!item) {
    return item;
  }

  path = uidToPath(item.id);
  transformed = _extends({}, item, { path: path });
  delete transformed.id;

  return transformed;
}

function queryResultsToPath(results) {
  var items = void 0;

  if (!results) {
    return results;
  }

  items = results.items.map(itemUidToPath);

  return _extends({}, results, { items: items });
}

function validatePath(path) {
  if (path.charAt(0) !== '/') {
    throw new Error('Invalid path ' + path + '. Path must be a string starting with \'/\'');
  }

  if (path.indexOf('//') !== -1) {
    throw new Error('Invalid path \'' + path + '\'. Paths must not have more than one \'/\' in a row.');
  }
}

/**
 * Check if uid is invalid. If invalid, returns message why, otherwise returns
 * 	false
 * @param  {String} uid
 * @return {Boolean}
 */
function isInvalid(uid) {
  if (typeof uid !== 'undefined' && uid === '') {
    return 'Invalid UID: Empty string is not a valid UID';
  }
}

function formatAndRun(_ref) {
  var _ref$uid = _ref.uid,
      uid = _ref$uid === undefined ? '' : _ref$uid,
      _ref$validateUid = _ref.validateUid,
      validateUid = _ref$validateUid === undefined ? true : _ref$validateUid,
      query = _ref.query,
      dataEndpoint = _ref.endpoint,
      token = _ref.token,
      method = _ref.method,
      body = _ref.body;

  var endpoint = dataEndpoint + '/' + encodeURIComponent(uid) + toQueryParams(query),
      invalid = isInvalid(uid);

  if (validateUid && invalid) {
    return Promise.reject(new Error(invalid));
  }

  return client[method](endpoint, {
    body: body,
    token: token
  });
}

function generateHandler(method, paramsToObj, _ref2, validateUid) {
  var _ref3 = slicedToArray(_ref2, 3),
      start = _ref3[0],
      success = _ref3[1],
      fail = _ref3[2];

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (dispatch, getState) {
      var _getState = getState(),
          config = _getState.config,
          token = _getState.token,
          endpoint = config.dataEndpoint,
          options = void 0;

      options = _extends({ method: method, endpoint: endpoint, token: token, validateUid: validateUid }, paramsToObj.apply(undefined, args));

      dispatch(start.apply(undefined, args));
      return formatAndRun(options).then(function (response) {
        return dispatch(success.apply(undefined, args.concat([response])));
      }, function (error) {
        return dispatch(fail.apply(undefined, args.concat([error])));
      });
    };
  };
}

var findData$1 = function findData$1(query) {
  return { type: FIND_DATA_FROM_API, query: query };
};
var findDataSuccessful$1 = function findDataSuccessful$1(query, response) {
  return { type: FIND_DATA_FROM_API_SUCCESSFUL, query: query, response: response };
};
var findDataFailed = function findDataFailed(query, response) {
  return { type: FIND_DATA_FROM_API_FAILED, query: query, response: response };
};

var getData$1 = function getData$1(uid) {
  return { type: GET_DATA_FROM_API, uid: uid };
};
var getDataSuccessful$1 = function getDataSuccessful$1(uid, response) {
  return { type: GET_DATA_FROM_API_SUCCESSFUL, uid: uid, response: response };
};
var getDataFailed = function getDataFailed(uid, response) {
  return { type: GET_DATA_FROM_API_FAILED, uid: uid, response: response };
};

var setData$1 = function setData$1(uid, body) {
  return { type: SET_DATA_TO_API, uid: uid, body: body };
};
var setDataSuccessful$1 = function setDataSuccessful$1(uid, body, response) {
  return { type: SET_DATA_TO_API_SUCCESSFUL, uid: uid, body: body, response: response };
};
var setDataFailed$1 = function setDataFailed$1(uid, body, response) {
  return { type: SET_DATA_TO_API_FAILED, uid: uid, body: body, response: response };
};

var removeData$1 = function removeData$1(uid) {
  return { type: REMOVE_DATA_FROM_API, uid: uid };
};
var removeDataSuccessful$1 = function removeDataSuccessful$1(uid, response) {
  return { type: REMOVE_DATA_FROM_API_SUCCESSFUL, uid: uid, response: response };
};
var removeDataFailed = function removeDataFailed(uid, response) {
  return { type: REMOVE_DATA_FROM_API_FAILED, uid: uid, response: response };
};

var get$3 = generateHandler('get', function (uid) {
  return { uid: uid };
}, [getData$1, getDataSuccessful$1, getDataFailed]);
var set$3 = generateHandler('put', function (uid, body) {
  return { uid: uid, body: body };
}, [setData$1, setDataSuccessful$1, setDataFailed$1]);
var remove$2 = generateHandler('delete', function (uid) {
  return { uid: uid };
}, [removeData$1, removeDataSuccessful$1, removeDataFailed]);
var find$2 = generateHandler('get', function (query) {
  return { query: query };
}, [findData$1, findDataSuccessful$1, findDataFailed], false);

function findData$$1(query) {
  return {
    type: FIND_DATA,
    query: query
  };
}

function findDataSuccessful$$1(query, response) {
  return {
    type: FIND_DATA_SUCCESSFUL,
    query: query,
    response: response
  };
}

function getData$$1(uid) {
  return {
    type: GET_DATA,
    uid: uid
  };
}

function getDataSuccessful$$1(uid, response) {
  return {
    type: GET_DATA_SUCCESSFUL,
    response: response,
    uid: uid
  };
}

function setData$$1(uid, data) {
  return {
    type: SET_DATA,
    uid: uid,
    data: data
  };
}

function setDataSuccessful$$1(uid, response) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  options = _extends({ persist: true }, options);
  var _options = options,
      persist = _options.persist;


  return {
    type: SET_DATA_SUCCESSFUL,
    response: makeItemWith(uid, response),
    uid: uid,
    persist: persist
  };
}

function setDataFailed$$1(uid, error) {
  return {
    type: SET_DATA_FAILED,
    response: error,
    uid: uid
  };
}

function removeData$$1(uid) {
  return {
    type: REMOVE_DATA,
    uid: uid
  };
}

function removeDataSuccessful$$1(uid) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options = _extends({ persist: true }, options);
  var _options2 = options,
      persist = _options2.persist;


  return {
    type: REMOVE_DATA_SUCCESSFUL,
    uid: uid,
    persist: persist
  };
}

function set$2(uid, data) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  options = _extends({
    validate: true,
    createAncestry: true,
    persist: true
  }, options);

  var _options3 = options,
      validate = _options3.validate,
      createAncestry = _options3.createAncestry,
      persist = _options3.persist;


  return function (dispatch, getState) {
    function ensureParentExists(child) {
      var parent = child.split('.').slice(0, -1).join('.');

      if (!parent || selectDataFromState(parent, getState())) {
        return Promise.resolve();
      }

      return runDispatchAndExpect(dispatch, set$2(parent, makeBlankItem(parent), { persist: false }), SET_DATA_SUCCESSFUL);
    }

    var action = void 0;

    dispatch(setData$$1(uid, data));

    if (validate && !dataIsValid(data)) {
      action = setDataFailed$$1(uid, new Error(INVALID_DATA));
    } else {
      var currentData = selectDataFromState(uid, getState());

      data = _extends({}, currentData, data);

      action = setDataSuccessful$$1(uid, data, { persist: persist });
    }

    return (createAncestry ? ensureParentExists(uid) : Promise.resolve()).then(function () {
      return dispatch(action);
    });
  };
}

function remove$1(uid) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options = _extends({ persist: true }, options);
  var _options4 = options,
      persist = _options4.persist;


  return function (dispatch, getState) {
    function removeChildren(uid) {
      if (!uid) {
        return Promise.resolve();
      }

      var _findDataInState = findDataInState({ parent: uid }, getState()),
          items = _findDataInState.items,
          removeItem = function removeItem(item) {
        return runDispatchAndExpect(dispatch, remove$1(item.id, { persist: false }), REMOVE_DATA_SUCCESSFUL);
      };

      return Promise.all(items.map(removeItem));
    }

    dispatch(removeData$$1(uid));

    return removeChildren(uid).then(function () {
      return dispatch(removeDataSuccessful$$1(uid, { persist: persist }));
    });
  };
}

function get$2(uid) {
  return function (dispatch, getState) {
    var state = void 0,
        stored = void 0,
        fetchData = void 0;

    dispatch(getData$$1(uid));

    state = getState();
    stored = selectDataFromState(uid, state);

    if (typeof stored === 'undefined') {
      fetchData = runDispatchAndExpect(dispatch, get$3(uid), GET_DATA_FROM_API_SUCCESSFUL).then(function (response) {
        return runDispatchAndExpect(dispatch, set$2(uid, response, { validate: false, createAncestry: false }), SET_DATA_SUCCESSFUL);
      });
    } else {
      fetchData = Promise.resolve(stored);
    }

    return fetchData.then(function (response) {
      return dispatch(getDataSuccessful$$1(uid, response));
    });
  };
}

function find$1() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch, getState) {
    var storeResponse = void 0,
        storeItemInState = void 0,
        findLocallyAndReturn = void 0;

    dispatch(findData$$1(query));

    storeItemInState = function storeItemInState(item) {
      return runDispatchAndExpect(dispatch, set$2(item.id, item, { validate: false }), SET_DATA_SUCCESSFUL);
    };

    storeResponse = function storeResponse(response) {
      var state = getState(),
          itemNotInState = function itemNotInState(_ref) {
        var id = _ref.id;
        return typeof selectDataFromState(id, state) === 'undefined';
      };

      return Promise.all(response.items.filter(itemNotInState).map(storeItemInState));
    };

    findLocallyAndReturn = function findLocallyAndReturn() {
      return Promise.resolve().then(function () {
        return findDataInState(query, getState());
      }).then(function (response) {
        return dispatch(findDataSuccessful$$1(query, response));
      });
    };

    if (hasRunQuery(query, getState())) {
      return findLocallyAndReturn();
    }

    return runDispatchAndExpect(dispatch, find$2(query), FIND_DATA_FROM_API_SUCCESSFUL).then(storeResponse).then(findLocallyAndReturn);
  };
}

function observeQuery$1(query) {
  return {
    type: OBSERVE_QUERY,
    query: query
  };
}

function startSave() {
  return {
    type: SAVE
  };
}

function saveSuccessful() {
  return {
    type: SAVE_SUCCESSFUL
  };
}

function saveFailed() {
  return {
    type: SAVE_FAILED
  };
}

function save$1() {
  return function (dispatch, getState) {
    var saveResultLocally = void 0,
        shouldRemove = void 0,
        shouldSet = void 0,
        setPromises = void 0,
        removePromises = void 0;

    dispatch(startSave());

    var saveState = getState().save,
        entries = Object.keys(saveState).map(function (uid) {
      return [uid, saveState[uid]];
    });

    shouldRemove = function shouldRemove(_ref) {
      var _ref2 = slicedToArray(_ref, 2),
          _ref2$ = _ref2[1],
          local = _ref2$.local,
          changed = _ref2$.changed;

      return local === null && changed;
    };
    shouldSet = function shouldSet(_ref3) {
      var _ref4 = slicedToArray(_ref3, 2),
          _ref4$ = _ref4[1],
          local = _ref4$.local,
          changed = _ref4$.changed;

      return local !== null && changed;
    };

    saveResultLocally = function saveResultLocally(result) {
      return runDispatchAndExpect(dispatch, set$2(result.id, result, { validate: false }), SET_DATA_SUCCESSFUL);
    };

    setPromises = entries.filter(shouldSet).map(function (_ref5) {
      var _ref6 = slicedToArray(_ref5, 2),
          uid = _ref6[0],
          local = _ref6[1].local;

      return set$3(uid, local);
    }).map(function (action) {
      return runDispatchAndExpect(dispatch, action, SET_DATA_TO_API_SUCCESSFUL).then(saveResultLocally);
    });

    removePromises = entries.filter(shouldRemove).map(function (_ref7) {
      var _ref8 = slicedToArray(_ref7, 1),
          uid = _ref8[0];

      return remove$2(uid);
    }).map(function (action) {
      return runDispatchAndExpect(dispatch, action, REMOVE_DATA_FROM_API_SUCCESSFUL);
    });

    return Promise.all([].concat(toConsumableArray(setPromises), toConsumableArray(removePromises))).then(function () {
      return dispatch(saveSuccessful());
    }, function () {
      return dispatch(saveFailed());
    });
  };
}

var AUTH_SERVER = 'https://api.simpla.io';

/**
 * Configure Polymer with dom = shadow, unless Polymer is already defined
 * @return {undefined}
 */
function configurePolymer() {
  window.Polymer = window.Polymer || { dom: 'shadow' };
}

var ping = function (Simpla) {
  var observer = void 0,
      tryPing = void 0;

  tryPing = function tryPing(_ref) {
    var authEndpoint = _ref.authEndpoint,
        project = _ref.project;

    if (authEndpoint && project) {
      fetch(authEndpoint + '/projects/' + project + '/sessions', { method: 'POST' });
      observer && observer.unobserve();
      return true;
    }

    return false;
  };

  if (!tryPing(Simpla.getState('config'))) {
    observer = Simpla.observeState('config', tryPing);
  }
};

var TOKEN_KEY = 'simpla-token';

var TOKEN_ISSUER = 'https://simpla.auth0.com/';
var WARN_NO_SET = 'Could not remember login token. Are you in Private Mode?';
var WARN_NO_READ = 'Could not load login token from storage. Are you in Private Mode?';
var WARN_NO_REMOVE = 'Could not logout. Are you in Private Mode?';
var WARN_INVALID = 'Invalid token';

function tokenIsValid(token) {
  var now = new Date().getTime() / 1000;
  var payload = void 0;

  if (!token) {
    return false;
  }

  try {
    var _token$split = token.split('.'),
        _token$split2 = slicedToArray(_token$split, 2),
        payloadString = _token$split2[1];

    payload = JSON.parse(atob(payloadString));
  } catch (e) {
    console.warn(WARN_INVALID, e.message);
    return false;
  }

  // Check if payload has expired
  if (payload.exp && now > payload.exp) {
    return false;
  }

  // Check to see if issuer
  if (!payload.iss || payload.iss !== TOKEN_ISSUER) {
    return false;
  }

  return true;
}

function setTokenToStorage(token) {
  if (token) {
    try {
      window.localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.warn(WARN_NO_SET);
    }
  } else {
    try {
      window.localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.warn(WARN_NO_REMOVE);
    }
  }
}

function readTokenFromStorage(Simpla) {
  var tokenInStorage = void 0;

  try {
    tokenInStorage = window.localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    tokenInStorage = false;
    console.log(WARN_NO_READ);
  }

  if (tokenIsValid(tokenInStorage)) {
    // WARNING: This is private and should be removed in future
    Simpla._store.dispatch(loginSuccessful(tokenInStorage));
  } else {
    try {
      window.localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.warn(WARN_NO_REMOVE);
    }
  }
}

var persistToken = function (Simpla) {
  readTokenFromStorage(Simpla);
  Simpla.observeState('token', setTokenToStorage);
};

function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

function authenticated() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments[1];

  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return true;
    case LOGOUT_SUCCESSFUL:
      return false;
    default:
      return state;
  }
}

function options() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case SET_OPTION:
      return _extends({}, state, defineProperty({}, action.prop, action.value));
    default:
      return state;
  }
}

function updateStateWithQuery(state, queryString, updates) {
  return _extends({}, state, defineProperty({}, queryString, _extends({}, state[queryString], updates)));
}

var notAlreadyIn = function notAlreadyIn(haystack) {
  return function (needle) {
    return haystack.indexOf(needle) === -1;
  };
};
var isNot = function isNot(a) {
  return function (b) {
    return a !== b;
  };
};

function queries() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var queryString = void 0;

  switch (action.type) {
    case FIND_DATA:
      queryString = toQueryParams(action.query);

      if (!state[queryString]) {
        return updateStateWithQuery(state, queryString, {
          query: action.query,
          querying: true,
          queriedRemote: false,
          cache: [],
          matches: []
        });
      }

      if (!state[queryString].querying) {
        return updateStateWithQuery(state, queryString, { querying: true });
      }

      return state;
    case FIND_DATA_SUCCESSFUL:
      queryString = toQueryParams(action.query);

      if (state[queryString].cache.length !== 0) {
        var _state$queryString = state[queryString],
            matches = _state$queryString.matches,
            cache = _state$queryString.cache,
            updatedMatches = void 0;


        updatedMatches = [].concat(toConsumableArray(matches), toConsumableArray(cache.filter(notAlreadyIn(matches))));

        if (updatedMatches.length !== matches.length) {
          return updateStateWithQuery(state, queryString, {
            querying: false,
            cache: [],
            matches: updatedMatches
          });
        }
      }

      return updateStateWithQuery(state, queryString, { cache: [], querying: false });
    case FIND_DATA_FROM_API_SUCCESSFUL:
      queryString = toQueryParams(action.query);

      if (!state[queryString].queriedRemote) {
        return updateStateWithQuery(state, queryString, { queriedRemote: true });
      }

      return state;
    case OBSERVE_QUERY:
      queryString = toQueryParams(action.query);

      if (!state[queryString]) {
        return updateStateWithQuery(state, queryString, {
          query: action.query,
          querying: false,
          queriedRemote: false,
          cache: [],
          matches: []
        });
      }

      return state;
    case SET_DATA_SUCCESSFUL:
      return Object.keys(state).reduce(function (state, queryString) {
        var _state$queryString2 = state[queryString],
            query = _state$queryString2.query,
            matches = _state$queryString2.matches,
            cache = _state$queryString2.cache,
            querying = _state$queryString2.querying,
            response = action.response,
            uid = action.uid,
            current = querying ? cache : matches,
            updated = void 0;


        if (!matchesQuery(query, response)) {
          updated = current.filter(isNot(uid));
        } else {
          updated = [].concat(toConsumableArray(current), [uid]);
        }

        if (updated.length !== current.length) {
          return updateStateWithQuery(state, queryString, defineProperty({}, querying ? 'cache' : 'matches', updated));
        }

        return state;
      }, state);
    case REMOVE_DATA_SUCCESSFUL:
      return Object.keys(state).reduce(function (state, queryString) {
        var matches = state[queryString].matches,
            uid = action.uid,
            updatedMatches = void 0;


        updatedMatches = matches.filter(isNot(uid));

        if (updatedMatches !== matches.length) {
          return updateStateWithQuery(state, queryString, {
            matches: updatedMatches
          });
        }

        return state;
      }, state);
    default:
      return state;
  }
}

var INITIAL_STATE = false;

function editable$1() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case EDIT_ACTIVE:
      return true;
    case EDIT_INACTIVE:
      return false;
    default:
      return state;
  }
}

function equal(subjectA, subjectB) {
  return JSON.stringify(subjectA) === JSON.stringify(subjectB);
}

function markAt(state, path) {
  var key = path[0],
      value = path.length === 1 ? {} : markAt(state[key] || {}, path.slice(1));

  return _extends({}, state, defineProperty({}, key, value));
}

function pruneAt(state, path) {
  var key = path[0];

  if (path.length === 1) {
    var newState = _extends({}, state);
    delete newState[key];
    return newState;
  }

  if (state.hasOwnProperty(key)) {
    return _extends({}, state, defineProperty({}, key, pruneAt(state[key], path.slice(1))));
  }

  return state;
}

function hierarchy() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case SET_DATA_SUCCESSFUL:
      return markAt(state, action.uid.split('.'), {});
    case REMOVE_DATA_SUCCESSFUL:
      return pruneAt(state, action.uid.split('.'));
    default:
      return state;
  }
}

function content() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case SET_DATA_SUCCESSFUL:
      var currentContent = state[action.uid],
          newContent = clone(action.response);

      if (equal(currentContent, newContent)) {
        return state;
      }

      return _extends({}, state, defineProperty({}, action.uid, clone(action.response)));
    case REMOVE_DATA_SUCCESSFUL:
      if (state[action.uid] === null) {
        return state;
      }

      return _extends({}, state, defineProperty({}, action.uid, null));
    default:
      return state;
  }
}

var data = combineReducers({ hierarchy: hierarchy, content: content });

function token() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];

  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return action.response;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

/**
 * Check if two object are different. Uses JSON stringify to check
 *  whether they've changed.
 * NOTE: May be a perf issue thanks to JSON.stringify, worth investigating
 * @param  {Object}  remote Object on remote state
 * @param  {Object}  local  Object on local state
 * @return {Boolean}        True if they are different, false otherwise
 */
function isDifferent(remote, local) {
  var remoteAsString = JSON.stringify(remote),
      localAsString = JSON.stringify(local);

  return remoteAsString !== localAsString;
}

/**
 * Reduce state of individual UID
 * @param  {Object}   [state={}] State of save info at UID
 * @param  {Object}   data       Incoming data for the item at UID
 * @param  {Boolean}  isRemote   Whether data is remote data or local if not
 * @return {Object}
 */
function reducePart() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = arguments[1];
  var isRemote = arguments[2];
  var local = state.local,
      remote = state.remote,
      changed = state.changed;


  if (isRemote) {
    remote = clone(data || null);
  } else {
    local = clone(data || null);
  }

  changed = isDifferent(remote, local);

  return _extends({}, state, { local: local, remote: remote, changed: changed });
}

/**
 * Save Reducer
 * @param  {Object} [state={}] Current state
 * @param  {Object} action       Action to apply to state
 * @return {Object}              New state
 */
function save$2() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var updatePart = void 0,
      updateLocal = void 0,
      updateRemote = void 0;

  updatePart = function updatePart(remote) {
    return function (whole, id, data) {
      var oldSubstate = whole[id],
          newSubstate = reducePart(whole[id], data, remote);

      return oldSubstate === newSubstate ? state : _extends({}, whole, defineProperty({}, id, newSubstate));
    };
  };

  updateLocal = updatePart(false);
  updateRemote = updatePart(true);

  switch (action.type) {
    case FIND_DATA_FROM_API_SUCCESSFUL:
      return action.response.items.reduce(function (whole, item) {
        return updateRemote(whole, item.id, item);
      }, state);
    case GET_DATA_FROM_API_SUCCESSFUL:
    case SET_DATA_TO_API_SUCCESSFUL:
      return updateRemote(state, action.uid, action.response);
    case REMOVE_DATA_FROM_API_SUCCESSFUL:
      return updateRemote(state, action.uid, null);
    case SET_DATA_SUCCESSFUL:
      if (!action.persist) {
        return state;
      }

      return updateLocal(state, action.uid, action.response);
    case REMOVE_DATA_SUCCESSFUL:
      if (!action.persist) {
        var purged = _extends({}, state);
        delete purged[action.uid];
        return purged;
      }

      return updateLocal(state, action.uid, action.response);
    default:
      return state;
  }
}

var _combineReducers;

var reducer = combineReducers((_combineReducers = {}, defineProperty(_combineReducers, DATA_PREFIX, data), defineProperty(_combineReducers, QUERIES_PREFIX, queries), defineProperty(_combineReducers, 'authenticated', authenticated), defineProperty(_combineReducers, 'config', options), defineProperty(_combineReducers, 'editable', editable$1), defineProperty(_combineReducers, 'token', token), defineProperty(_combineReducers, 'save', save$2), _combineReducers));

// Setup Polymer configuration
configurePolymer();

var Simpla = new (function () {
  function Simpla() {
    classCallCheck(this, Simpla);

    var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    this._store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  }

  createClass(Simpla, [{
    key: 'init',
    value: function init(project) {
      this._store.dispatch(setOption('project', project));

      // Initialize endpoints
      this._store.dispatch(setOption('authEndpoint', AUTH_SERVER));
      this._store.dispatch(setOption('dataEndpoint', AUTH_SERVER + '/projects/' + project + '/content'));
    }

    // Authentication

  }, {
    key: 'login',
    value: function login() {
      return dispatchThunkAndExpect(this._store, login$1.apply(undefined, arguments), LOGIN_SUCCESSFUL);
    }
  }, {
    key: 'logout',
    value: function logout() {
      return dispatchThunkAndExpect(this._store, logout$1.apply(undefined, arguments), LOGOUT_SUCCESSFUL);
    }

    // Data

  }, {
    key: 'find',
    value: function find() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var parentPath = options.parent;
      options.parent = pathToUid(parentPath);
      return Promise.resolve().then(function () {
        return validatePath(parentPath);
      }).then(function () {
        return dispatchThunkAndExpect(_this._store, find$1(options), FIND_DATA_SUCCESSFUL);
      }).then(queryResultsToPath);
    }
  }, {
    key: 'get',
    value: function get(path) {
      var _this2 = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var uid = pathToUid(path);
      return Promise.resolve().then(function () {
        return validatePath(path);
      }).then(function () {
        return dispatchThunkAndExpect(_this2._store, get$2.apply(undefined, [uid].concat(args)), GET_DATA_SUCCESSFUL);
      }).then(itemUidToPath);
    }
  }, {
    key: 'set',
    value: function set(path) {
      var _this3 = this;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var uid = pathToUid(path);
      return Promise.resolve().then(function () {
        return validatePath(path);
      }).then(function () {
        return dispatchThunkAndExpect(_this3._store, set$2.apply(undefined, [uid].concat(args)), SET_DATA_SUCCESSFUL);
      }).then(itemUidToPath);
    }
  }, {
    key: 'remove',
    value: function remove(path) {
      var _this4 = this;

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var uid = pathToUid(path);
      return Promise.resolve().then(function () {
        return validatePath(path);
      }).then(function () {
        return dispatchThunkAndExpect(_this4._store, remove$1.apply(undefined, [uid].concat(args)), REMOVE_DATA_SUCCESSFUL);
      }).then(itemUidToPath);
    }
  }, {
    key: 'observe',
    value: function observe(path) {
      var _this5 = this;

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      var callback = args.pop(),
          uid = pathToUid(path),
          pathInState = void 0,
          wrappedCallback = void 0;

      if (!uid) {
        throw new Error('Observe must be given a valid path');
      }

      validatePath(path);

      pathInState = [DATA_PREFIX, 'content', uid];
      wrappedCallback = function wrappedCallback() {
        return _this5.get(path).then(callback);
      };

      return storeToObserver(this._store).observe(pathInState, wrappedCallback);
    }
  }, {
    key: 'observeQuery',
    value: function observeQuery(query, callback) {
      var _this6 = this;

      var queryString = void 0,
          pathInStore = void 0,
          wrappedCallback = void 0;

      query.parent = pathToUid(query.parent);
      queryString = toQueryParams(query);
      pathInStore = [QUERIES_PREFIX, queryString, 'matches'];

      this._store.dispatch(observeQuery$1(query));

      wrappedCallback = function wrappedCallback(uids) {
        return callback(queryResultsToPath(uidsToResponse(uids, _this6.getState())));
      };

      return storeToObserver(this._store).observe(pathInStore, wrappedCallback);
    }
  }, {
    key: 'save',
    value: function save() {
      return dispatchThunkAndExpect(this._store, save$1.apply(undefined, arguments), SAVE_SUCCESSFUL);
    }

    // Editable

  }, {
    key: 'editable',
    value: function editable(on) {
      this._store.dispatch(on ? editActive() : editInactive());
    }

    // State

  }, {
    key: 'getState',
    value: function getState(path) {
      var state = this._store.getState();
      return path ? selectPropByPath(path, state) : state;
    }
  }, {
    key: 'observeState',
    value: function observeState() {
      var _storeToObserver;

      return (_storeToObserver = storeToObserver(this._store)).observe.apply(_storeToObserver, arguments);
    }
  }]);
  return Simpla;
}())();

// Init plugins
var plugins = [ping, persistToken];

plugins.forEach(function (plugin) {
  return plugin(Simpla);
});

return Simpla;

})));
