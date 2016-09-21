(function (global, factory) {
                  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
                  typeof define === 'function' && define.amd ? define('Simpla', factory) :
                  (global.Simpla = factory());
}(this, function () { 'use strict';

                  var babelHelpers = {};
                  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                    return typeof obj;
                  } : function (obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
                  };

                  babelHelpers.defineProperty = function (obj, key, value) {
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

                  babelHelpers.slicedToArray = function () {
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

                  babelHelpers.toConsumableArray = function (arr) {
                    if (Array.isArray(arr)) {
                      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

                      return arr2;
                    } else {
                      return Array.from(arr);
                    }
                  };

                  babelHelpers;

                  function interopDefault(ex) {
                  	return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
                  }

                  function createCommonjsModule(fn, module) {
                  	return module = { exports: {} }, fn(module, module.exports), module.exports;
                  }

                  var _global = createCommonjsModule(function (module) {
                    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
                    var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
                    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
                  });

                  var _global$1 = interopDefault(_global);

var require$$3 = Object.freeze({
                    default: _global$1
                  });

                  var _core = createCommonjsModule(function (module) {
                    var core = module.exports = { version: '2.4.0' };
                    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
                  });

                  var _core$1 = interopDefault(_core);
                  var version = _core.version;

var require$$0 = Object.freeze({
                    default: _core$1,
                    version: version
                  });

                  var _isObject = createCommonjsModule(function (module) {
                    module.exports = function (it) {
                      return (typeof it === 'undefined' ? 'undefined' : babelHelpers.typeof(it)) === 'object' ? it !== null : typeof it === 'function';
                    };
                  });

                  var _isObject$1 = interopDefault(_isObject);

var require$$12 = Object.freeze({
                    default: _isObject$1
                  });

                  var _anObject = createCommonjsModule(function (module) {
                    var isObject = interopDefault(require$$12);
                    module.exports = function (it) {
                      if (!isObject(it)) throw TypeError(it + ' is not an object!');
                      return it;
                    };
                  });

                  var _anObject$1 = interopDefault(_anObject);

var require$$2$1 = Object.freeze({
                    default: _anObject$1
                  });

                  var _fails = createCommonjsModule(function (module) {
                    module.exports = function (exec) {
                      try {
                        return !!exec();
                      } catch (e) {
                        return true;
                      }
                    };
                  });

                  var _fails$1 = interopDefault(_fails);

var require$$0$2 = Object.freeze({
                    default: _fails$1
                  });

                  var _descriptors = createCommonjsModule(function (module) {
                    // Thank's IE8 for his funny defineProperty
                    module.exports = !interopDefault(require$$0$2)(function () {
                      return Object.defineProperty({}, 'a', { get: function get() {
                          return 7;
                        } }).a != 7;
                    });
                  });

                  var _descriptors$1 = interopDefault(_descriptors);

var require$$1 = Object.freeze({
                    default: _descriptors$1
                  });

                  var _domCreate = createCommonjsModule(function (module) {
                    var isObject = interopDefault(require$$12),
                        document = interopDefault(require$$3).document
                    // in old IE typeof document.createElement is 'object'
                    ,
                        is = isObject(document) && isObject(document.createElement);
                    module.exports = function (it) {
                      return is ? document.createElement(it) : {};
                    };
                  });

                  var _domCreate$1 = interopDefault(_domCreate);

var require$$2$3 = Object.freeze({
                    default: _domCreate$1
                  });

                  var _ie8DomDefine = createCommonjsModule(function (module) {
                    module.exports = !interopDefault(require$$1) && !interopDefault(require$$0$2)(function () {
                      return Object.defineProperty(interopDefault(require$$2$3)('div'), 'a', { get: function get() {
                          return 7;
                        } }).a != 7;
                    });
                  });

                  var _ie8DomDefine$1 = interopDefault(_ie8DomDefine);

var require$$2$2 = Object.freeze({
                    default: _ie8DomDefine$1
                  });

                  var _toPrimitive = createCommonjsModule(function (module) {
                    // 7.1.1 ToPrimitive(input [, PreferredType])
                    var isObject = interopDefault(require$$12);
                    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
                    // and the second argument - flag - preferred type is a string
                    module.exports = function (it, S) {
                      if (!isObject(it)) return it;
                      var fn, val;
                      if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
                      if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
                      if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
                      throw TypeError("Can't convert object to primitive value");
                    };
                  });

                  var _toPrimitive$1 = interopDefault(_toPrimitive);

var require$$1$1 = Object.freeze({
                    default: _toPrimitive$1
                  });

                  var _objectDp = createCommonjsModule(function (module, exports) {
                    var anObject = interopDefault(require$$2$1),
                        IE8_DOM_DEFINE = interopDefault(require$$2$2),
                        toPrimitive = interopDefault(require$$1$1),
                        dP = Object.defineProperty;

                    exports.f = interopDefault(require$$1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
                      anObject(O);
                      P = toPrimitive(P, true);
                      anObject(Attributes);
                      if (IE8_DOM_DEFINE) try {
                        return dP(O, P, Attributes);
                      } catch (e) {/* empty */}
                      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
                      if ('value' in Attributes) O[P] = Attributes.value;
                      return O;
                    };
                  });

                  var _objectDp$1 = interopDefault(_objectDp);
                  var f = _objectDp.f;

var require$$2 = Object.freeze({
                    default: _objectDp$1,
                    f: f
                  });

                  var _propertyDesc = createCommonjsModule(function (module) {
                    module.exports = function (bitmap, value) {
                      return {
                        enumerable: !(bitmap & 1),
                        configurable: !(bitmap & 2),
                        writable: !(bitmap & 4),
                        value: value
                      };
                    };
                  });

                  var _propertyDesc$1 = interopDefault(_propertyDesc);

var require$$3$1 = Object.freeze({
                    default: _propertyDesc$1
                  });

                  var _hide = createCommonjsModule(function (module) {
                    var dP = interopDefault(require$$2),
                        createDesc = interopDefault(require$$3$1);
                    module.exports = interopDefault(require$$1) ? function (object, key, value) {
                      return dP.f(object, key, createDesc(1, value));
                    } : function (object, key, value) {
                      object[key] = value;
                      return object;
                    };
                  });

                  var _hide$1 = interopDefault(_hide);

var require$$0$1 = Object.freeze({
                    default: _hide$1
                  });

                  var _has = createCommonjsModule(function (module) {
                    var hasOwnProperty = {}.hasOwnProperty;
                    module.exports = function (it, key) {
                      return hasOwnProperty.call(it, key);
                    };
                  });

                  var _has$1 = interopDefault(_has);

var require$$2$4 = Object.freeze({
                    default: _has$1
                  });

                  var _uid = createCommonjsModule(function (module) {
                    var id = 0,
                        px = Math.random();
                    module.exports = function (key) {
                      return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
                    };
                  });

                  var _uid$1 = interopDefault(_uid);

var require$$1$2 = Object.freeze({
                    default: _uid$1
                  });

                  var _redefine = createCommonjsModule(function (module) {
                    var global = interopDefault(require$$3),
                        hide = interopDefault(require$$0$1),
                        has = interopDefault(require$$2$4),
                        SRC = interopDefault(require$$1$2)('src'),
                        TO_STRING = 'toString',
                        $toString = Function[TO_STRING],
                        TPL = ('' + $toString).split(TO_STRING);

                    interopDefault(require$$0).inspectSource = function (it) {
                      return $toString.call(it);
                    };

                    (module.exports = function (O, key, val, safe) {
                      var isFunction = typeof val == 'function';
                      if (isFunction) has(val, 'name') || hide(val, 'name', key);
                      if (O[key] === val) return;
                      if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
                      if (O === global) {
                        O[key] = val;
                      } else {
                        if (!safe) {
                          delete O[key];
                          hide(O, key, val);
                        } else {
                          if (O[key]) O[key] = val;else hide(O, key, val);
                        }
                      }
                      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
                    })(Function.prototype, TO_STRING, function toString() {
                      return typeof this == 'function' && this[SRC] || $toString.call(this);
                    });
                  });

                  var _redefine$1 = interopDefault(_redefine);

var require$$0$3 = Object.freeze({
                    default: _redefine$1
                  });

                  var _aFunction = createCommonjsModule(function (module) {
                    module.exports = function (it) {
                      if (typeof it != 'function') throw TypeError(it + ' is not a function!');
                      return it;
                    };
                  });

                  var _aFunction$1 = interopDefault(_aFunction);

var require$$1$3 = Object.freeze({
                    default: _aFunction$1
                  });

                  var _ctx = createCommonjsModule(function (module) {
                    // optional / simple context binding
                    var aFunction = interopDefault(require$$1$3);
                    module.exports = function (fn, that, length) {
                      aFunction(fn);
                      if (that === undefined) return fn;
                      switch (length) {
                        case 1:
                          return function (a) {
                            return fn.call(that, a);
                          };
                        case 2:
                          return function (a, b) {
                            return fn.call(that, a, b);
                          };
                        case 3:
                          return function (a, b, c) {
                            return fn.call(that, a, b, c);
                          };
                      }
                      return function () /* ...args */{
                        return fn.apply(that, arguments);
                      };
                    };
                  });

                  var _ctx$1 = interopDefault(_ctx);

var require$$5 = Object.freeze({
                    default: _ctx$1
                  });

                  var _export = createCommonjsModule(function (module) {
                    var global = interopDefault(require$$3),
                        core = interopDefault(require$$0),
                        hide = interopDefault(require$$0$1),
                        redefine = interopDefault(require$$0$3),
                        ctx = interopDefault(require$$5),
                        PROTOTYPE = 'prototype';

                    var $export = function $export(type, name, source) {
                      var IS_FORCED = type & $export.F,
                          IS_GLOBAL = type & $export.G,
                          IS_STATIC = type & $export.S,
                          IS_PROTO = type & $export.P,
                          IS_BIND = type & $export.B,
                          target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
                          exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
                          expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
                          key,
                          own,
                          out,
                          exp;
                      if (IS_GLOBAL) source = name;
                      for (key in source) {
                        // contains in native
                        own = !IS_FORCED && target && target[key] !== undefined;
                        // export native or passed
                        out = (own ? target : source)[key];
                        // bind timers to global for call from export context
                        exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
                        // extend global
                        if (target) redefine(target, key, out, type & $export.U);
                        // export
                        if (exports[key] != out) hide(exports, key, exp);
                        if (IS_PROTO && expProto[key] != out) expProto[key] = out;
                      }
                    };
                    global.core = core;
                    // type bitmap
                    $export.F = 1; // forced
                    $export.G = 2; // global
                    $export.S = 4; // static
                    $export.P = 8; // proto
                    $export.B = 16; // bind
                    $export.W = 32; // wrap
                    $export.U = 64; // safe
                    $export.R = 128; // real proto method for `library`
                    module.exports = $export;
                  });

                  var _export$1 = interopDefault(_export);

var require$$13 = Object.freeze({
                    default: _export$1
                  });

                  var _cof = createCommonjsModule(function (module) {
                    var toString = {}.toString;

                    module.exports = function (it) {
                      return toString.call(it).slice(8, -1);
                    };
                  });

                  var _cof$1 = interopDefault(_cof);

var require$$0$5 = Object.freeze({
                    default: _cof$1
                  });

                  var _iobject = createCommonjsModule(function (module) {
                    // fallback for non-array-like ES3 and non-enumerable old V8 strings
                    var cof = interopDefault(require$$0$5);
                    module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
                      return cof(it) == 'String' ? it.split('') : Object(it);
                    };
                  });

                  var _iobject$1 = interopDefault(_iobject);

var require$$1$7 = Object.freeze({
                    default: _iobject$1
                  });

                  var _defined = createCommonjsModule(function (module) {
                    // 7.2.1 RequireObjectCoercible(argument)
                    module.exports = function (it) {
                      if (it == undefined) throw TypeError("Can't call method on  " + it);
                      return it;
                    };
                  });

                  var _defined$1 = interopDefault(_defined);

var require$$0$6 = Object.freeze({
                    default: _defined$1
                  });

                  var _toIobject = createCommonjsModule(function (module) {
                    // to indexed object, toObject with fallback for non-array-like ES3 strings
                    var IObject = interopDefault(require$$1$7),
                        defined = interopDefault(require$$0$6);
                    module.exports = function (it) {
                      return IObject(defined(it));
                    };
                  });

                  var _toIobject$1 = interopDefault(_toIobject);

var require$$1$6 = Object.freeze({
                    default: _toIobject$1
                  });

                  var _toInteger = createCommonjsModule(function (module) {
                    // 7.1.4 ToInteger
                    var ceil = Math.ceil,
                        floor = Math.floor;
                    module.exports = function (it) {
                      return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
                    };
                  });

                  var _toInteger$1 = interopDefault(_toInteger);

var require$$1$10 = Object.freeze({
                    default: _toInteger$1
                  });

                  var _toLength = createCommonjsModule(function (module) {
                    // 7.1.15 ToLength
                    var toInteger = interopDefault(require$$1$10),
                        min = Math.min;
                    module.exports = function (it) {
                      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
                    };
                  });

                  var _toLength$1 = interopDefault(_toLength);

var require$$1$9 = Object.freeze({
                    default: _toLength$1
                  });

                  var _toIndex = createCommonjsModule(function (module) {
                    var toInteger = interopDefault(require$$1$10),
                        max = Math.max,
                        min = Math.min;
                    module.exports = function (index, length) {
                      index = toInteger(index);
                      return index < 0 ? max(index + length, 0) : min(index, length);
                    };
                  });

                  var _toIndex$1 = interopDefault(_toIndex);

var require$$0$7 = Object.freeze({
                    default: _toIndex$1
                  });

                  var _arrayIncludes = createCommonjsModule(function (module) {
                    // false -> Array#indexOf
                    // true  -> Array#includes
                    var toIObject = interopDefault(require$$1$6),
                        toLength = interopDefault(require$$1$9),
                        toIndex = interopDefault(require$$0$7);
                    module.exports = function (IS_INCLUDES) {
                      return function ($this, el, fromIndex) {
                        var O = toIObject($this),
                            length = toLength(O.length),
                            index = toIndex(fromIndex, length),
                            value;
                        // Array#includes uses SameValueZero equality algorithm
                        if (IS_INCLUDES && el != el) while (length > index) {
                          value = O[index++];
                          if (value != value) return true;
                          // Array#toIndex ignores holes, Array#includes - not
                        } else for (; length > index; index++) {
                          if (IS_INCLUDES || index in O) {
                            if (O[index] === el) return IS_INCLUDES || index || 0;
                          }
                        }return !IS_INCLUDES && -1;
                      };
                    };
                  });

                  var _arrayIncludes$1 = interopDefault(_arrayIncludes);

var require$$1$8 = Object.freeze({
                    default: _arrayIncludes$1
                  });

                  var _shared = createCommonjsModule(function (module) {
                    var global = interopDefault(require$$3),
                        SHARED = '__core-js_shared__',
                        store = global[SHARED] || (global[SHARED] = {});
                    module.exports = function (key) {
                      return store[key] || (store[key] = {});
                    };
                  });

                  var _shared$1 = interopDefault(_shared);

var require$$2$5 = Object.freeze({
                    default: _shared$1
                  });

                  var _sharedKey = createCommonjsModule(function (module) {
                    var shared = interopDefault(require$$2$5)('keys'),
                        uid = interopDefault(require$$1$2);
                    module.exports = function (key) {
                      return shared[key] || (shared[key] = uid(key));
                    };
                  });

                  var _sharedKey$1 = interopDefault(_sharedKey);

var require$$0$8 = Object.freeze({
                    default: _sharedKey$1
                  });

                  var _objectKeysInternal = createCommonjsModule(function (module) {
                    var has = interopDefault(require$$2$4),
                        toIObject = interopDefault(require$$1$6),
                        arrayIndexOf = interopDefault(require$$1$8)(false),
                        IE_PROTO = interopDefault(require$$0$8)('IE_PROTO');

                    module.exports = function (object, names) {
                      var O = toIObject(object),
                          i = 0,
                          result = [],
                          key;
                      for (key in O) {
                        if (key != IE_PROTO) has(O, key) && result.push(key);
                      } // Don't enum bug & hidden keys
                      while (names.length > i) {
                        if (has(O, key = names[i++])) {
                          ~arrayIndexOf(result, key) || result.push(key);
                        }
                      }return result;
                    };
                  });

                  var _objectKeysInternal$1 = interopDefault(_objectKeysInternal);

var require$$1$5 = Object.freeze({
                    default: _objectKeysInternal$1
                  });

                  var _enumBugKeys = createCommonjsModule(function (module) {
                    // IE 8- don't enum bug keys
                    module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
                  });

                  var _enumBugKeys$1 = interopDefault(_enumBugKeys);

var require$$3$2 = Object.freeze({
                    default: _enumBugKeys$1
                  });

                  var _objectKeys = createCommonjsModule(function (module) {
                    // 19.1.2.14 / 15.2.3.14 Object.keys(O)
                    var $keys = interopDefault(require$$1$5),
                        enumBugKeys = interopDefault(require$$3$2);

                    module.exports = Object.keys || function keys(O) {
                      return $keys(O, enumBugKeys);
                    };
                  });

                  var _objectKeys$1 = interopDefault(_objectKeys);

var require$$1$4 = Object.freeze({
                    default: _objectKeys$1
                  });

                  var _objectGops = createCommonjsModule(function (module, exports) {
                    exports.f = Object.getOwnPropertySymbols;
                  });

                  var _objectGops$1 = interopDefault(_objectGops);
                  var f$1 = _objectGops.f;

var require$$4 = Object.freeze({
                    default: _objectGops$1,
                    f: f$1
                  });

                  var _objectPie = createCommonjsModule(function (module, exports) {
                    exports.f = {}.propertyIsEnumerable;
                  });

                  var _objectPie$1 = interopDefault(_objectPie);
                  var f$2 = _objectPie.f;

var require$$3$3 = Object.freeze({
                    default: _objectPie$1,
                    f: f$2
                  });

                  var _toObject = createCommonjsModule(function (module) {
                    // 7.1.13 ToObject(argument)
                    var defined = interopDefault(require$$0$6);
                    module.exports = function (it) {
                      return Object(defined(it));
                    };
                  });

                  var _toObject$1 = interopDefault(_toObject);

var require$$1$11 = Object.freeze({
                    default: _toObject$1
                  });

                  var _objectAssign = createCommonjsModule(function (module) {
                    'use strict';
                    // 19.1.2.1 Object.assign(target, source, ...)

                    var getKeys = interopDefault(require$$1$4),
                        gOPS = interopDefault(require$$4),
                        pIE = interopDefault(require$$3$3),
                        toObject = interopDefault(require$$1$11),
                        IObject = interopDefault(require$$1$7),
                        $assign = Object.assign;

                    // should work with symbols and should have deterministic property order (V8 bug)
                    module.exports = !$assign || interopDefault(require$$0$2)(function () {
                      var A = {},
                          B = {},
                          S = Symbol(),
                          K = 'abcdefghijklmnopqrst';
                      A[S] = 7;
                      K.split('').forEach(function (k) {
                        B[k] = k;
                      });
                      return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
                    }) ? function assign(target, source) {
                      // eslint-disable-line no-unused-vars
                      var T = toObject(target),
                          aLen = arguments.length,
                          index = 1,
                          getSymbols = gOPS.f,
                          isEnum = pIE.f;
                      while (aLen > index) {
                        var S = IObject(arguments[index++]),
                            keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
                            length = keys.length,
                            j = 0,
                            key;
                        while (length > j) {
                          if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
                        }
                      }return T;
                    } : $assign;
                  });

                  var _objectAssign$1 = interopDefault(_objectAssign);

var require$$0$4 = Object.freeze({
                    default: _objectAssign$1
                  });

                  var es6_object_assign = createCommonjsModule(function (module) {
                    // 19.1.3.1 Object.assign(target, source)
                    var $export = interopDefault(require$$13);

                    $export($export.S + $export.F, 'Object', { assign: interopDefault(require$$0$4) });
                  });

                  interopDefault(es6_object_assign);

                  var assign = createCommonjsModule(function (module) {
                    module.exports = interopDefault(require$$0).Object.assign;
                  });

                  interopDefault(assign);

                  var _wks = createCommonjsModule(function (module) {
                    var store = interopDefault(require$$2$5)('wks'),
                        uid = interopDefault(require$$1$2),
                        _Symbol = interopDefault(require$$3).Symbol,
                        USE_SYMBOL = typeof _Symbol == 'function';

                    var $exports = module.exports = function (name) {
                      return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
                    };

                    $exports.store = store;
                  });

                  var _wks$1 = interopDefault(_wks);

var require$$0$9 = Object.freeze({
                    default: _wks$1
                  });

                  var _classof = createCommonjsModule(function (module) {
                    // getting tag from 19.1.3.6 Object.prototype.toString()
                    var cof = interopDefault(require$$0$5),
                        TAG = interopDefault(require$$0$9)('toStringTag')
                    // ES3 wrong here
                    ,
                        ARG = cof(function () {
                      return arguments;
                    }()) == 'Arguments';

                    // fallback for IE11 Script Access Denied error
                    var tryGet = function tryGet(it, key) {
                      try {
                        return it[key];
                      } catch (e) {/* empty */}
                    };

                    module.exports = function (it) {
                      var O, T, B;
                      return it === undefined ? 'Undefined' : it === null ? 'Null'
                      // @@toStringTag case
                      : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
                      // builtinTag case
                      : ARG ? cof(O)
                      // ES3 arguments fallback
                      : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
                    };
                  });

                  var _classof$1 = interopDefault(_classof);

var require$$3$4 = Object.freeze({
                    default: _classof$1
                  });

                  var es6_object_toString = createCommonjsModule(function (module) {
                    'use strict';
                    // 19.1.3.6 Object.prototype.toString()

                    var classof = interopDefault(require$$3$4),
                        test = {};
                    test[interopDefault(require$$0$9)('toStringTag')] = 'z';
                    if (test + '' != '[object z]') {
                      interopDefault(require$$0$3)(Object.prototype, 'toString', function toString() {
                        return '[object ' + classof(this) + ']';
                      }, true);
                    }
                  });

                  interopDefault(es6_object_toString);

                  var _stringAt = createCommonjsModule(function (module) {
                    var toInteger = interopDefault(require$$1$10),
                        defined = interopDefault(require$$0$6);
                    // true  -> String#at
                    // false -> String#codePointAt
                    module.exports = function (TO_STRING) {
                      return function (that, pos) {
                        var s = String(defined(that)),
                            i = toInteger(pos),
                            l = s.length,
                            a,
                            b;
                        if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
                        a = s.charCodeAt(i);
                        return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
                      };
                    };
                  });

                  var _stringAt$1 = interopDefault(_stringAt);

var require$$1$12 = Object.freeze({
                    default: _stringAt$1
                  });

                  var _library = createCommonjsModule(function (module) {
                    module.exports = false;
                  });

                  var _library$1 = interopDefault(_library);

var require$$17 = Object.freeze({
                    default: _library$1
                  });

                  var _iterators = createCommonjsModule(function (module) {
                    module.exports = {};
                  });

                  var _iterators$1 = interopDefault(_iterators);

var require$$1$13 = Object.freeze({
                    default: _iterators$1
                  });

                  var _objectDps = createCommonjsModule(function (module) {
                    var dP = interopDefault(require$$2),
                        anObject = interopDefault(require$$2$1),
                        getKeys = interopDefault(require$$1$4);

                    module.exports = interopDefault(require$$1) ? Object.defineProperties : function defineProperties(O, Properties) {
                      anObject(O);
                      var keys = getKeys(Properties),
                          length = keys.length,
                          i = 0,
                          P;
                      while (length > i) {
                        dP.f(O, P = keys[i++], Properties[P]);
                      }return O;
                    };
                  });

                  var _objectDps$1 = interopDefault(_objectDps);

var require$$4$2 = Object.freeze({
                    default: _objectDps$1
                  });

                  var _html = createCommonjsModule(function (module) {
                    module.exports = interopDefault(require$$3).document && document.documentElement;
                  });

                  var _html$1 = interopDefault(_html);

var require$$3$6 = Object.freeze({
                    default: _html$1
                  });

                  var _objectCreate = createCommonjsModule(function (module) {
                    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
                    var anObject = interopDefault(require$$2$1),
                        dPs = interopDefault(require$$4$2),
                        enumBugKeys = interopDefault(require$$3$2),
                        IE_PROTO = interopDefault(require$$0$8)('IE_PROTO'),
                        Empty = function Empty() {/* empty */},
                        PROTOTYPE = 'prototype';

                    // Create object with fake `null` prototype: use iframe Object with cleared prototype
                    var _createDict = function createDict() {
                      // Thrash, waste and sodomy: IE GC bug
                      var iframe = interopDefault(require$$2$3)('iframe'),
                          i = enumBugKeys.length,
                          lt = '<',
                          gt = '>',
                          iframeDocument;
                      iframe.style.display = 'none';
                      interopDefault(require$$3$6).appendChild(iframe);
                      iframe.src = 'javascript:'; // eslint-disable-line no-script-url
                      // createDict = iframe.contentWindow.Object;
                      // html.removeChild(iframe);
                      iframeDocument = iframe.contentWindow.document;
                      iframeDocument.open();
                      iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
                      iframeDocument.close();
                      _createDict = iframeDocument.F;
                      while (i--) {
                        delete _createDict[PROTOTYPE][enumBugKeys[i]];
                      }return _createDict();
                    };

                    module.exports = Object.create || function create(O, Properties) {
                      var result;
                      if (O !== null) {
                        Empty[PROTOTYPE] = anObject(O);
                        result = new Empty();
                        Empty[PROTOTYPE] = null;
                        // add "__proto__" for Object.getPrototypeOf polyfill
                        result[IE_PROTO] = O;
                      } else result = _createDict();
                      return Properties === undefined ? result : dPs(result, Properties);
                    };
                  });

                  var _objectCreate$1 = interopDefault(_objectCreate);

var require$$4$1 = Object.freeze({
                    default: _objectCreate$1
                  });

                  var _setToStringTag = createCommonjsModule(function (module) {
                    var def = interopDefault(require$$2).f,
                        has = interopDefault(require$$2$4),
                        TAG = interopDefault(require$$0$9)('toStringTag');

                    module.exports = function (it, tag, stat) {
                      if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
                    };
                  });

                  var _setToStringTag$1 = interopDefault(_setToStringTag);

var require$$3$7 = Object.freeze({
                    default: _setToStringTag$1
                  });

                  var _iterCreate = createCommonjsModule(function (module) {
                    'use strict';

                    var create = interopDefault(require$$4$1),
                        descriptor = interopDefault(require$$3$1),
                        setToStringTag = interopDefault(require$$3$7),
                        IteratorPrototype = {};

                    // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
                    interopDefault(require$$0$1)(IteratorPrototype, interopDefault(require$$0$9)('iterator'), function () {
                      return this;
                    });

                    module.exports = function (Constructor, NAME, next) {
                      Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
                      setToStringTag(Constructor, NAME + ' Iterator');
                    };
                  });

                  var _iterCreate$1 = interopDefault(_iterCreate);

var require$$3$5 = Object.freeze({
                    default: _iterCreate$1
                  });

                  var _objectGpo = createCommonjsModule(function (module) {
                    // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
                    var has = interopDefault(require$$2$4),
                        toObject = interopDefault(require$$1$11),
                        IE_PROTO = interopDefault(require$$0$8)('IE_PROTO'),
                        ObjectProto = Object.prototype;

                    module.exports = Object.getPrototypeOf || function (O) {
                      O = toObject(O);
                      if (has(O, IE_PROTO)) return O[IE_PROTO];
                      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
                        return O.constructor.prototype;
                      }return O instanceof Object ? ObjectProto : null;
                    };
                  });

                  var _objectGpo$1 = interopDefault(_objectGpo);

var require$$1$14 = Object.freeze({
                    default: _objectGpo$1
                  });

                  var _iterDefine = createCommonjsModule(function (module) {
                    'use strict';

                    var LIBRARY = interopDefault(require$$17),
                        $export = interopDefault(require$$13),
                        redefine = interopDefault(require$$0$3),
                        hide = interopDefault(require$$0$1),
                        has = interopDefault(require$$2$4),
                        Iterators = interopDefault(require$$1$13),
                        $iterCreate = interopDefault(require$$3$5),
                        setToStringTag = interopDefault(require$$3$7),
                        getPrototypeOf = interopDefault(require$$1$14),
                        ITERATOR = interopDefault(require$$0$9)('iterator'),
                        BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
                    ,
                        FF_ITERATOR = '@@iterator',
                        KEYS = 'keys',
                        VALUES = 'values';

                    var returnThis = function returnThis() {
                      return this;
                    };

                    module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
                      $iterCreate(Constructor, NAME, next);
                      var getMethod = function getMethod(kind) {
                        if (!BUGGY && kind in proto) return proto[kind];
                        switch (kind) {
                          case KEYS:
                            return function keys() {
                              return new Constructor(this, kind);
                            };
                          case VALUES:
                            return function values() {
                              return new Constructor(this, kind);
                            };
                        }return function entries() {
                          return new Constructor(this, kind);
                        };
                      };
                      var TAG = NAME + ' Iterator',
                          DEF_VALUES = DEFAULT == VALUES,
                          VALUES_BUG = false,
                          proto = Base.prototype,
                          $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
                          $default = $native || getMethod(DEFAULT),
                          $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
                          $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
                          methods,
                          key,
                          IteratorPrototype;
                      // Fix native
                      if ($anyNative) {
                        IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
                        if (IteratorPrototype !== Object.prototype) {
                          // Set @@toStringTag to native iterators
                          setToStringTag(IteratorPrototype, TAG, true);
                          // fix for some old engines
                          if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
                        }
                      }
                      // fix Array#{values, @@iterator}.name in V8 / FF
                      if (DEF_VALUES && $native && $native.name !== VALUES) {
                        VALUES_BUG = true;
                        $default = function values() {
                          return $native.call(this);
                        };
                      }
                      // Define iterator
                      if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
                        hide(proto, ITERATOR, $default);
                      }
                      // Plug for library
                      Iterators[NAME] = $default;
                      Iterators[TAG] = returnThis;
                      if (DEFAULT) {
                        methods = {
                          values: DEF_VALUES ? $default : getMethod(VALUES),
                          keys: IS_SET ? $default : getMethod(KEYS),
                          entries: $entries
                        };
                        if (FORCED) for (key in methods) {
                          if (!(key in proto)) redefine(proto, key, methods[key]);
                        } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
                      }
                      return methods;
                    };
                  });

                  var _iterDefine$1 = interopDefault(_iterDefine);

var require$$0$10 = Object.freeze({
                    default: _iterDefine$1
                  });

                  var es6_string_iterator = createCommonjsModule(function (module) {
                    'use strict';

                    var $at = interopDefault(require$$1$12)(true);

                    // 21.1.3.27 String.prototype[@@iterator]()
                    interopDefault(require$$0$10)(String, 'String', function (iterated) {
                      this._t = String(iterated); // target
                      this._i = 0; // next index
                      // 21.1.5.2.1 %StringIteratorPrototype%.next()
                    }, function () {
                      var O = this._t,
                          index = this._i,
                          point;
                      if (index >= O.length) return { value: undefined, done: true };
                      point = $at(O, index);
                      this._i += point.length;
                      return { value: point, done: false };
                    });
                  });

                  interopDefault(es6_string_iterator);

                  var _addToUnscopables = createCommonjsModule(function (module) {
                    // 22.1.3.31 Array.prototype[@@unscopables]
                    var UNSCOPABLES = interopDefault(require$$0$9)('unscopables'),
                        ArrayProto = Array.prototype;
                    if (ArrayProto[UNSCOPABLES] == undefined) interopDefault(require$$0$1)(ArrayProto, UNSCOPABLES, {});
                    module.exports = function (key) {
                      ArrayProto[UNSCOPABLES][key] = true;
                    };
                  });

                  var _addToUnscopables$1 = interopDefault(_addToUnscopables);

var require$$4$3 = Object.freeze({
                    default: _addToUnscopables$1
                  });

                  var _iterStep = createCommonjsModule(function (module) {
                    module.exports = function (done, value) {
                      return { value: value, done: !!done };
                    };
                  });

                  var _iterStep$1 = interopDefault(_iterStep);

var require$$3$8 = Object.freeze({
                    default: _iterStep$1
                  });

                  var es6_array_iterator = createCommonjsModule(function (module) {
                    'use strict';

                    var addToUnscopables = interopDefault(require$$4$3),
                        step = interopDefault(require$$3$8),
                        Iterators = interopDefault(require$$1$13),
                        toIObject = interopDefault(require$$1$6);

                    // 22.1.3.4 Array.prototype.entries()
                    // 22.1.3.13 Array.prototype.keys()
                    // 22.1.3.29 Array.prototype.values()
                    // 22.1.3.30 Array.prototype[@@iterator]()
                    module.exports = interopDefault(require$$0$10)(Array, 'Array', function (iterated, kind) {
                      this._t = toIObject(iterated); // target
                      this._i = 0; // next index
                      this._k = kind; // kind
                      // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
                    }, function () {
                      var O = this._t,
                          kind = this._k,
                          index = this._i++;
                      if (!O || index >= O.length) {
                        this._t = undefined;
                        return step(1);
                      }
                      if (kind == 'keys') return step(0, index);
                      if (kind == 'values') return step(0, O[index]);
                      return step(0, [index, O[index]]);
                    }, 'values');

                    // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
                    Iterators.Arguments = Iterators.Array;

                    addToUnscopables('keys');
                    addToUnscopables('values');
                    addToUnscopables('entries');
                  });

                  var es6_array_iterator$1 = interopDefault(es6_array_iterator);

var require$$5$1 = Object.freeze({
                    default: es6_array_iterator$1
                  });

                  var web_dom_iterable = createCommonjsModule(function (module) {
                    var $iterators = interopDefault(require$$5$1),
                        redefine = interopDefault(require$$0$3),
                        global = interopDefault(require$$3),
                        hide = interopDefault(require$$0$1),
                        Iterators = interopDefault(require$$1$13),
                        wks = interopDefault(require$$0$9),
                        ITERATOR = wks('iterator'),
                        TO_STRING_TAG = wks('toStringTag'),
                        ArrayValues = Iterators.Array;

                    for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
                      var NAME = collections[i],
                          Collection = global[NAME],
                          proto = Collection && Collection.prototype,
                          key;
                      if (proto) {
                        if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
                        if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
                        Iterators[NAME] = ArrayValues;
                        for (key in $iterators) {
                          if (!proto[key]) redefine(proto, key, $iterators[key], true);
                        }
                      }
                    }
                  });

                  interopDefault(web_dom_iterable);

                  var _anInstance = createCommonjsModule(function (module) {
                    module.exports = function (it, Constructor, name, forbiddenField) {
                      if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
                        throw TypeError(name + ': incorrect invocation!');
                      }return it;
                    };
                  });

                  var _anInstance$1 = interopDefault(_anInstance);

var require$$10 = Object.freeze({
                    default: _anInstance$1
                  });

                  var _iterCall = createCommonjsModule(function (module) {
                    // call something on iterator step with safe closing on error
                    var anObject = interopDefault(require$$2$1);
                    module.exports = function (iterator, fn, value, entries) {
                      try {
                        return entries ? fn(anObject(value)[0], value[1]) : fn(value);
                        // 7.4.6 IteratorClose(iterator, completion)
                      } catch (e) {
                        var ret = iterator['return'];
                        if (ret !== undefined) anObject(ret.call(iterator));
                        throw e;
                      }
                    };
                  });

                  var _iterCall$1 = interopDefault(_iterCall);

var require$$4$4 = Object.freeze({
                    default: _iterCall$1
                  });

                  var _isArrayIter = createCommonjsModule(function (module) {
                    // check on default Array iterator
                    var Iterators = interopDefault(require$$1$13),
                        ITERATOR = interopDefault(require$$0$9)('iterator'),
                        ArrayProto = Array.prototype;

                    module.exports = function (it) {
                      return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
                    };
                  });

                  var _isArrayIter$1 = interopDefault(_isArrayIter);

var require$$3$9 = Object.freeze({
                    default: _isArrayIter$1
                  });

                  var core_getIteratorMethod = createCommonjsModule(function (module) {
                    var classof = interopDefault(require$$3$4),
                        ITERATOR = interopDefault(require$$0$9)('iterator'),
                        Iterators = interopDefault(require$$1$13);
                    module.exports = interopDefault(require$$0).getIteratorMethod = function (it) {
                      if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
                    };
                  });

                  var core_getIteratorMethod$1 = interopDefault(core_getIteratorMethod);

var require$$0$11 = Object.freeze({
                    default: core_getIteratorMethod$1
                  });

                  var _forOf = createCommonjsModule(function (module) {
                    var ctx = interopDefault(require$$5),
                        call = interopDefault(require$$4$4),
                        isArrayIter = interopDefault(require$$3$9),
                        anObject = interopDefault(require$$2$1),
                        toLength = interopDefault(require$$1$9),
                        getIterFn = interopDefault(require$$0$11),
                        BREAK = {},
                        RETURN = {};
                    var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
                      var iterFn = ITERATOR ? function () {
                        return iterable;
                      } : getIterFn(iterable),
                          f = ctx(fn, that, entries ? 2 : 1),
                          index = 0,
                          length,
                          step,
                          iterator,
                          result;
                      if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
                      // fast case for arrays with default iterator
                      if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
                        result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
                        if (result === BREAK || result === RETURN) return result;
                      } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
                        result = call(iterator, f, step.value, entries);
                        if (result === BREAK || result === RETURN) return result;
                      }
                    };
                    exports.BREAK = BREAK;
                    exports.RETURN = RETURN;
                  });

                  var _forOf$1 = interopDefault(_forOf);

var require$$9 = Object.freeze({
                    default: _forOf$1
                  });

                  var _speciesConstructor = createCommonjsModule(function (module) {
                    // 7.3.20 SpeciesConstructor(O, defaultConstructor)
                    var anObject = interopDefault(require$$2$1),
                        aFunction = interopDefault(require$$1$3),
                        SPECIES = interopDefault(require$$0$9)('species');
                    module.exports = function (O, D) {
                      var C = anObject(O).constructor,
                          S;
                      return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
                    };
                  });

                  var _speciesConstructor$1 = interopDefault(_speciesConstructor);

var require$$8 = Object.freeze({
                    default: _speciesConstructor$1
                  });

                  var _invoke = createCommonjsModule(function (module) {
                                    // fast apply, http://jsperf.lnkit.com/fast-apply/5
                                    module.exports = function (fn, args, that) {
                                                      var un = that === undefined;
                                                      switch (args.length) {
                                                                        case 0:
                                                                                          return un ? fn() : fn.call(that);
                                                                        case 1:
                                                                                          return un ? fn(args[0]) : fn.call(that, args[0]);
                                                                        case 2:
                                                                                          return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                                                                        case 3:
                                                                                          return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                                                                        case 4:
                                                                                          return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                                                      }return fn.apply(that, args);
                                    };
                  });

                  var _invoke$1 = interopDefault(_invoke);

var require$$4$5 = Object.freeze({
                                    default: _invoke$1
                  });

                  var _task = createCommonjsModule(function (module) {
                    var ctx = interopDefault(require$$5),
                        invoke = interopDefault(require$$4$5),
                        html = interopDefault(require$$3$6),
                        cel = interopDefault(require$$2$3),
                        global = interopDefault(require$$3),
                        process = global.process,
                        setTask = global.setImmediate,
                        clearTask = global.clearImmediate,
                        MessageChannel = global.MessageChannel,
                        counter = 0,
                        queue = {},
                        ONREADYSTATECHANGE = 'onreadystatechange',
                        defer,
                        channel,
                        port;
                    var run = function run() {
                      var id = +this;
                      if (queue.hasOwnProperty(id)) {
                        var fn = queue[id];
                        delete queue[id];
                        fn();
                      }
                    };
                    var listener = function listener(event) {
                      run.call(event.data);
                    };
                    // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
                    if (!setTask || !clearTask) {
                      setTask = function setImmediate(fn) {
                        var args = [],
                            i = 1;
                        while (arguments.length > i) {
                          args.push(arguments[i++]);
                        }queue[++counter] = function () {
                          invoke(typeof fn == 'function' ? fn : Function(fn), args);
                        };
                        defer(counter);
                        return counter;
                      };
                      clearTask = function clearImmediate(id) {
                        delete queue[id];
                      };
                      // Node.js 0.8-
                      if (interopDefault(require$$0$5)(process) == 'process') {
                        defer = function defer(id) {
                          process.nextTick(ctx(run, id, 1));
                        };
                        // Browsers with MessageChannel, includes WebWorkers
                      } else if (MessageChannel) {
                        channel = new MessageChannel();
                        port = channel.port2;
                        channel.port1.onmessage = listener;
                        defer = ctx(port.postMessage, port, 1);
                        // Browsers with postMessage, skip WebWorkers
                        // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
                      } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
                        defer = function defer(id) {
                          global.postMessage(id + '', '*');
                        };
                        global.addEventListener('message', listener, false);
                        // IE8-
                      } else if (ONREADYSTATECHANGE in cel('script')) {
                        defer = function defer(id) {
                          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
                            html.removeChild(this);
                            run.call(id);
                          };
                        };
                        // Rest old browsers
                      } else {
                        defer = function defer(id) {
                          setTimeout(ctx(run, id, 1), 0);
                        };
                      }
                    }
                    module.exports = {
                      set: setTask,
                      clear: clearTask
                    };
                  });

                  var _task$1 = interopDefault(_task);
                  var set = _task.set;
                  var clear = _task.clear;

var require$$1$15 = Object.freeze({
                    default: _task$1,
                    set: set,
                    clear: clear
                  });

                  var _microtask = createCommonjsModule(function (module) {
                    var global = interopDefault(require$$3),
                        macrotask = interopDefault(require$$1$15).set,
                        Observer = global.MutationObserver || global.WebKitMutationObserver,
                        process = global.process,
                        Promise = global.Promise,
                        isNode = interopDefault(require$$0$5)(process) == 'process';

                    module.exports = function () {
                      var head, last, notify;

                      var flush = function flush() {
                        var parent, fn;
                        if (isNode && (parent = process.domain)) parent.exit();
                        while (head) {
                          fn = head.fn;
                          head = head.next;
                          try {
                            fn();
                          } catch (e) {
                            if (head) notify();else last = undefined;
                            throw e;
                          }
                        }last = undefined;
                        if (parent) parent.enter();
                      };

                      // Node.js
                      if (isNode) {
                        notify = function notify() {
                          process.nextTick(flush);
                        };
                        // browsers with MutationObserver
                      } else if (Observer) {
                        var toggle = true,
                            node = document.createTextNode('');
                        new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
                        notify = function notify() {
                          node.data = toggle = !toggle;
                        };
                        // environments with maybe non-completely correct, but existent Promise
                      } else if (Promise && Promise.resolve) {
                        var promise = Promise.resolve();
                        notify = function notify() {
                          promise.then(flush);
                        };
                        // for other environments - macrotask based on:
                        // - setImmediate
                        // - MessageChannel
                        // - window.postMessag
                        // - onreadystatechange
                        // - setTimeout
                      } else {
                        notify = function notify() {
                          // strange IE + webpack dev server bug - use .call(global)
                          macrotask.call(global, flush);
                        };
                      }

                      return function (fn) {
                        var task = { fn: fn, next: undefined };
                        if (last) last.next = task;
                        if (!head) {
                          head = task;
                          notify();
                        }last = task;
                      };
                    };
                  });

                  var _microtask$1 = interopDefault(_microtask);

var require$$6 = Object.freeze({
                    default: _microtask$1
                  });

                  var _redefineAll = createCommonjsModule(function (module) {
                    var redefine = interopDefault(require$$0$3);
                    module.exports = function (target, src, safe) {
                      for (var key in src) {
                        redefine(target, key, src[key], safe);
                      }return target;
                    };
                  });

                  var _redefineAll$1 = interopDefault(_redefineAll);

var require$$4$6 = Object.freeze({
                    default: _redefineAll$1
                  });

                  var _setSpecies = createCommonjsModule(function (module) {
                    'use strict';

                    var global = interopDefault(require$$3),
                        dP = interopDefault(require$$2),
                        DESCRIPTORS = interopDefault(require$$1),
                        SPECIES = interopDefault(require$$0$9)('species');

                    module.exports = function (KEY) {
                      var C = global[KEY];
                      if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
                        configurable: true,
                        get: function get() {
                          return this;
                        }
                      });
                    };
                  });

                  var _setSpecies$1 = interopDefault(_setSpecies);

var require$$2$6 = Object.freeze({
                    default: _setSpecies$1
                  });

                  var _iterDetect = createCommonjsModule(function (module) {
                    var ITERATOR = interopDefault(require$$0$9)('iterator'),
                        SAFE_CLOSING = false;

                    try {
                      var riter = [7][ITERATOR]();
                      riter['return'] = function () {
                        SAFE_CLOSING = true;
                      };
                      Array.from(riter, function () {
                        throw 2;
                      });
                    } catch (e) {/* empty */}

                    module.exports = function (exec, skipClosing) {
                      if (!skipClosing && !SAFE_CLOSING) return false;
                      var safe = false;
                      try {
                        var arr = [7],
                            iter = arr[ITERATOR]();
                        iter.next = function () {
                          return { done: safe = true };
                        };
                        arr[ITERATOR] = function () {
                          return iter;
                        };
                        exec(arr);
                      } catch (e) {/* empty */}
                      return safe;
                    };
                  });

                  var _iterDetect$1 = interopDefault(_iterDetect);

var require$$0$12 = Object.freeze({
                    default: _iterDetect$1
                  });

                  var es6_promise = createCommonjsModule(function (module) {
                    'use strict';

                    var LIBRARY = interopDefault(require$$17),
                        global = interopDefault(require$$3),
                        ctx = interopDefault(require$$5),
                        classof = interopDefault(require$$3$4),
                        $export = interopDefault(require$$13),
                        isObject = interopDefault(require$$12),
                        aFunction = interopDefault(require$$1$3),
                        anInstance = interopDefault(require$$10),
                        forOf = interopDefault(require$$9),
                        speciesConstructor = interopDefault(require$$8),
                        task = interopDefault(require$$1$15).set,
                        microtask = interopDefault(require$$6)(),
                        PROMISE = 'Promise',
                        TypeError = global.TypeError,
                        process = global.process,
                        $Promise = global[PROMISE],
                        process = global.process,
                        isNode = classof(process) == 'process',
                        empty = function empty() {/* empty */},
                        Internal,
                        GenericPromiseCapability,
                        Wrapper;

                    var USE_NATIVE = !!function () {
                      try {
                        // correct subclassing with @@species support
                        var promise = $Promise.resolve(1),
                            FakePromise = (promise.constructor = {})[interopDefault(require$$0$9)('species')] = function (exec) {
                          exec(empty, empty);
                        };
                        // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
                        return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
                      } catch (e) {/* empty */}
                    }();

                    // helpers
                    var sameConstructor = function sameConstructor(a, b) {
                      // with library wrapper special case
                      return a === b || a === $Promise && b === Wrapper;
                    };
                    var isThenable = function isThenable(it) {
                      var then;
                      return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
                    };
                    var newPromiseCapability = function newPromiseCapability(C) {
                      return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
                    };
                    var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
                      var resolve, reject;
                      this.promise = new C(function ($$resolve, $$reject) {
                        if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
                        resolve = $$resolve;
                        reject = $$reject;
                      });
                      this.resolve = aFunction(resolve);
                      this.reject = aFunction(reject);
                    };
                    var perform = function perform(exec) {
                      try {
                        exec();
                      } catch (e) {
                        return { error: e };
                      }
                    };
                    var notify = function notify(promise, isReject) {
                      if (promise._n) return;
                      promise._n = true;
                      var chain = promise._c;
                      microtask(function () {
                        var value = promise._v,
                            ok = promise._s == 1,
                            i = 0;
                        var run = function run(reaction) {
                          var handler = ok ? reaction.ok : reaction.fail,
                              resolve = reaction.resolve,
                              reject = reaction.reject,
                              domain = reaction.domain,
                              result,
                              then;
                          try {
                            if (handler) {
                              if (!ok) {
                                if (promise._h == 2) onHandleUnhandled(promise);
                                promise._h = 1;
                              }
                              if (handler === true) result = value;else {
                                if (domain) domain.enter();
                                result = handler(value);
                                if (domain) domain.exit();
                              }
                              if (result === reaction.promise) {
                                reject(TypeError('Promise-chain cycle'));
                              } else if (then = isThenable(result)) {
                                then.call(result, resolve, reject);
                              } else resolve(result);
                            } else reject(value);
                          } catch (e) {
                            reject(e);
                          }
                        };
                        while (chain.length > i) {
                          run(chain[i++]);
                        } // variable length - can't use forEach
                        promise._c = [];
                        promise._n = false;
                        if (isReject && !promise._h) onUnhandled(promise);
                      });
                    };
                    var onUnhandled = function onUnhandled(promise) {
                      task.call(global, function () {
                        var value = promise._v,
                            abrupt,
                            handler,
                            console;
                        if (isUnhandled(promise)) {
                          abrupt = perform(function () {
                            if (isNode) {
                              process.emit('unhandledRejection', value, promise);
                            } else if (handler = global.onunhandledrejection) {
                              handler({ promise: promise, reason: value });
                            } else if ((console = global.console) && console.error) {
                              console.error('Unhandled promise rejection', value);
                            }
                          });
                          // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
                          promise._h = isNode || isUnhandled(promise) ? 2 : 1;
                        }promise._a = undefined;
                        if (abrupt) throw abrupt.error;
                      });
                    };
                    var isUnhandled = function isUnhandled(promise) {
                      if (promise._h == 1) return false;
                      var chain = promise._a || promise._c,
                          i = 0,
                          reaction;
                      while (chain.length > i) {
                        reaction = chain[i++];
                        if (reaction.fail || !isUnhandled(reaction.promise)) return false;
                      }return true;
                    };
                    var onHandleUnhandled = function onHandleUnhandled(promise) {
                      task.call(global, function () {
                        var handler;
                        if (isNode) {
                          process.emit('rejectionHandled', promise);
                        } else if (handler = global.onrejectionhandled) {
                          handler({ promise: promise, reason: promise._v });
                        }
                      });
                    };
                    var $reject = function $reject(value) {
                      var promise = this;
                      if (promise._d) return;
                      promise._d = true;
                      promise = promise._w || promise; // unwrap
                      promise._v = value;
                      promise._s = 2;
                      if (!promise._a) promise._a = promise._c.slice();
                      notify(promise, true);
                    };
                    var $resolve = function $resolve(value) {
                      var promise = this,
                          then;
                      if (promise._d) return;
                      promise._d = true;
                      promise = promise._w || promise; // unwrap
                      try {
                        if (promise === value) throw TypeError("Promise can't be resolved itself");
                        if (then = isThenable(value)) {
                          microtask(function () {
                            var wrapper = { _w: promise, _d: false }; // wrap
                            try {
                              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
                            } catch (e) {
                              $reject.call(wrapper, e);
                            }
                          });
                        } else {
                          promise._v = value;
                          promise._s = 1;
                          notify(promise, false);
                        }
                      } catch (e) {
                        $reject.call({ _w: promise, _d: false }, e); // wrap
                      }
                    };

                    // constructor polyfill
                    if (!USE_NATIVE) {
                      // 25.4.3.1 Promise(executor)
                      $Promise = function Promise(executor) {
                        anInstance(this, $Promise, PROMISE, '_h');
                        aFunction(executor);
                        Internal.call(this);
                        try {
                          executor(ctx($resolve, this, 1), ctx($reject, this, 1));
                        } catch (err) {
                          $reject.call(this, err);
                        }
                      };
                      Internal = function Promise(executor) {
                        this._c = []; // <- awaiting reactions
                        this._a = undefined; // <- checked in isUnhandled reactions
                        this._s = 0; // <- state
                        this._d = false; // <- done
                        this._v = undefined; // <- value
                        this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
                        this._n = false; // <- notify
                      };
                      Internal.prototype = interopDefault(require$$4$6)($Promise.prototype, {
                        // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
                        then: function then(onFulfilled, onRejected) {
                          var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
                          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
                          reaction.fail = typeof onRejected == 'function' && onRejected;
                          reaction.domain = isNode ? process.domain : undefined;
                          this._c.push(reaction);
                          if (this._a) this._a.push(reaction);
                          if (this._s) notify(this, false);
                          return reaction.promise;
                        },
                        // 25.4.5.1 Promise.prototype.catch(onRejected)
                        'catch': function _catch(onRejected) {
                          return this.then(undefined, onRejected);
                        }
                      });
                      PromiseCapability = function PromiseCapability() {
                        var promise = new Internal();
                        this.promise = promise;
                        this.resolve = ctx($resolve, promise, 1);
                        this.reject = ctx($reject, promise, 1);
                      };
                    }

                    $export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
                    interopDefault(require$$3$7)($Promise, PROMISE);
                    interopDefault(require$$2$6)(PROMISE);
                    Wrapper = interopDefault(require$$0)[PROMISE];

                    // statics
                    $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
                      // 25.4.4.5 Promise.reject(r)
                      reject: function reject(r) {
                        var capability = newPromiseCapability(this),
                            $$reject = capability.reject;
                        $$reject(r);
                        return capability.promise;
                      }
                    });
                    $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
                      // 25.4.4.6 Promise.resolve(x)
                      resolve: function resolve(x) {
                        // instanceof instead of internal slot check because we should fix it without replacement native Promise core
                        if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
                        var capability = newPromiseCapability(this),
                            $$resolve = capability.resolve;
                        $$resolve(x);
                        return capability.promise;
                      }
                    });
                    $export($export.S + $export.F * !(USE_NATIVE && interopDefault(require$$0$12)(function (iter) {
                      $Promise.all(iter)['catch'](empty);
                    })), PROMISE, {
                      // 25.4.4.1 Promise.all(iterable)
                      all: function all(iterable) {
                        var C = this,
                            capability = newPromiseCapability(C),
                            resolve = capability.resolve,
                            reject = capability.reject;
                        var abrupt = perform(function () {
                          var values = [],
                              index = 0,
                              remaining = 1;
                          forOf(iterable, false, function (promise) {
                            var $index = index++,
                                alreadyCalled = false;
                            values.push(undefined);
                            remaining++;
                            C.resolve(promise).then(function (value) {
                              if (alreadyCalled) return;
                              alreadyCalled = true;
                              values[$index] = value;
                              --remaining || resolve(values);
                            }, reject);
                          });
                          --remaining || resolve(values);
                        });
                        if (abrupt) reject(abrupt.error);
                        return capability.promise;
                      },
                      // 25.4.4.4 Promise.race(iterable)
                      race: function race(iterable) {
                        var C = this,
                            capability = newPromiseCapability(C),
                            reject = capability.reject;
                        var abrupt = perform(function () {
                          forOf(iterable, false, function (promise) {
                            C.resolve(promise).then(capability.resolve, reject);
                          });
                        });
                        if (abrupt) reject(abrupt.error);
                        return capability.promise;
                      }
                    });
                  });

                  interopDefault(es6_promise);

                  var promise = createCommonjsModule(function (module) {
                    module.exports = interopDefault(require$$0).Promise;
                  });

                  interopDefault(promise);

                  var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

                  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
                  var performance = global$1.performance || {};
                  var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
                      return new Date().getTime();
                  };

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
                   * Checks if `value` is a host object in IE < 9.
                   *
                   * @private
                   * @param {*} value The value to check.
                   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
                   */
                  function isHostObject(value) {
                    // Many host objects are `Object` objects that can coerce to strings
                    // despite having improperly defined `toString` methods.
                    var result = false;
                    if (value != null && typeof value.toString != 'function') {
                      try {
                        result = !!(value + '');
                      } catch (e) {}
                    }
                    return result;
                  }

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
                    return !!value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) == 'object';
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
                   * Used to resolve the
                   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
                   * of values.
                   */
                  var objectToString = objectProto.toString;

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
                    if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
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
                  };

                  var root = this;
                  if (typeof global$1 !== 'undefined') {
                  	root = global$1;
                  } else if (typeof window !== 'undefined') {
                  	root = window;
                  }

                  var result = symbolObservablePonyfill(root);

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
                          if ((typeof observer === 'undefined' ? 'undefined' : babelHelpers.typeof(observer)) !== 'object') {
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

                  function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
                    var reducerKeys = Object.keys(reducers);
                    var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

                    if (reducerKeys.length === 0) {
                      return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
                    }

                    if (!isPlainObject(inputState)) {
                      return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
                    }

                    var unexpectedKeys = Object.keys(inputState).filter(function (key) {
                      return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
                    });

                    unexpectedKeys.forEach(function (key) {
                      unexpectedKeyCache[key] = true;
                    });

                    if (unexpectedKeys.length > 0) {
                      return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
                    }
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

                      if ("development" !== 'production') {
                        if (typeof reducers[key] === 'undefined') {
                          warning('No reducer provided for key "' + key + '"');
                        }
                      }

                      if (typeof reducers[key] === 'function') {
                        finalReducers[key] = reducers[key];
                      }
                    }
                    var finalReducerKeys = Object.keys(finalReducers);

                    if ("development" !== 'production') {
                      var unexpectedKeyCache = {};
                    }

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

                      if ("development" !== 'production') {
                        var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
                        if (warningMessage) {
                          warning(warningMessage);
                        }
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

                  var _extends = Object.assign || function (target) {
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

                        return _extends({}, store, {
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

                  if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
                    warning('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
                  }

                  // Imports
                  var IMPORT_ELEMENT = 'import-element';
                  var IMPORT_ELEMENT_SUCCESSFUL = 'import-element-successful';
                  var IMPORT_ELEMENT_FAILED = 'import-element-failed';

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
                  var GET_DATA = 'get-data';
                  var GET_DATA_SUCCESSFUL = 'get-data-successful';
                  var SET_DATA = 'set-data';
                  var SET_DATA_SUCCESSFUL = 'set-data-successful';
                  var REMOVE_DATA = 'remove-data';
                  var REMOVE_DATA_SUCCESSFUL = 'remove-data-successful';
                  // Data + API
                  var GET_DATA_FROM_API = 'get-data-from-api';
                  var GET_DATA_FROM_API_SUCCESSFUL = 'get-data-from-api-successful';
                  var GET_DATA_FROM_API_FAILED = 'get-data-from-api-failed';

                  var SET_DATA_TO_API = 'set-data-to-api';
                  var SET_DATA_TO_API_SUCCESSFUL = 'set-data-to-api-successful';
                  var SET_DATA_TO_API_FAILED = 'set-data-to-api-failed';

                  var REMOVE_DATA_FROM_API = 'remove-data-from-api';
                  var REMOVE_DATA_FROM_API_SUCCESSFUL = 'remove-data-from-api-successful';
                  var REMOVE_DATA_FROM_API_FAILED = 'remove-data-from-api-failed';

                  // Editing
                  var EDIT_ACTIVE = 'edit-active';
                  var EDIT_INACTIVE = 'edit-inactive';

                  function setOption(prop, value) {
                    return {
                      type: SET_OPTION,
                      prop: prop,
                      value: value
                    };
                  }

                  function syncImportElement(href) {
                    return {
                      type: IMPORT_ELEMENT,
                      href: href
                    };
                  }

                  function importElementFailed(href, error) {
                    return {
                      type: IMPORT_ELEMENT_FAILED,
                      href: href
                    };
                  }

                  function importElementSuccess(href) {
                    return {
                      type: IMPORT_ELEMENT_SUCCESSFUL,
                      href: href
                    };
                  }

                  function importElement(href) {
                    return function (dispatch, getState) {
                      var _getState = getState();

                      var imports = _getState.imports;
                      var link = void 0;

                      link = document.createElement('link');
                      link.href = href;
                      link.rel = 'import';
                      link.async = true;

                      if (imports[link.href] && imports[link.href].status !== 'failed') {
                        return;
                      }

                      dispatch(syncImportElement(link.href));

                      return new Promise(function (resolve, reject) {
                        link.onload = resolve;
                        link.onerror = reject;
                        document.head.appendChild(link);
                      }).then(function () {
                        return dispatch(importElementSuccess(link.href));
                      }, function () {
                        return dispatch(importElementFailed(link.href));
                      });
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

                  (function (self) {
                    'use strict';

                    if (self.fetch) {
                      return;
                    }

                    var support = {
                      searchParams: 'URLSearchParams' in self,
                      iterable: 'Symbol' in self && 'iterator' in Symbol,
                      blob: 'FileReader' in self && 'Blob' in self && function () {
                        try {
                          new Blob();
                          return true;
                        } catch (e) {
                          return false;
                        }
                      }(),
                      formData: 'FormData' in self,
                      arrayBuffer: 'ArrayBuffer' in self
                    };

                    function normalizeName(name) {
                      if (typeof name !== 'string') {
                        name = String(name);
                      }
                      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
                        throw new TypeError('Invalid character in header field name');
                      }
                      return name.toLowerCase();
                    }

                    function normalizeValue(value) {
                      if (typeof value !== 'string') {
                        value = String(value);
                      }
                      return value;
                    }

                    // Build a destructive iterator for the value list
                    function iteratorFor(items) {
                      var iterator = {
                        next: function next() {
                          var value = items.shift();
                          return { done: value === undefined, value: value };
                        }
                      };

                      if (support.iterable) {
                        iterator[Symbol.iterator] = function () {
                          return iterator;
                        };
                      }

                      return iterator;
                    }

                    function Headers(headers) {
                      this.map = {};

                      if (headers instanceof Headers) {
                        headers.forEach(function (value, name) {
                          this.append(name, value);
                        }, this);
                      } else if (headers) {
                        Object.getOwnPropertyNames(headers).forEach(function (name) {
                          this.append(name, headers[name]);
                        }, this);
                      }
                    }

                    Headers.prototype.append = function (name, value) {
                      name = normalizeName(name);
                      value = normalizeValue(value);
                      var list = this.map[name];
                      if (!list) {
                        list = [];
                        this.map[name] = list;
                      }
                      list.push(value);
                    };

                    Headers.prototype['delete'] = function (name) {
                      delete this.map[normalizeName(name)];
                    };

                    Headers.prototype.get = function (name) {
                      var values = this.map[normalizeName(name)];
                      return values ? values[0] : null;
                    };

                    Headers.prototype.getAll = function (name) {
                      return this.map[normalizeName(name)] || [];
                    };

                    Headers.prototype.has = function (name) {
                      return this.map.hasOwnProperty(normalizeName(name));
                    };

                    Headers.prototype.set = function (name, value) {
                      this.map[normalizeName(name)] = [normalizeValue(value)];
                    };

                    Headers.prototype.forEach = function (callback, thisArg) {
                      Object.getOwnPropertyNames(this.map).forEach(function (name) {
                        this.map[name].forEach(function (value) {
                          callback.call(thisArg, value, name, this);
                        }, this);
                      }, this);
                    };

                    Headers.prototype.keys = function () {
                      var items = [];
                      this.forEach(function (value, name) {
                        items.push(name);
                      });
                      return iteratorFor(items);
                    };

                    Headers.prototype.values = function () {
                      var items = [];
                      this.forEach(function (value) {
                        items.push(value);
                      });
                      return iteratorFor(items);
                    };

                    Headers.prototype.entries = function () {
                      var items = [];
                      this.forEach(function (value, name) {
                        items.push([name, value]);
                      });
                      return iteratorFor(items);
                    };

                    if (support.iterable) {
                      Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
                    }

                    function consumed(body) {
                      if (body.bodyUsed) {
                        return Promise.reject(new TypeError('Already read'));
                      }
                      body.bodyUsed = true;
                    }

                    function fileReaderReady(reader) {
                      return new Promise(function (resolve, reject) {
                        reader.onload = function () {
                          resolve(reader.result);
                        };
                        reader.onerror = function () {
                          reject(reader.error);
                        };
                      });
                    }

                    function readBlobAsArrayBuffer(blob) {
                      var reader = new FileReader();
                      reader.readAsArrayBuffer(blob);
                      return fileReaderReady(reader);
                    }

                    function readBlobAsText(blob) {
                      var reader = new FileReader();
                      reader.readAsText(blob);
                      return fileReaderReady(reader);
                    }

                    function Body() {
                      this.bodyUsed = false;

                      this._initBody = function (body) {
                        this._bodyInit = body;
                        if (typeof body === 'string') {
                          this._bodyText = body;
                        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                          this._bodyBlob = body;
                        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                          this._bodyFormData = body;
                        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                          this._bodyText = body.toString();
                        } else if (!body) {
                          this._bodyText = '';
                        } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
                          // Only support ArrayBuffers for POST method.
                          // Receiving ArrayBuffers happens via Blobs, instead.
                        } else {
                          throw new Error('unsupported BodyInit type');
                        }

                        if (!this.headers.get('content-type')) {
                          if (typeof body === 'string') {
                            this.headers.set('content-type', 'text/plain;charset=UTF-8');
                          } else if (this._bodyBlob && this._bodyBlob.type) {
                            this.headers.set('content-type', this._bodyBlob.type);
                          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                            this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
                          }
                        }
                      };

                      if (support.blob) {
                        this.blob = function () {
                          var rejected = consumed(this);
                          if (rejected) {
                            return rejected;
                          }

                          if (this._bodyBlob) {
                            return Promise.resolve(this._bodyBlob);
                          } else if (this._bodyFormData) {
                            throw new Error('could not read FormData body as blob');
                          } else {
                            return Promise.resolve(new Blob([this._bodyText]));
                          }
                        };

                        this.arrayBuffer = function () {
                          return this.blob().then(readBlobAsArrayBuffer);
                        };

                        this.text = function () {
                          var rejected = consumed(this);
                          if (rejected) {
                            return rejected;
                          }

                          if (this._bodyBlob) {
                            return readBlobAsText(this._bodyBlob);
                          } else if (this._bodyFormData) {
                            throw new Error('could not read FormData body as text');
                          } else {
                            return Promise.resolve(this._bodyText);
                          }
                        };
                      } else {
                        this.text = function () {
                          var rejected = consumed(this);
                          return rejected ? rejected : Promise.resolve(this._bodyText);
                        };
                      }

                      if (support.formData) {
                        this.formData = function () {
                          return this.text().then(decode);
                        };
                      }

                      this.json = function () {
                        return this.text().then(JSON.parse);
                      };

                      return this;
                    }

                    // HTTP methods whose capitalization should be normalized
                    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

                    function normalizeMethod(method) {
                      var upcased = method.toUpperCase();
                      return methods.indexOf(upcased) > -1 ? upcased : method;
                    }

                    function Request(input, options) {
                      options = options || {};
                      var body = options.body;
                      if (Request.prototype.isPrototypeOf(input)) {
                        if (input.bodyUsed) {
                          throw new TypeError('Already read');
                        }
                        this.url = input.url;
                        this.credentials = input.credentials;
                        if (!options.headers) {
                          this.headers = new Headers(input.headers);
                        }
                        this.method = input.method;
                        this.mode = input.mode;
                        if (!body) {
                          body = input._bodyInit;
                          input.bodyUsed = true;
                        }
                      } else {
                        this.url = input;
                      }

                      this.credentials = options.credentials || this.credentials || 'omit';
                      if (options.headers || !this.headers) {
                        this.headers = new Headers(options.headers);
                      }
                      this.method = normalizeMethod(options.method || this.method || 'GET');
                      this.mode = options.mode || this.mode || null;
                      this.referrer = null;

                      if ((this.method === 'GET' || this.method === 'HEAD') && body) {
                        throw new TypeError('Body not allowed for GET or HEAD requests');
                      }
                      this._initBody(body);
                    }

                    Request.prototype.clone = function () {
                      return new Request(this);
                    };

                    function decode(body) {
                      var form = new FormData();
                      body.trim().split('&').forEach(function (bytes) {
                        if (bytes) {
                          var split = bytes.split('=');
                          var name = split.shift().replace(/\+/g, ' ');
                          var value = split.join('=').replace(/\+/g, ' ');
                          form.append(decodeURIComponent(name), decodeURIComponent(value));
                        }
                      });
                      return form;
                    }

                    function headers(xhr) {
                      var head = new Headers();
                      var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n');
                      pairs.forEach(function (header) {
                        var split = header.trim().split(':');
                        var key = split.shift().trim();
                        var value = split.join(':').trim();
                        head.append(key, value);
                      });
                      return head;
                    }

                    Body.call(Request.prototype);

                    function Response(bodyInit, options) {
                      if (!options) {
                        options = {};
                      }

                      this.type = 'default';
                      this.status = options.status;
                      this.ok = this.status >= 200 && this.status < 300;
                      this.statusText = options.statusText;
                      this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
                      this.url = options.url || '';
                      this._initBody(bodyInit);
                    }

                    Body.call(Response.prototype);

                    Response.prototype.clone = function () {
                      return new Response(this._bodyInit, {
                        status: this.status,
                        statusText: this.statusText,
                        headers: new Headers(this.headers),
                        url: this.url
                      });
                    };

                    Response.error = function () {
                      var response = new Response(null, { status: 0, statusText: '' });
                      response.type = 'error';
                      return response;
                    };

                    var redirectStatuses = [301, 302, 303, 307, 308];

                    Response.redirect = function (url, status) {
                      if (redirectStatuses.indexOf(status) === -1) {
                        throw new RangeError('Invalid status code');
                      }

                      return new Response(null, { status: status, headers: { location: url } });
                    };

                    self.Headers = Headers;
                    self.Request = Request;
                    self.Response = Response;

                    self.fetch = function (input, init) {
                      return new Promise(function (resolve, reject) {
                        var request;
                        if (Request.prototype.isPrototypeOf(input) && !init) {
                          request = input;
                        } else {
                          request = new Request(input, init);
                        }

                        var xhr = new XMLHttpRequest();

                        function responseURL() {
                          if ('responseURL' in xhr) {
                            return xhr.responseURL;
                          }

                          // Avoid security warnings on getResponseHeader when not allowed by CORS
                          if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
                            return xhr.getResponseHeader('X-Request-URL');
                          }

                          return;
                        }

                        xhr.onload = function () {
                          var options = {
                            status: xhr.status,
                            statusText: xhr.statusText,
                            headers: headers(xhr),
                            url: responseURL()
                          };
                          var body = 'response' in xhr ? xhr.response : xhr.responseText;
                          resolve(new Response(body, options));
                        };

                        xhr.onerror = function () {
                          reject(new TypeError('Network request failed'));
                        };

                        xhr.ontimeout = function () {
                          reject(new TypeError('Network request failed'));
                        };

                        xhr.open(request.method, request.url, true);

                        if (request.credentials === 'include') {
                          xhr.withCredentials = true;
                        }

                        if ('responseType' in xhr && support.blob) {
                          xhr.responseType = 'blob';
                        }

                        request.headers.forEach(function (value, name) {
                          xhr.setRequestHeader(name, value);
                        });

                        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
                      });
                    };
                    self.fetch.polyfill = true;
                  })(typeof self !== 'undefined' ? self : this);

                  var fetchNpmBrowserify = createCommonjsModule(function (module) {
                    // the whatwg-fetch polyfill installs the fetch() function
                    // on the global object (window or self)
                    //
                    // Return that as the export for use in Webpack, Browserify etc.

                    module.exports = self.fetch.bind(self);
                  });

                  interopDefault(fetchNpmBrowserify);

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
                    var fetchOptions = Object.assign({}, options);

                    fetchOptions.headers = Object.assign({
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                    }, fetchOptions.headers);

                    if (options.body) {
                      fetchOptions.body = JSON.stringify(options.body);
                    }

                    return fetch(options.url, fetchOptions).then(checkStatus).then(function (response) {
                      return response.json();
                    });
                  };

                  function requestWithToken(options) {
                    var token = options.token;

                    if (token) {
                      options.headers = Object.assign({
                        'Authorization': 'Bearer ' + token
                      }, options.headers);
                    }

                    return request(options);
                  }

                  var client = {
                    get: function get(url, options) {
                      return request(Object.assign({ method: 'GET' }, options, { url: url }));
                    },
                    post: function post(url, options) {
                      return requestWithToken(Object.assign({ method: 'POST' }, options, { url: url }));
                    },
                    put: function put(url, options) {
                      return requestWithToken(Object.assign({ method: 'PUT' }, options, { url: url }));
                    },
                    delete: function _delete(url, options) {
                      return requestWithToken(Object.assign({ method: 'DELETE' }, options, { url: url }));
                    }
                  };

                  function syncLogin(_ref) {
                    var email = _ref.email;
                    var password = _ref.password;

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

                  function login(_ref2) {
                    var email = _ref2.email;
                    var password = _ref2.password;

                    return function (dispatch, getState) {
                      var authEndpoint = getState().options.authEndpoint;


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

                  function logout() {
                    return function (dispatch) {
                      dispatch(syncLogout());
                      return Promise.resolve().then(function () {
                        return dispatch(logoutSuccessful());
                      });
                    };
                  }

                  var DATA_PREFIX = 'data';

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

                  function storeToObserver(store) {
                    return {
                      observe: function observe() {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                          args[_key] = arguments[_key];
                        }

                        var onChange = args.pop(),
                            selector = args[0],
                            lastState = void 0,
                            unsubscribe = void 0,
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

                        return store.subscribe(handleChange);
                      }
                    };
                  }

                  function ensureActionMatches(expectedType) {
                    return function (action) {
                      return action.type === expectedType ? Promise.resolve(action) : Promise.reject(action);
                    };
                  }

                  function dispatchThunkAndExpect(store) {
                    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                      args[_key2 - 1] = arguments[_key2];
                    }

                    return runDispatchAndExpect.apply(undefined, [store.dispatch].concat(args));
                  }

                  function runDispatchAndExpect(dispatch, action, expectedType) {
                    return dispatch(action).then(ensureActionMatches(expectedType)).then(function (action) {
                      return action.response;
                    }, function (action) {
                      return Promise.reject(action.response);
                    });
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
                    var uid = _ref.uid;
                    var dataEndpoint = _ref.endpoint;
                    var token = _ref.token;
                    var method = _ref.method;
                    var body = _ref.body;

                    var endpoint = dataEndpoint + '/' + uid,
                        invalid = isInvalid(uid),
                        args = [endpoint];

                    if (invalid) {
                      return Promise.reject(new Error(invalid));
                    }

                    return client[method](endpoint, {
                      body: body,
                      token: token
                    });
                  }

                  function generateRequestActions(start, success, fail) {
                    return [function (uid, data) {
                      return { type: start, uid: uid, data: data };
                    }, function (uid, response) {
                      return { type: success, uid: uid, response: response };
                    }, function (uid, error) {
                      return { type: fail, uid: uid, error: error };
                    }];
                  }

                  function generateHandler(method, _ref2) {
                    var _ref3 = babelHelpers.slicedToArray(_ref2, 3);

                    var start = _ref3[0];
                    var success = _ref3[1];
                    var fail = _ref3[2];

                    return function (uid, body) {
                      return function (dispatch, getState) {
                        var _getState = getState();

                        var options = _getState.options;
                        var token = _getState.token;
                        var endpoint = options.dataEndpoint;

                        dispatch(start(uid, body));
                        return formatAndRun({ method: method, uid: uid, body: body, endpoint: endpoint, token: token }).then(function (response) {
                          return dispatch(success(uid, response));
                        }, function (error) {
                          return dispatch(fail(uid, error));
                        });
                      };
                    };
                  }

                  var _generateRequestActio = generateRequestActions(GET_DATA_FROM_API, GET_DATA_FROM_API_SUCCESSFUL, GET_DATA_FROM_API_FAILED);

                  var _generateRequestActio2 = babelHelpers.slicedToArray(_generateRequestActio, 3);

                  var getData$1 = _generateRequestActio2[0];
                  var getDataSuccessful$1 = _generateRequestActio2[1];
                  var getDataFailed = _generateRequestActio2[2];
                  var _generateRequestActio3 = generateRequestActions(SET_DATA_TO_API, SET_DATA_TO_API_SUCCESSFUL, SET_DATA_TO_API_FAILED);

                  var _generateRequestActio4 = babelHelpers.slicedToArray(_generateRequestActio3, 3);

                  var setData$1 = _generateRequestActio4[0];
                  var setDataSuccessful$1 = _generateRequestActio4[1];
                  var setDataFailed = _generateRequestActio4[2];
                  var _generateRequestActio5 = generateRequestActions(REMOVE_DATA_FROM_API, REMOVE_DATA_FROM_API_SUCCESSFUL, REMOVE_DATA_FROM_API_FAILED);

                  var _generateRequestActio6 = babelHelpers.slicedToArray(_generateRequestActio5, 3);

                  var removeData$1 = _generateRequestActio6[0];
                  var removeDataSuccessful$1 = _generateRequestActio6[1];
                  var removeDataFailed = _generateRequestActio6[2];
                  var get$1 = generateHandler('get', [getData$1, getDataSuccessful$1, getDataFailed]);
                  var set$2 = generateHandler('put', [setData$1, setDataSuccessful$1, setDataFailed]);
                  var remove$1 = generateHandler('delete', [removeData$1, removeDataSuccessful$1, removeDataFailed]);

                  function getData(uid) {
                    return {
                      type: GET_DATA,
                      uid: uid
                    };
                  }

                  function getDataSuccessful(uid, response) {
                    return {
                      type: GET_DATA_SUCCESSFUL,
                      response: response,
                      uid: uid
                    };
                  }

                  function setData(uid, data) {
                    return {
                      type: SET_DATA,
                      uid: uid,
                      data: data
                    };
                  }

                  function setDataSuccessful(uid, response) {
                    return {
                      type: SET_DATA_SUCCESSFUL,
                      response: response,
                      uid: uid
                    };
                  }

                  function removeData(uid) {
                    return {
                      type: REMOVE_DATA,
                      uid: uid
                    };
                  }

                  function removeDataSuccessful(uid) {
                    return {
                      type: REMOVE_DATA_SUCCESSFUL,
                      uid: uid
                    };
                  }

                  function get(uid) {
                    return function (dispatch, getState) {
                      var state = void 0,
                          stored = void 0,
                          fetchData = void 0;

                      dispatch(getData(uid));

                      state = getState();
                      stored = selectPropByPath(DATA_PREFIX + '.' + uid, state);

                      if (typeof stored === 'undefined') {
                        fetchData = runDispatchAndExpect(dispatch, get$1(uid), GET_DATA_FROM_API_SUCCESSFUL).then(function (response) {
                          return runDispatchAndExpect(dispatch, set$1(uid, response), SET_DATA_SUCCESSFUL);
                        });
                      } else {
                        fetchData = Promise.resolve(stored);
                      }

                      return fetchData.then(function (response) {
                        return dispatch(getDataSuccessful(uid, response));
                      });
                    };
                  }

                  function set$1(uid, data) {
                    return function (dispatch, getState) {
                      dispatch(setData(uid, data));

                      return Promise.resolve().then(function () {
                        return dispatch(setDataSuccessful(uid, data));
                      });
                    };
                  }

                  function remove(uid, data) {
                    return function (dispatch, getState) {
                      dispatch(removeData(uid));

                      return Promise.resolve().then(function () {
                        return dispatch(removeDataSuccessful(uid));
                      });
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

                  function save() {
                    return function (dispatch, getState) {
                      dispatch(startSave());

                      var saveState = getState().save,
                          entries = Object.keys(saveState).map(function (uid) {
                        return [uid, saveState[uid]];
                      });

                      var shouldRemove = function shouldRemove(_ref) {
                        var _ref2 = babelHelpers.slicedToArray(_ref, 2);

                        var _ref2$ = _ref2[1];
                        var local = _ref2$.local;
                        var changed = _ref2$.changed;
                        return local === null && changed;
                      },
                          shouldSet = function shouldSet(_ref3) {
                        var _ref4 = babelHelpers.slicedToArray(_ref3, 2);

                        var _ref4$ = _ref4[1];
                        var local = _ref4$.local;
                        var changed = _ref4$.changed;
                        return local !== null && changed;
                      };

                      var setPromises = entries.filter(shouldSet).map(function (_ref5) {
                        var _ref6 = babelHelpers.slicedToArray(_ref5, 2);

                        var uid = _ref6[0];
                        var local = _ref6[1].local;
                        return set$2(uid, local);
                      }).map(function (action) {
                        return runDispatchAndExpect(dispatch, action, SET_DATA_TO_API_SUCCESSFUL);
                      });

                      var removePromises = entries.filter(shouldRemove).map(function (_ref7) {
                        var _ref8 = babelHelpers.slicedToArray(_ref7, 1);

                        var uid = _ref8[0];
                        return remove$1(uid);
                      }).map(function (action) {
                        return runDispatchAndExpect(dispatch, action, REMOVE_DATA_FROM_API_SUCCESSFUL);
                      });

                      return Promise.all([].concat(babelHelpers.toConsumableArray(setPromises), babelHelpers.toConsumableArray(removePromises))).then(function () {
                        return dispatch(saveSuccessful());
                      }, function () {
                        return dispatch(saveFailed());
                      });
                    };
                  }

                  var AUTH_SERVER = 'https://api.simpla.io';
                  var ELEMENTS_SERVER = 'https://elements.simpla.io';
                  var ELEMENTS = ['simpla-img/simpla-img.html', 'simpla-text/simpla-text.html', 'simpla-block/simpla-block.html', 'sm-module-login/sm-module-login.html', 'sm-module-save/sm-module-save.html'];

                  var BASE_PATH = ELEMENTS_SERVER + '/';

                  /**
                   * Hides <default-content> elements by injecting a style tag into the head
                   * @return {undefined}
                   */
                  function hideDefaultContent() {
                    var style = document.createElement('style');
                    style.innerHTML = 'default-content { display: none; }';
                    document.head.appendChild(style);
                  }

                  /**
                   * Ready web components in the browser. If webcomponents are natively supported
                   * 	it will do nothing, otherwise it will load in the webcomponents polyfills
                   * @return {Promise}  Promise which resolves once web components is definitely ready
                   */
                  function readyWebComponents() {
                    // Conditionally load WCjs
                    var webComponentsSupported = 'registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template');

                    if (webComponentsSupported) {
                      return Promise.resolve();
                    }

                    /**
                     * Load in web components polyfill
                     * @return {Promise} Promise which resolves once finished
                     */
                    return new Promise(function (resolve) {
                      var script = document.createElement('script');
                      script.async = true;
                      script.src = ELEMENTS_SERVER + '/webcomponentsjs/webcomponents-lite.min.js';
                      script.onload = resolve;
                      document.head.appendChild(script);
                    });
                  };

                  /**
                   * Configure Polymer with dom = shadow, unless Polymer is already defined
                   * @return {undefined}
                   */
                  function configurePolymer() {
                    window.Polymer = window.Polymer || { dom: 'shadow' };
                  }

                  var index = createCommonjsModule(function (module) {
                    'use strict';

                    var has = Object.prototype.hasOwnProperty;

                    //
                    // We store our EE objects in a plain object whose properties are event names.
                    // If `Object.create(null)` is not supported we prefix the event names with a
                    // `~` to make sure that the built-in object properties are not overridden or
                    // used as an attack vector.
                    // We also assume that `Object.create(null)` is available when the event name
                    // is an ES6 Symbol.
                    //
                    var prefix = typeof Object.create !== 'function' ? '~' : false;

                    /**
                     * Representation of a single EventEmitter function.
                     *
                     * @param {Function} fn Event handler to be called.
                     * @param {Mixed} context Context for function execution.
                     * @param {Boolean} [once=false] Only emit once
                     * @api private
                     */
                    function EE(fn, context, once) {
                      this.fn = fn;
                      this.context = context;
                      this.once = once || false;
                    }

                    /**
                     * Minimal EventEmitter interface that is molded against the Node.js
                     * EventEmitter interface.
                     *
                     * @constructor
                     * @api public
                     */
                    function EventEmitter() {} /* Nothing to set */

                    /**
                     * Hold the assigned EventEmitters by name.
                     *
                     * @type {Object}
                     * @private
                     */
                    EventEmitter.prototype._events = undefined;

                    /**
                     * Return an array listing the events for which the emitter has registered
                     * listeners.
                     *
                     * @returns {Array}
                     * @api public
                     */
                    EventEmitter.prototype.eventNames = function eventNames() {
                      var events = this._events,
                          names = [],
                          name;

                      if (!events) return names;

                      for (name in events) {
                        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
                      }

                      if (Object.getOwnPropertySymbols) {
                        return names.concat(Object.getOwnPropertySymbols(events));
                      }

                      return names;
                    };

                    /**
                     * Return a list of assigned event listeners.
                     *
                     * @param {String} event The events that should be listed.
                     * @param {Boolean} exists We only need to know if there are listeners.
                     * @returns {Array|Boolean}
                     * @api public
                     */
                    EventEmitter.prototype.listeners = function listeners(event, exists) {
                      var evt = prefix ? prefix + event : event,
                          available = this._events && this._events[evt];

                      if (exists) return !!available;
                      if (!available) return [];
                      if (available.fn) return [available.fn];

                      for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
                        ee[i] = available[i].fn;
                      }

                      return ee;
                    };

                    /**
                     * Emit an event to all registered event listeners.
                     *
                     * @param {String} event The name of the event.
                     * @returns {Boolean} Indication if we've emitted an event.
                     * @api public
                     */
                    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
                      var evt = prefix ? prefix + event : event;

                      if (!this._events || !this._events[evt]) return false;

                      var listeners = this._events[evt],
                          len = arguments.length,
                          args,
                          i;

                      if ('function' === typeof listeners.fn) {
                        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

                        switch (len) {
                          case 1:
                            return listeners.fn.call(listeners.context), true;
                          case 2:
                            return listeners.fn.call(listeners.context, a1), true;
                          case 3:
                            return listeners.fn.call(listeners.context, a1, a2), true;
                          case 4:
                            return listeners.fn.call(listeners.context, a1, a2, a3), true;
                          case 5:
                            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
                          case 6:
                            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
                        }

                        for (i = 1, args = new Array(len - 1); i < len; i++) {
                          args[i - 1] = arguments[i];
                        }

                        listeners.fn.apply(listeners.context, args);
                      } else {
                        var length = listeners.length,
                            j;

                        for (i = 0; i < length; i++) {
                          if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

                          switch (len) {
                            case 1:
                              listeners[i].fn.call(listeners[i].context);break;
                            case 2:
                              listeners[i].fn.call(listeners[i].context, a1);break;
                            case 3:
                              listeners[i].fn.call(listeners[i].context, a1, a2);break;
                            default:
                              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                                args[j - 1] = arguments[j];
                              }

                              listeners[i].fn.apply(listeners[i].context, args);
                          }
                        }
                      }

                      return true;
                    };

                    /**
                     * Register a new EventListener for the given event.
                     *
                     * @param {String} event Name of the event.
                     * @param {Function} fn Callback function.
                     * @param {Mixed} [context=this] The context of the function.
                     * @api public
                     */
                    EventEmitter.prototype.on = function on(event, fn, context) {
                      var listener = new EE(fn, context || this),
                          evt = prefix ? prefix + event : event;

                      if (!this._events) this._events = prefix ? {} : Object.create(null);
                      if (!this._events[evt]) this._events[evt] = listener;else {
                        if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];
                      }

                      return this;
                    };

                    /**
                     * Add an EventListener that's only called once.
                     *
                     * @param {String} event Name of the event.
                     * @param {Function} fn Callback function.
                     * @param {Mixed} [context=this] The context of the function.
                     * @api public
                     */
                    EventEmitter.prototype.once = function once(event, fn, context) {
                      var listener = new EE(fn, context || this, true),
                          evt = prefix ? prefix + event : event;

                      if (!this._events) this._events = prefix ? {} : Object.create(null);
                      if (!this._events[evt]) this._events[evt] = listener;else {
                        if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];
                      }

                      return this;
                    };

                    /**
                     * Remove event listeners.
                     *
                     * @param {String} event The event we want to remove.
                     * @param {Function} fn The listener that we need to find.
                     * @param {Mixed} context Only remove listeners matching this context.
                     * @param {Boolean} once Only remove once listeners.
                     * @api public
                     */
                    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
                      var evt = prefix ? prefix + event : event;

                      if (!this._events || !this._events[evt]) return this;

                      var listeners = this._events[evt],
                          events = [];

                      if (fn) {
                        if (listeners.fn) {
                          if (listeners.fn !== fn || once && !listeners.once || context && listeners.context !== context) {
                            events.push(listeners);
                          }
                        } else {
                          for (var i = 0, length = listeners.length; i < length; i++) {
                            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
                              events.push(listeners[i]);
                            }
                          }
                        }
                      }

                      //
                      // Reset the array, or remove it completely if we have no more listeners.
                      //
                      if (events.length) {
                        this._events[evt] = events.length === 1 ? events[0] : events;
                      } else {
                        delete this._events[evt];
                      }

                      return this;
                    };

                    /**
                     * Remove all listeners or only the listeners for the specified event.
                     *
                     * @param {String} event The event want to remove all listeners for.
                     * @api public
                     */
                    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
                      if (!this._events) return this;

                      if (event) delete this._events[prefix ? prefix + event : event];else this._events = prefix ? {} : Object.create(null);

                      return this;
                    };

                    //
                    // Alias methods names because people roll like that.
                    //
                    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
                    EventEmitter.prototype.addListener = EventEmitter.prototype.on;

                    //
                    // This function doesn't apply anymore.
                    //
                    EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
                      return this;
                    };

                    //
                    // Expose the prefix.
                    //
                    EventEmitter.prefixed = prefix;

                    //
                    // Expose the module.
                    //
                    if ('undefined' !== typeof module) {
                      module.exports = EventEmitter;
                    }
                  });

                  var EventEmitter = interopDefault(index);

                  var emitter = new EventEmitter();

                  /**
                   * NOTE: This is here purely for backwards compatibility, in future it should
                   * 	be removed when possible
                   * 	@return {undefined}
                   */
                  function supportDeprecatedInitializer(Simpla) {
                    var tag = document.querySelector('script[simpla-api]'),
                        project = tag && tag.getAttribute('simpla-api');

                    if (project) {
                      console.warn('The [simpla-api] attribute setup method is deprecated. Please use Simpla(\'' + project + '\') instead, see https://www.simpla.io/docs/start');
                      Simpla(project);
                    }
                  }

                  /**
                   * NOTE: Also for backwards compatibility. This below is a private API and can be
                   * 	safely removed once all elements who depend on it are upgraded
                   * 	@return {undefined}
                   */
                  function supportDeprecatedConfig(Simpla) {
                    var projectObserver = function projectObserver(project) {
                      window.simpla.config.api = project;
                    },
                        authEndpointObserver = function authEndpointObserver(authEndpoint) {
                      window.simpla.config.server = authEndpoint;
                    };

                    window.simpla = window.simpla || {};
                    window.simpla.config = window.simpla.config || {};

                    Simpla.observe('options.project', projectObserver);
                    Simpla.observe('options.authEndpoint', authEndpointObserver);
                  }

                  var HASH_EDIT = '#edit';

                  function hashTracking(Simpla) {
                    var unobserve = function unobserve() {};

                    // Part one, bind from hash to Simpla
                    function hashObserver(_ref) {
                      var target = _ref.target;

                      if (target.location.hash === HASH_EDIT) {
                        Simpla.toggleEditing(true);
                      } else {
                        Simpla.toggleEditing(false);
                      }
                    }

                    function updateHash(editing) {
                      if (editing) {
                        window.location.hash = HASH_EDIT;
                      } else {
                        window.location.hash = '';
                      }
                    }

                    function startTracking() {
                      window.addEventListener('hashchange', hashObserver);

                      // Kickstart it
                      hashObserver({ target: window });

                      // Part two, bind from Simpla to hash
                      unobserve = Simpla.observe('editing', updateHash);
                    }

                    function stopTracking() {
                      window.removeEventListener('hashchange', hashObserver);
                      unobserve();
                    }

                    Simpla.observe('options._useHashTracking', function (shouldTrack) {
                      if (shouldTrack) {
                        startTracking();
                      } else {
                        stopTracking();
                      }
                    });

                    if (Simpla.getState().options._useHashTracking) {
                      startTracking();
                    }
                  }

                  var SESSION_KEY = 'sm-session';
                  var SECOND = 1000;
                  var INTERVAL = 10 * SECOND;
                  function usageMonitoring (Simpla) {

                    /**
                     * Ping the server at the usage endpoint
                     * @return {undefined}
                     */
                    function ping(endpoint) {
                      var elements = document.querySelectorAll('simpla-text, simpla-img').length;

                      fetch(endpoint, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ elements: elements })
                      });
                    }

                    /**
                     * Check if user is still within the session time period
                     * @return {Boolean} true if still in session, false otherwise
                     */
                    function stillInSession() {
                      var expiry = void 0,
                          now = void 0;

                      try {
                        expiry = window.localStorage.getItem(SESSION_KEY);
                      } catch (e) {
                        expiry = null;
                      }

                      now = Date.now();

                      return expiry && parseInt(expiry) > now;
                    }

                    /**
                     * Update the session to now + interval time
                     * @return {undefined}
                     */
                    function resetSession() {
                      try {
                        window.localStorage.setItem(SESSION_KEY, Date.now() + INTERVAL);
                      } catch (e) {
                        // Fail silently, thisis low priority work and doesn't matter greatly if
                        //  we cant set
                      }
                    }

                    function checkAndPing(_ref) {
                      var authEndpoint = _ref.authEndpoint;
                      var project = _ref.project;

                      var endpoint = authEndpoint + '/projects/' + project + '/sessions';

                      if (authEndpoint && project) {
                        ping(endpoint);
                        return true;
                      }

                      return false;
                    }

                    function run() {
                      // If they're not in the session, send a ping to the server
                      if (!stillInSession()) {
                        if (!checkAndPing(Simpla.getState().options)) {
                          (function () {
                            var unobserve = Simpla.observe('options', function (options) {
                              if (checkAndPing(options)) {
                                unobserve();
                              }
                            });
                          })();
                        }
                      }

                      // Reset the session token
                      resetSession();
                    }

                    var documentIsReady = function documentIsReady() {
                      return document.readyState === 'interactive' || document.readyState === 'complete';
                    };
                    if (documentIsReady()) {
                      run();
                    } else {
                      (function () {
                        var listener = function listener() {
                          if (documentIsReady()) {
                            run();
                            document.removeEventListener('readystatechange', listener);
                          }
                        };
                        document.addEventListener('readystatechange', listener);
                      })();
                    }

                    // When they leave the site, reset the session token
                    window.addEventListener('beforeunload', resetSession);
                  }

                  function createThunkMiddleware(extraArgument) {
                    return function (_ref) {
                      var dispatch = _ref.dispatch;
                      var getState = _ref.getState;
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
                    var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
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
                    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var action = arguments[1];

                    switch (action.type) {
                      case SET_OPTION:
                        return Object.assign({}, state, babelHelpers.defineProperty({}, action.prop, action.value));
                      default:
                        return state;
                    }
                  }

                  function singleImportReducer() {
                    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var action = arguments[1];

                    switch (action.type) {
                      case IMPORT_ELEMENT:
                        return Object.assign({}, state, {
                          status: 'loading'
                        });
                      case IMPORT_ELEMENT_FAILED:
                        return Object.assign({}, state, {
                          status: 'failed'
                        });
                      case IMPORT_ELEMENT_SUCCESSFUL:
                        return Object.assign({}, state, {
                          status: 'loaded'
                        });
                      default:
                        return state;
                    }
                  }

                  function imports() {
                    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var action = arguments[1];

                    switch (action.type) {
                      case IMPORT_ELEMENT:
                      case IMPORT_ELEMENT_FAILED:
                      case IMPORT_ELEMENT_SUCCESSFUL:
                        return Object.assign({}, state, babelHelpers.defineProperty({}, action.href, singleImportReducer(state[action.href], action)));
                      default:
                        return state;
                    }
                  }

                  var INITIAL_STATE = false;

                  function editing() {
                    var state = arguments.length <= 0 || arguments[0] === undefined ? INITIAL_STATE : arguments[0];
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

                  var INITIAL_STATE$1 = {};

                  function clone(data) {
                    return JSON.parse(JSON.stringify(data));
                  }

                  function setIn(state, path, data) {
                    var key = path[0],
                        value = path.length === 1 ? clone(data) : setIn(state[key] || {}, path.slice(1), data);

                    return Object.assign({}, state, babelHelpers.defineProperty({}, key, value));
                  }

                  function data() {
                    var state = arguments.length <= 0 || arguments[0] === undefined ? INITIAL_STATE$1 : arguments[0];
                    var action = arguments[1];

                    switch (action.type) {
                      case SET_DATA:
                        return setIn(state, action.uid.split('.'), action.data);
                      case REMOVE_DATA:
                        return setIn(state, action.uid.split('.'), null);
                      default:
                        return state;
                    }
                  }

                  function token() {
                    var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
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
                   * Reduce part of the save state. Designes to be a reducer for arbitrary UID
                   * @param  {Object} [state={}] State of save info at UID
                   * @param  {Object} action     Action being performed on the store
                   * @return {Object}            New state
                   */
                  function reducePart() {
                    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var action = arguments[1];
                    var local = state.local;
                    var remote = state.remote;
                    var changed = state.changed;


                    switch (action.type) {
                      case GET_DATA_FROM_API_SUCCESSFUL:
                      case SET_DATA_TO_API_SUCCESSFUL:
                      case REMOVE_DATA_FROM_API_SUCCESSFUL:
                        remote = action.response || null;
                        changed = isDifferent(remote, local);

                        return Object.assign({}, state, { remote: remote, changed: changed });
                      case SET_DATA_SUCCESSFUL:
                      case REMOVE_DATA_SUCCESSFUL:
                        local = action.response || null;
                        changed = isDifferent(remote, local);

                        return Object.assign({}, state, { local: local, changed: changed });
                      default:
                        return state;
                    }
                  }

                  /**
                   * Save Reducer
                   * @param  {Object} [state={}] Current state
                   * @param  {Object} action       Action to apply to state
                   * @return {Object}              New state
                   */
                  function save$1() {
                    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var action = arguments[1];

                    if (action.hasOwnProperty('uid')) {
                      var uid = action.uid;
                      var currentUidState = state[uid];
                      var newUidState = reducePart(currentUidState, action);

                      if (newUidState !== currentUidState) {
                        return Object.assign({}, state, babelHelpers.defineProperty({}, uid, newUidState));
                      }
                    }

                    return state;
                  }

                  var reducer = combineReducers({
                    authenticated: authenticated,
                    options: options,
                    imports: imports,
                    editing: editing,
                    data: data,
                    token: token,
                    save: save$1
                  });

                  // Create core store
                  var store = createStore(reducer, applyMiddleware(thunk));

                  // Hide Default Content
                  hideDefaultContent();

                  // Conditionally load in web components
                  readyWebComponents();

                  // Setup Polymer configuration
                  configurePolymer();

                  var Simpla = function Simpla(options) {
                    Simpla._store = Simpla._store || store;

                    var project = void 0,
                        base = '',
                        elements = [];

                    // Initialize data endpoint
                    if (typeof options === 'string') {
                      project = options;
                    } else {
                      project = options.project;
                    }

                    Simpla._store.dispatch(setOption('project', project));

                    // Initialize endpoints
                    Simpla._store.dispatch(setOption('authEndpoint', AUTH_SERVER));
                    Simpla._store.dispatch(setOption('dataEndpoint', AUTH_SERVER + '/projects/' + project + '/items'));

                    if (typeof options._useHashTracking !== 'undefined') {
                      Simpla._store.dispatch(setOption('_useHashTracking', options._useHashTracking));
                    } else {
                      Simpla._store.dispatch(setOption('_useHashTracking', true));
                    }

                    // Initialize elements
                    if (typeof options.elements === 'undefined') {
                      // Doesn't exist, use defaults
                      elements = ELEMENTS;
                      base = BASE_PATH;
                    } else if (options.elements instanceof Array) {
                      // Exists and is an array of paths
                      elements = options.elements;
                    } else if (options.elements) {
                      // Exists, and not falsey
                      // Use given, or fallback to defaults
                      elements = options.elements.paths || ELEMENTS;
                      base = options.elements.base || BASE_PATH;
                    }

                    elements.forEach(function (element) {
                      return Simpla._store.dispatch(importElement('' + base + element));
                    });

                    return Simpla;
                  };

                  // Add mixins
                  Object.assign(Simpla, {
                    // Authentication

                    login: function login$$() {
                      return dispatchThunkAndExpect(store, login.apply(undefined, arguments), LOGIN_SUCCESSFUL);
                    },
                    logout: function logout$$() {
                      return dispatchThunkAndExpect(store, logout.apply(undefined, arguments), LOGOUT_SUCCESSFUL);
                    },


                    // Data
                    get: function get$$() {
                      return dispatchThunkAndExpect(store, get.apply(undefined, arguments), GET_DATA_SUCCESSFUL);
                    },
                    set: function set() {
                      return dispatchThunkAndExpect(store, set$1.apply(undefined, arguments), SET_DATA_SUCCESSFUL);
                    },
                    remove: function remove$$() {
                      return dispatchThunkAndExpect(store, remove.apply(undefined, arguments), REMOVE_DATA_SUCCESSFUL);
                    },
                    save: function save$$() {
                      return dispatchThunkAndExpect(store, save.apply(undefined, arguments), SAVE_SUCCESSFUL);
                    },


                    // Events
                    on: function on() {
                      emitter.on.apply(emitter, arguments);
                    },
                    off: function off() {
                      emitter.off.apply(emitter, arguments);
                    },
                    once: function once() {
                      emitter.once.apply(emitter, arguments);
                    },
                    emit: function emit() {
                      emitter.emit.apply(emitter, arguments);
                    },


                    // Editing
                    toggleEditing: function toggleEditing(on) {
                      (this._store || store).dispatch(on ? editActive() : editInactive());
                    },


                    // State
                    getState: function getState() {
                      return (this._store || store).getState();
                    },
                    observe: function observe() {
                      var _storeToObserver;

                      return (_storeToObserver = storeToObserver(this._store || store)).observe.apply(_storeToObserver, arguments);
                    },


                    // Backwards compatibility for previous SDK
                    client: Simpla
                  });

                  // Init plugins
                  [hashTracking, supportDeprecatedInitializer, supportDeprecatedConfig, usageMonitoring].forEach(function (plugin) {
                    return plugin(Simpla);
                  });

                  return Simpla;

}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaW1wbGEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjb3JlLWpzL2ZuL29iamVjdC9hc3NpZ24nO1xuaW1wb3J0ICdjb3JlLWpzL2ZuL3Byb21pc2UnO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IHNldE9wdGlvbiB9IGZyb20gJy4vYWN0aW9ucy9vcHRpb25zJztcbmltcG9ydCB7IGltcG9ydEVsZW1lbnQgfSBmcm9tICcuL2FjdGlvbnMvaW1wb3J0cyc7XG5pbXBvcnQgeyBlZGl0QWN0aXZlLCBlZGl0SW5hY3RpdmUgfSBmcm9tICcuL2FjdGlvbnMvZWRpdGluZyc7XG5pbXBvcnQgeyBsb2dpbiwgbG9nb3V0IH0gZnJvbSAnLi9hY3Rpb25zL2F1dGhlbnRpY2F0aW9uJztcbmltcG9ydCB7IGdldCwgc2V0LCByZW1vdmUgfSBmcm9tICcuL2FjdGlvbnMvZGF0YSc7XG5pbXBvcnQgc2F2ZSBmcm9tICcuL2FjdGlvbnMvc2F2ZSc7XG5pbXBvcnQgeyBBVVRIX1NFUlZFUiwgQkFTRV9QQVRILCBFTEVNRU5UUyB9IGZyb20gJy4vY29uc3RhbnRzL29wdGlvbnMnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgaGlkZURlZmF1bHRDb250ZW50LCByZWFkeVdlYkNvbXBvbmVudHMsIGNvbmZpZ3VyZVBvbHltZXIgfSBmcm9tICcuL3V0aWxzL3ByZXBhcmUnO1xuaW1wb3J0IHsgc3RvcmVUb09ic2VydmVyLCBlbnN1cmVBY3Rpb25NYXRjaGVzLCBkaXNwYXRjaFRodW5rQW5kRXhwZWN0IH0gZnJvbSAnLi91dGlscy9oZWxwZXJzJztcbmltcG9ydCB7IGVtaXR0ZXIgfSBmcm9tICcuL21pZGRsZXdhcmUvZW1pdHRlcic7XG5pbXBvcnQgeyBzdXBwb3J0RGVwcmVjYXRlZENvbmZpZywgc3VwcG9ydERlcHJlY2F0ZWRJbml0aWFsaXplciB9IGZyb20gJy4vcGx1Z2lucy9kZXByZWNhdGlvbic7XG5pbXBvcnQgaGFzaFRyYWNraW5nIGZyb20gJy4vcGx1Z2lucy9oYXNoVHJhY2tpbmcnO1xuaW1wb3J0IHVzYWdlTW9uaXRvcmluZyBmcm9tICcuL3BsdWdpbnMvdXNhZ2VNb25pdG9yaW5nJztcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQgcm9vdFJlZHVjZXIgZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbi8vIENyZWF0ZSBjb3JlIHN0b3JlXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyLCBhcHBseU1pZGRsZXdhcmUodGh1bmspKTtcblxuLy8gSGlkZSBEZWZhdWx0IENvbnRlbnRcbmhpZGVEZWZhdWx0Q29udGVudCgpO1xuXG4vLyBDb25kaXRpb25hbGx5IGxvYWQgaW4gd2ViIGNvbXBvbmVudHNcbnJlYWR5V2ViQ29tcG9uZW50cygpO1xuXG4vLyBTZXR1cCBQb2x5bWVyIGNvbmZpZ3VyYXRpb25cbmNvbmZpZ3VyZVBvbHltZXIoKTtcblxuY29uc3QgU2ltcGxhID0gZnVuY3Rpb24gU2ltcGxhKG9wdGlvbnMpIHtcbiAgU2ltcGxhLl9zdG9yZSA9IFNpbXBsYS5fc3RvcmUgfHwgc3RvcmU7XG5cbiAgbGV0IHByb2plY3QsXG4gICAgICBiYXNlID0gJycsXG4gICAgICBlbGVtZW50cyA9IFtdO1xuXG4gIC8vIEluaXRpYWxpemUgZGF0YSBlbmRwb2ludFxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgcHJvamVjdCA9IG9wdGlvbnM7XG4gIH0gZWxzZSB7XG4gICAgcHJvamVjdCA9IG9wdGlvbnMucHJvamVjdDtcbiAgfVxuXG4gIFNpbXBsYS5fc3RvcmUuZGlzcGF0Y2goc2V0T3B0aW9uKCdwcm9qZWN0JywgcHJvamVjdCkpO1xuXG4gIC8vIEluaXRpYWxpemUgZW5kcG9pbnRzXG4gIFNpbXBsYS5fc3RvcmUuZGlzcGF0Y2goc2V0T3B0aW9uKCdhdXRoRW5kcG9pbnQnLCBBVVRIX1NFUlZFUikpO1xuICBTaW1wbGEuX3N0b3JlLmRpc3BhdGNoKHNldE9wdGlvbignZGF0YUVuZHBvaW50JywgYCR7QVVUSF9TRVJWRVJ9L3Byb2plY3RzLyR7cHJvamVjdH0vaXRlbXNgKSk7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLl91c2VIYXNoVHJhY2tpbmcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgU2ltcGxhLl9zdG9yZS5kaXNwYXRjaChzZXRPcHRpb24oJ191c2VIYXNoVHJhY2tpbmcnLCBvcHRpb25zLl91c2VIYXNoVHJhY2tpbmcpKTtcbiAgfSBlbHNlIHtcbiAgICBTaW1wbGEuX3N0b3JlLmRpc3BhdGNoKHNldE9wdGlvbignX3VzZUhhc2hUcmFja2luZycsIHRydWUpKTtcbiAgfVxuXG4gIC8vIEluaXRpYWxpemUgZWxlbWVudHNcbiAgaWYgKHR5cGVvZiBvcHRpb25zLmVsZW1lbnRzID09PSAndW5kZWZpbmVkJykgeyAvLyBEb2Vzbid0IGV4aXN0LCB1c2UgZGVmYXVsdHNcbiAgICBlbGVtZW50cyA9IEVMRU1FTlRTO1xuICAgIGJhc2UgPSBCQVNFX1BBVEg7XG4gIH0gZWxzZSBpZiAob3B0aW9ucy5lbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5KSB7IC8vIEV4aXN0cyBhbmQgaXMgYW4gYXJyYXkgb2YgcGF0aHNcbiAgICBlbGVtZW50cyA9IG9wdGlvbnMuZWxlbWVudHM7XG4gIH0gZWxzZSBpZiAob3B0aW9ucy5lbGVtZW50cykgeyAvLyBFeGlzdHMsIGFuZCBub3QgZmFsc2V5XG4gICAgLy8gVXNlIGdpdmVuLCBvciBmYWxsYmFjayB0byBkZWZhdWx0c1xuICAgIGVsZW1lbnRzID0gb3B0aW9ucy5lbGVtZW50cy5wYXRocyB8fCBFTEVNRU5UUztcbiAgICBiYXNlID0gb3B0aW9ucy5lbGVtZW50cy5iYXNlIHx8IEJBU0VfUEFUSDtcbiAgfVxuXG4gIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBTaW1wbGEuX3N0b3JlLmRpc3BhdGNoKGltcG9ydEVsZW1lbnQoYCR7YmFzZX0ke2VsZW1lbnR9YCkpKTtcblxuICByZXR1cm4gU2ltcGxhO1xufTtcblxuLy8gQWRkIG1peGluc1xuT2JqZWN0LmFzc2lnbihTaW1wbGEsIHtcbiAgLy8gQXV0aGVudGljYXRpb25cbiAgbG9naW4oLi4uYXJncykge1xuICAgIHJldHVybiBkaXNwYXRjaFRodW5rQW5kRXhwZWN0KHN0b3JlLCBsb2dpbiguLi5hcmdzKSwgdHlwZXMuTE9HSU5fU1VDQ0VTU0ZVTCk7XG4gIH0sXG5cbiAgbG9nb3V0KC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hUaHVua0FuZEV4cGVjdChzdG9yZSwgbG9nb3V0KC4uLmFyZ3MpLCB0eXBlcy5MT0dPVVRfU1VDQ0VTU0ZVTCk7XG4gIH0sXG5cbiAgLy8gRGF0YVxuICBnZXQoLi4uYXJncykge1xuICAgIHJldHVybiBkaXNwYXRjaFRodW5rQW5kRXhwZWN0KHN0b3JlLCBnZXQoLi4uYXJncyksIHR5cGVzLkdFVF9EQVRBX1NVQ0NFU1NGVUwpO1xuICB9LFxuXG4gIHNldCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoVGh1bmtBbmRFeHBlY3Qoc3RvcmUsIHNldCguLi5hcmdzKSwgdHlwZXMuU0VUX0RBVEFfU1VDQ0VTU0ZVTCk7XG4gIH0sXG5cbiAgcmVtb3ZlKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hUaHVua0FuZEV4cGVjdChzdG9yZSwgcmVtb3ZlKC4uLmFyZ3MpLCB0eXBlcy5SRU1PVkVfREFUQV9TVUNDRVNTRlVMKTtcbiAgfSxcblxuICBzYXZlKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hUaHVua0FuZEV4cGVjdChzdG9yZSwgc2F2ZSguLi5hcmdzKSwgdHlwZXMuU0FWRV9TVUNDRVNTRlVMKTtcbiAgfSxcblxuICAvLyBFdmVudHNcbiAgb24oLi4uYXJncykge1xuICAgIGVtaXR0ZXIub24oLi4uYXJncyk7XG4gIH0sXG5cbiAgb2ZmKC4uLmFyZ3MpIHtcbiAgICBlbWl0dGVyLm9mZiguLi5hcmdzKTtcbiAgfSxcblxuICBvbmNlKC4uLmFyZ3MpIHtcbiAgICBlbWl0dGVyLm9uY2UoLi4uYXJncyk7XG4gIH0sXG5cbiAgZW1pdCguLi5hcmdzKSB7XG4gICAgZW1pdHRlci5lbWl0KC4uLmFyZ3MpO1xuICB9LFxuXG4gIC8vIEVkaXRpbmdcbiAgdG9nZ2xlRWRpdGluZyhvbikge1xuICAgICh0aGlzLl9zdG9yZSB8fCBzdG9yZSkuZGlzcGF0Y2gob24gPyBlZGl0QWN0aXZlKCkgOiBlZGl0SW5hY3RpdmUoKSk7XG4gIH0sXG5cbiAgLy8gU3RhdGVcbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9zdG9yZSB8fCBzdG9yZSkuZ2V0U3RhdGUoKTtcbiAgfSxcblxuICBvYnNlcnZlKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gc3RvcmVUb09ic2VydmVyKHRoaXMuX3N0b3JlIHx8IHN0b3JlKS5vYnNlcnZlKC4uLmFyZ3MpO1xuICB9LFxuXG4gIC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IGZvciBwcmV2aW91cyBTREtcbiAgY2xpZW50OiBTaW1wbGFcbn0pO1xuXG4vLyBJbml0IHBsdWdpbnNcbltcbiAgaGFzaFRyYWNraW5nLFxuICBzdXBwb3J0RGVwcmVjYXRlZEluaXRpYWxpemVyLFxuICBzdXBwb3J0RGVwcmVjYXRlZENvbmZpZyxcbiAgdXNhZ2VNb25pdG9yaW5nXG5dLmZvckVhY2gocGx1Z2luID0+IHBsdWdpbihTaW1wbGEpKTtcblxuZXhwb3J0IGRlZmF1bHQgU2ltcGxhO1xuIl0sImZpbGUiOiJzaW1wbGEuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
