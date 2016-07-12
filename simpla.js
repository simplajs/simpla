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

                  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

                  function createCommonjsModule(fn, module) {
                  	return module = { exports: {} }, fn(module, module.exports), module.exports;
                  }

                  var _core = createCommonjsModule(function (module) {
                    var core = module.exports = { version: '2.4.0' };
                    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
                  });

                  var require$$0 = _core && (typeof _core === 'undefined' ? 'undefined' : babelHelpers.typeof(_core)) === 'object' && 'default' in _core ? _core['default'] : _core;

                  var _fails = createCommonjsModule(function (module) {
                    module.exports = function (exec) {
                      try {
                        return !!exec();
                      } catch (e) {
                        return true;
                      }
                    };
                  });

                  var require$$1 = _fails && (typeof _fails === 'undefined' ? 'undefined' : babelHelpers.typeof(_fails)) === 'object' && 'default' in _fails ? _fails['default'] : _fails;

                  var _cof = createCommonjsModule(function (module) {
                    var toString = {}.toString;

                    module.exports = function (it) {
                      return toString.call(it).slice(8, -1);
                    };
                  });

                  var require$$1$2 = _cof && (typeof _cof === 'undefined' ? 'undefined' : babelHelpers.typeof(_cof)) === 'object' && 'default' in _cof ? _cof['default'] : _cof;

                  var _iobject = createCommonjsModule(function (module) {
                    // fallback for non-array-like ES3 and non-enumerable old V8 strings
                    var cof = require$$1$2;
                    module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
                      return cof(it) == 'String' ? it.split('') : Object(it);
                    };
                  });

                  var require$$1$1 = _iobject && (typeof _iobject === 'undefined' ? 'undefined' : babelHelpers.typeof(_iobject)) === 'object' && 'default' in _iobject ? _iobject['default'] : _iobject;

                  var _defined = createCommonjsModule(function (module) {
                    // 7.2.1 RequireObjectCoercible(argument)
                    module.exports = function (it) {
                      if (it == undefined) throw TypeError("Can't call method on  " + it);
                      return it;
                    };
                  });

                  var require$$0$2 = _defined && (typeof _defined === 'undefined' ? 'undefined' : babelHelpers.typeof(_defined)) === 'object' && 'default' in _defined ? _defined['default'] : _defined;

                  var _toObject = createCommonjsModule(function (module) {
                    // 7.1.13 ToObject(argument)
                    var defined = require$$0$2;
                    module.exports = function (it) {
                      return Object(defined(it));
                    };
                  });

                  var require$$1$3 = _toObject && (typeof _toObject === 'undefined' ? 'undefined' : babelHelpers.typeof(_toObject)) === 'object' && 'default' in _toObject ? _toObject['default'] : _toObject;

                  var _objectPie = createCommonjsModule(function (module, exports) {
                    exports.f = {}.propertyIsEnumerable;
                  });

                  var require$$6 = _objectPie && (typeof _objectPie === 'undefined' ? 'undefined' : babelHelpers.typeof(_objectPie)) === 'object' && 'default' in _objectPie ? _objectPie['default'] : _objectPie;

                  var _objectGops = createCommonjsModule(function (module, exports) {
                    exports.f = Object.getOwnPropertySymbols;
                  });

                  var require$$4 = _objectGops && (typeof _objectGops === 'undefined' ? 'undefined' : babelHelpers.typeof(_objectGops)) === 'object' && 'default' in _objectGops ? _objectGops['default'] : _objectGops;

                  var _enumBugKeys = createCommonjsModule(function (module) {
                    // IE 8- don't enum bug keys
                    module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
                  });

                  var require$$3 = _enumBugKeys && (typeof _enumBugKeys === 'undefined' ? 'undefined' : babelHelpers.typeof(_enumBugKeys)) === 'object' && 'default' in _enumBugKeys ? _enumBugKeys['default'] : _enumBugKeys;

                  var _uid = createCommonjsModule(function (module) {
                    var id = 0,
                        px = Math.random();
                    module.exports = function (key) {
                      return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
                    };
                  });

                  var require$$1$6 = _uid && (typeof _uid === 'undefined' ? 'undefined' : babelHelpers.typeof(_uid)) === 'object' && 'default' in _uid ? _uid['default'] : _uid;

                  var _global = createCommonjsModule(function (module) {
                    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
                    var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
                    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
                  });

                  var require$$3$1 = _global && (typeof _global === 'undefined' ? 'undefined' : babelHelpers.typeof(_global)) === 'object' && 'default' in _global ? _global['default'] : _global;

                  var _shared = createCommonjsModule(function (module) {
                    var global = require$$3$1,
                        SHARED = '__core-js_shared__',
                        store = global[SHARED] || (global[SHARED] = {});
                    module.exports = function (key) {
                      return store[key] || (store[key] = {});
                    };
                  });

                  var require$$2$1 = _shared && (typeof _shared === 'undefined' ? 'undefined' : babelHelpers.typeof(_shared)) === 'object' && 'default' in _shared ? _shared['default'] : _shared;

                  var _sharedKey = createCommonjsModule(function (module) {
                    var shared = require$$2$1('keys'),
                        uid = require$$1$6;
                    module.exports = function (key) {
                      return shared[key] || (shared[key] = uid(key));
                    };
                  });

                  var require$$2 = _sharedKey && (typeof _sharedKey === 'undefined' ? 'undefined' : babelHelpers.typeof(_sharedKey)) === 'object' && 'default' in _sharedKey ? _sharedKey['default'] : _sharedKey;

                  var _toInteger = createCommonjsModule(function (module) {
                    // 7.1.4 ToInteger
                    var ceil = Math.ceil,
                        floor = Math.floor;
                    module.exports = function (it) {
                      return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
                    };
                  });

                  var require$$1$8 = _toInteger && (typeof _toInteger === 'undefined' ? 'undefined' : babelHelpers.typeof(_toInteger)) === 'object' && 'default' in _toInteger ? _toInteger['default'] : _toInteger;

                  var _toIndex = createCommonjsModule(function (module) {
                    var toInteger = require$$1$8,
                        max = Math.max,
                        min = Math.min;
                    module.exports = function (index, length) {
                      index = toInteger(index);
                      return index < 0 ? max(index + length, 0) : min(index, length);
                    };
                  });

                  var require$$0$3 = _toIndex && (typeof _toIndex === 'undefined' ? 'undefined' : babelHelpers.typeof(_toIndex)) === 'object' && 'default' in _toIndex ? _toIndex['default'] : _toIndex;

                  var _toLength = createCommonjsModule(function (module) {
                    // 7.1.15 ToLength
                    var toInteger = require$$1$8,
                        min = Math.min;
                    module.exports = function (it) {
                      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
                    };
                  });

                  var require$$1$9 = _toLength && (typeof _toLength === 'undefined' ? 'undefined' : babelHelpers.typeof(_toLength)) === 'object' && 'default' in _toLength ? _toLength['default'] : _toLength;

                  var _toIobject = createCommonjsModule(function (module) {
                    // to indexed object, toObject with fallback for non-array-like ES3 strings
                    var IObject = require$$1$1,
                        defined = require$$0$2;
                    module.exports = function (it) {
                      return IObject(defined(it));
                    };
                  });

                  var require$$1$10 = _toIobject && (typeof _toIobject === 'undefined' ? 'undefined' : babelHelpers.typeof(_toIobject)) === 'object' && 'default' in _toIobject ? _toIobject['default'] : _toIobject;

                  var _arrayIncludes = createCommonjsModule(function (module) {
                    // false -> Array#indexOf
                    // true  -> Array#includes
                    var toIObject = require$$1$10,
                        toLength = require$$1$9,
                        toIndex = require$$0$3;
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

                  var require$$1$7 = _arrayIncludes && (typeof _arrayIncludes === 'undefined' ? 'undefined' : babelHelpers.typeof(_arrayIncludes)) === 'object' && 'default' in _arrayIncludes ? _arrayIncludes['default'] : _arrayIncludes;

                  var _has = createCommonjsModule(function (module) {
                    var hasOwnProperty = {}.hasOwnProperty;
                    module.exports = function (it, key) {
                      return hasOwnProperty.call(it, key);
                    };
                  });

                  var require$$2$2 = _has && (typeof _has === 'undefined' ? 'undefined' : babelHelpers.typeof(_has)) === 'object' && 'default' in _has ? _has['default'] : _has;

                  var _objectKeysInternal = createCommonjsModule(function (module) {
                    var has = require$$2$2,
                        toIObject = require$$1$10,
                        arrayIndexOf = require$$1$7(false),
                        IE_PROTO = require$$2('IE_PROTO');

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

                  var require$$1$5 = _objectKeysInternal && (typeof _objectKeysInternal === 'undefined' ? 'undefined' : babelHelpers.typeof(_objectKeysInternal)) === 'object' && 'default' in _objectKeysInternal ? _objectKeysInternal['default'] : _objectKeysInternal;

                  var _objectKeys = createCommonjsModule(function (module) {
                    // 19.1.2.14 / 15.2.3.14 Object.keys(O)
                    var $keys = require$$1$5,
                        enumBugKeys = require$$3;

                    module.exports = Object.keys || function keys(O) {
                      return $keys(O, enumBugKeys);
                    };
                  });

                  var require$$1$4 = _objectKeys && (typeof _objectKeys === 'undefined' ? 'undefined' : babelHelpers.typeof(_objectKeys)) === 'object' && 'default' in _objectKeys ? _objectKeys['default'] : _objectKeys;

                  var _objectAssign = createCommonjsModule(function (module) {
                    'use strict';
                    // 19.1.2.1 Object.assign(target, source, ...)

                    var getKeys = require$$1$4,
                        gOPS = require$$4,
                        pIE = require$$6,
                        toObject = require$$1$3,
                        IObject = require$$1$1,
                        $assign = Object.assign;

                    // should work with symbols and should have deterministic property order (V8 bug)
                    module.exports = !$assign || require$$1(function () {
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

                  var require$$0$1 = _objectAssign && (typeof _objectAssign === 'undefined' ? 'undefined' : babelHelpers.typeof(_objectAssign)) === 'object' && 'default' in _objectAssign ? _objectAssign['default'] : _objectAssign;

                  var _aFunction = createCommonjsModule(function (module) {
                    module.exports = function (it) {
                      if (typeof it != 'function') throw TypeError(it + ' is not a function!');
                      return it;
                    };
                  });

                  var require$$1$11 = _aFunction && (typeof _aFunction === 'undefined' ? 'undefined' : babelHelpers.typeof(_aFunction)) === 'object' && 'default' in _aFunction ? _aFunction['default'] : _aFunction;

                  var _ctx = createCommonjsModule(function (module) {
                    // optional / simple context binding
                    var aFunction = require$$1$11;
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

                  var require$$5 = _ctx && (typeof _ctx === 'undefined' ? 'undefined' : babelHelpers.typeof(_ctx)) === 'object' && 'default' in _ctx ? _ctx['default'] : _ctx;

                  var _descriptors = createCommonjsModule(function (module) {
                    // Thank's IE8 for his funny defineProperty
                    module.exports = !require$$1(function () {
                      return Object.defineProperty({}, 'a', { get: function get() {
                          return 7;
                        } }).a != 7;
                    });
                  });

                  var require$$0$6 = _descriptors && (typeof _descriptors === 'undefined' ? 'undefined' : babelHelpers.typeof(_descriptors)) === 'object' && 'default' in _descriptors ? _descriptors['default'] : _descriptors;

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

                  var require$$3$2 = _propertyDesc && (typeof _propertyDesc === 'undefined' ? 'undefined' : babelHelpers.typeof(_propertyDesc)) === 'object' && 'default' in _propertyDesc ? _propertyDesc['default'] : _propertyDesc;

                  var _isObject = createCommonjsModule(function (module) {
                    module.exports = function (it) {
                      return (typeof it === 'undefined' ? 'undefined' : babelHelpers.typeof(it)) === 'object' ? it !== null : typeof it === 'function';
                    };
                  });

                  var require$$3$5 = _isObject && (typeof _isObject === 'undefined' ? 'undefined' : babelHelpers.typeof(_isObject)) === 'object' && 'default' in _isObject ? _isObject['default'] : _isObject;

                  var _toPrimitive = createCommonjsModule(function (module) {
                    // 7.1.1 ToPrimitive(input [, PreferredType])
                    var isObject = require$$3$5;
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

                  var require$$3$4 = _toPrimitive && (typeof _toPrimitive === 'undefined' ? 'undefined' : babelHelpers.typeof(_toPrimitive)) === 'object' && 'default' in _toPrimitive ? _toPrimitive['default'] : _toPrimitive;

                  var _domCreate = createCommonjsModule(function (module) {
                    var isObject = require$$3$5,
                        document = require$$3$1.document
                    // in old IE typeof document.createElement is 'object'
                    ,
                        is = isObject(document) && isObject(document.createElement);
                    module.exports = function (it) {
                      return is ? document.createElement(it) : {};
                    };
                  });

                  var require$$1$13 = _domCreate && (typeof _domCreate === 'undefined' ? 'undefined' : babelHelpers.typeof(_domCreate)) === 'object' && 'default' in _domCreate ? _domCreate['default'] : _domCreate;

                  var _ie8DomDefine = createCommonjsModule(function (module) {
                    module.exports = !require$$0$6 && !require$$1(function () {
                      return Object.defineProperty(require$$1$13('div'), 'a', { get: function get() {
                          return 7;
                        } }).a != 7;
                    });
                  });

                  var require$$1$12 = _ie8DomDefine && (typeof _ie8DomDefine === 'undefined' ? 'undefined' : babelHelpers.typeof(_ie8DomDefine)) === 'object' && 'default' in _ie8DomDefine ? _ie8DomDefine['default'] : _ie8DomDefine;

                  var _anObject = createCommonjsModule(function (module) {
                    var isObject = require$$3$5;
                    module.exports = function (it) {
                      if (!isObject(it)) throw TypeError(it + ' is not an object!');
                      return it;
                    };
                  });

                  var require$$2$3 = _anObject && (typeof _anObject === 'undefined' ? 'undefined' : babelHelpers.typeof(_anObject)) === 'object' && 'default' in _anObject ? _anObject['default'] : _anObject;

                  var _objectDp = createCommonjsModule(function (module, exports) {
                    var anObject = require$$2$3,
                        IE8_DOM_DEFINE = require$$1$12,
                        toPrimitive = require$$3$4,
                        dP = Object.defineProperty;

                    exports.f = require$$0$6 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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

                  var require$$3$3 = _objectDp && (typeof _objectDp === 'undefined' ? 'undefined' : babelHelpers.typeof(_objectDp)) === 'object' && 'default' in _objectDp ? _objectDp['default'] : _objectDp;

                  var _hide = createCommonjsModule(function (module) {
                    var dP = require$$3$3,
                        createDesc = require$$3$2;
                    module.exports = require$$0$6 ? function (object, key, value) {
                      return dP.f(object, key, createDesc(1, value));
                    } : function (object, key, value) {
                      object[key] = value;
                      return object;
                    };
                  });

                  var require$$0$5 = _hide && (typeof _hide === 'undefined' ? 'undefined' : babelHelpers.typeof(_hide)) === 'object' && 'default' in _hide ? _hide['default'] : _hide;

                  var _redefine = createCommonjsModule(function (module) {
                    var global = require$$3$1,
                        hide = require$$0$5,
                        has = require$$2$2,
                        SRC = require$$1$6('src'),
                        TO_STRING = 'toString',
                        $toString = Function[TO_STRING],
                        TPL = ('' + $toString).split(TO_STRING);

                    require$$0.inspectSource = function (it) {
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

                  var require$$0$4 = _redefine && (typeof _redefine === 'undefined' ? 'undefined' : babelHelpers.typeof(_redefine)) === 'object' && 'default' in _redefine ? _redefine['default'] : _redefine;

                  var _export = createCommonjsModule(function (module) {
                    var global = require$$3$1,
                        core = require$$0,
                        hide = require$$0$5,
                        redefine = require$$0$4,
                        ctx = require$$5,
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

                  var require$$8 = _export && (typeof _export === 'undefined' ? 'undefined' : babelHelpers.typeof(_export)) === 'object' && 'default' in _export ? _export['default'] : _export;

                  var es6_object_assign = createCommonjsModule(function (module) {
                    // 19.1.3.1 Object.assign(target, source)
                    var $export = require$$8;

                    $export($export.S + $export.F, 'Object', { assign: require$$0$1 });
                  });

                  es6_object_assign && (typeof es6_object_assign === 'undefined' ? 'undefined' : babelHelpers.typeof(es6_object_assign)) === 'object' && 'default' in es6_object_assign ? es6_object_assign['default'] : es6_object_assign;

                  var assign = createCommonjsModule(function (module) {
                    module.exports = require$$0.Object.assign;
                  });

                  assign && (typeof assign === 'undefined' ? 'undefined' : babelHelpers.typeof(assign)) === 'object' && 'default' in assign ? assign['default'] : assign;

                  var _wks = createCommonjsModule(function (module) {
                    var store = require$$2$1('wks'),
                        uid = require$$1$6,
                        _Symbol = require$$3$1.Symbol,
                        USE_SYMBOL = typeof _Symbol == 'function';

                    var $exports = module.exports = function (name) {
                      return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
                    };

                    $exports.store = store;
                  });

                  var require$$1$14 = _wks && (typeof _wks === 'undefined' ? 'undefined' : babelHelpers.typeof(_wks)) === 'object' && 'default' in _wks ? _wks['default'] : _wks;

                  var _iterDetect = createCommonjsModule(function (module) {
                    var ITERATOR = require$$1$14('iterator'),
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

                  var require$$0$7 = _iterDetect && (typeof _iterDetect === 'undefined' ? 'undefined' : babelHelpers.typeof(_iterDetect)) === 'object' && 'default' in _iterDetect ? _iterDetect['default'] : _iterDetect;

                  var _setSpecies = createCommonjsModule(function (module) {
                    'use strict';

                    var global = require$$3$1,
                        dP = require$$3$3,
                        DESCRIPTORS = require$$0$6,
                        SPECIES = require$$1$14('species');

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

                  var require$$2$4 = _setSpecies && (typeof _setSpecies === 'undefined' ? 'undefined' : babelHelpers.typeof(_setSpecies)) === 'object' && 'default' in _setSpecies ? _setSpecies['default'] : _setSpecies;

                  var _setToStringTag = createCommonjsModule(function (module) {
                    var def = require$$3$3.f,
                        has = require$$2$2,
                        TAG = require$$1$14('toStringTag');

                    module.exports = function (it, tag, stat) {
                      if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
                    };
                  });

                  var require$$2$5 = _setToStringTag && (typeof _setToStringTag === 'undefined' ? 'undefined' : babelHelpers.typeof(_setToStringTag)) === 'object' && 'default' in _setToStringTag ? _setToStringTag['default'] : _setToStringTag;

                  var _redefineAll = createCommonjsModule(function (module) {
                    var redefine = require$$0$4;
                    module.exports = function (target, src, safe) {
                      for (var key in src) {
                        redefine(target, key, src[key], safe);
                      }return target;
                    };
                  });

                  var require$$4$1 = _redefineAll && (typeof _redefineAll === 'undefined' ? 'undefined' : babelHelpers.typeof(_redefineAll)) === 'object' && 'default' in _redefineAll ? _redefineAll['default'] : _redefineAll;

                  var _html = createCommonjsModule(function (module) {
                    module.exports = require$$3$1.document && document.documentElement;
                  });

                  var require$$0$8 = _html && (typeof _html === 'undefined' ? 'undefined' : babelHelpers.typeof(_html)) === 'object' && 'default' in _html ? _html['default'] : _html;

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

                  var require$$4$2 = _invoke && (typeof _invoke === 'undefined' ? 'undefined' : babelHelpers.typeof(_invoke)) === 'object' && 'default' in _invoke ? _invoke['default'] : _invoke;

                  var _task = createCommonjsModule(function (module) {
                    var ctx = require$$5,
                        invoke = require$$4$2,
                        html = require$$0$8,
                        cel = require$$1$13,
                        global = require$$3$1,
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
                      if (require$$1$2(process) == 'process') {
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

                  var require$$1$15 = _task && (typeof _task === 'undefined' ? 'undefined' : babelHelpers.typeof(_task)) === 'object' && 'default' in _task ? _task['default'] : _task;

                  var _microtask = createCommonjsModule(function (module) {
                    var global = require$$3$1,
                        macrotask = require$$1$15.set,
                        Observer = global.MutationObserver || global.WebKitMutationObserver,
                        process = global.process,
                        Promise = global.Promise,
                        isNode = require$$1$2(process) == 'process';

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

                  var require$$6$1 = _microtask && (typeof _microtask === 'undefined' ? 'undefined' : babelHelpers.typeof(_microtask)) === 'object' && 'default' in _microtask ? _microtask['default'] : _microtask;

                  var _speciesConstructor = createCommonjsModule(function (module) {
                    // 7.3.20 SpeciesConstructor(O, defaultConstructor)
                    var anObject = require$$2$3,
                        aFunction = require$$1$11,
                        SPECIES = require$$1$14('species');
                    module.exports = function (O, D) {
                      var C = anObject(O).constructor,
                          S;
                      return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
                    };
                  });

                  var require$$8$1 = _speciesConstructor && (typeof _speciesConstructor === 'undefined' ? 'undefined' : babelHelpers.typeof(_speciesConstructor)) === 'object' && 'default' in _speciesConstructor ? _speciesConstructor['default'] : _speciesConstructor;

                  var _objectGopd = createCommonjsModule(function (module, exports) {
                    var pIE = require$$6,
                        createDesc = require$$3$2,
                        toIObject = require$$1$10,
                        toPrimitive = require$$3$4,
                        has = require$$2$2,
                        IE8_DOM_DEFINE = require$$1$12,
                        gOPD = Object.getOwnPropertyDescriptor;

                    exports.f = require$$0$6 ? gOPD : function getOwnPropertyDescriptor(O, P) {
                      O = toIObject(O);
                      P = toPrimitive(P, true);
                      if (IE8_DOM_DEFINE) try {
                        return gOPD(O, P);
                      } catch (e) {/* empty */}
                      if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
                    };
                  });

                  var require$$0$9 = _objectGopd && (typeof _objectGopd === 'undefined' ? 'undefined' : babelHelpers.typeof(_objectGopd)) === 'object' && 'default' in _objectGopd ? _objectGopd['default'] : _objectGopd;

                  var _setProto = createCommonjsModule(function (module) {
                    // Works with __proto__ only. Old v8 can't work with null proto objects.
                    /* eslint-disable no-proto */
                    var isObject = require$$3$5,
                        anObject = require$$2$3;
                    var check = function check(O, proto) {
                      anObject(O);
                      if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
                    };
                    module.exports = {
                      set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
                      function (test, buggy, set) {
                        try {
                          set = require$$5(Function.call, require$$0$9.f(Object.prototype, '__proto__').set, 2);
                          set(test, []);
                          buggy = !(test instanceof Array);
                        } catch (e) {
                          buggy = true;
                        }
                        return function setPrototypeOf(O, proto) {
                          check(O, proto);
                          if (buggy) O.__proto__ = proto;else set(O, proto);
                          return O;
                        };
                      }({}, false) : undefined),
                      check: check
                    };
                  });

                  var require$$9 = _setProto && (typeof _setProto === 'undefined' ? 'undefined' : babelHelpers.typeof(_setProto)) === 'object' && 'default' in _setProto ? _setProto['default'] : _setProto;

                  var _iterators = createCommonjsModule(function (module) {
                    module.exports = {};
                  });

                  var require$$4$3 = _iterators && (typeof _iterators === 'undefined' ? 'undefined' : babelHelpers.typeof(_iterators)) === 'object' && 'default' in _iterators ? _iterators['default'] : _iterators;

                  var _classof = createCommonjsModule(function (module) {
                    // getting tag from 19.1.3.6 Object.prototype.toString()
                    var cof = require$$1$2,
                        TAG = require$$1$14('toStringTag')
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

                  var require$$2$6 = _classof && (typeof _classof === 'undefined' ? 'undefined' : babelHelpers.typeof(_classof)) === 'object' && 'default' in _classof ? _classof['default'] : _classof;

                  var core_getIteratorMethod = createCommonjsModule(function (module) {
                    var classof = require$$2$6,
                        ITERATOR = require$$1$14('iterator'),
                        Iterators = require$$4$3;
                    module.exports = require$$0.getIteratorMethod = function (it) {
                      if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
                    };
                  });

                  var require$$0$10 = core_getIteratorMethod && (typeof core_getIteratorMethod === 'undefined' ? 'undefined' : babelHelpers.typeof(core_getIteratorMethod)) === 'object' && 'default' in core_getIteratorMethod ? core_getIteratorMethod['default'] : core_getIteratorMethod;

                  var _isArrayIter = createCommonjsModule(function (module) {
                    // check on default Array iterator
                    var Iterators = require$$4$3,
                        ITERATOR = require$$1$14('iterator'),
                        ArrayProto = Array.prototype;

                    module.exports = function (it) {
                      return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
                    };
                  });

                  var require$$3$6 = _isArrayIter && (typeof _isArrayIter === 'undefined' ? 'undefined' : babelHelpers.typeof(_isArrayIter)) === 'object' && 'default' in _isArrayIter ? _isArrayIter['default'] : _isArrayIter;

                  var _iterCall = createCommonjsModule(function (module) {
                    // call something on iterator step with safe closing on error
                    var anObject = require$$2$3;
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

                  var require$$4$4 = _iterCall && (typeof _iterCall === 'undefined' ? 'undefined' : babelHelpers.typeof(_iterCall)) === 'object' && 'default' in _iterCall ? _iterCall['default'] : _iterCall;

                  var _forOf = createCommonjsModule(function (module) {
                    var ctx = require$$5,
                        call = require$$4$4,
                        isArrayIter = require$$3$6,
                        anObject = require$$2$3,
                        toLength = require$$1$9,
                        getIterFn = require$$0$10,
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

                  var require$$10 = _forOf && (typeof _forOf === 'undefined' ? 'undefined' : babelHelpers.typeof(_forOf)) === 'object' && 'default' in _forOf ? _forOf['default'] : _forOf;

                  var _anInstance = createCommonjsModule(function (module) {
                    module.exports = function (it, Constructor, name, forbiddenField) {
                      if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
                        throw TypeError(name + ': incorrect invocation!');
                      }return it;
                    };
                  });

                  var require$$11 = _anInstance && (typeof _anInstance === 'undefined' ? 'undefined' : babelHelpers.typeof(_anInstance)) === 'object' && 'default' in _anInstance ? _anInstance['default'] : _anInstance;

                  var _library = createCommonjsModule(function (module) {
                    module.exports = false;
                  });

                  var require$$9$1 = _library && (typeof _library === 'undefined' ? 'undefined' : babelHelpers.typeof(_library)) === 'object' && 'default' in _library ? _library['default'] : _library;

                  var es6_promise = createCommonjsModule(function (module) {
                    'use strict';

                    var LIBRARY = require$$9$1,
                        global = require$$3$1,
                        ctx = require$$5,
                        classof = require$$2$6,
                        $export = require$$8,
                        isObject = require$$3$5,
                        anObject = require$$2$3,
                        aFunction = require$$1$11,
                        anInstance = require$$11,
                        forOf = require$$10,
                        setProto = require$$9.set,
                        speciesConstructor = require$$8$1,
                        task = require$$1$15.set,
                        microtask = require$$6$1(),
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
                            FakePromise = (promise.constructor = {})[require$$1$14('species')] = function (exec) {
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
                      Internal.prototype = require$$4$1($Promise.prototype, {
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
                    require$$2$5($Promise, PROMISE);
                    require$$2$4(PROMISE);
                    Wrapper = require$$0[PROMISE];

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
                    $export($export.S + $export.F * !(USE_NATIVE && require$$0$7(function (iter) {
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

                  es6_promise && (typeof es6_promise === 'undefined' ? 'undefined' : babelHelpers.typeof(es6_promise)) === 'object' && 'default' in es6_promise ? es6_promise['default'] : es6_promise;

                  var _objectGpo = createCommonjsModule(function (module) {
                    // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
                    var has = require$$2$2,
                        toObject = require$$1$3,
                        IE_PROTO = require$$2('IE_PROTO'),
                        ObjectProto = Object.prototype;

                    module.exports = Object.getPrototypeOf || function (O) {
                      O = toObject(O);
                      if (has(O, IE_PROTO)) return O[IE_PROTO];
                      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
                        return O.constructor.prototype;
                      }return O instanceof Object ? ObjectProto : null;
                    };
                  });

                  var require$$1$16 = _objectGpo && (typeof _objectGpo === 'undefined' ? 'undefined' : babelHelpers.typeof(_objectGpo)) === 'object' && 'default' in _objectGpo ? _objectGpo['default'] : _objectGpo;

                  var _objectDps = createCommonjsModule(function (module) {
                    var dP = require$$3$3,
                        anObject = require$$2$3,
                        getKeys = require$$1$4;

                    module.exports = require$$0$6 ? Object.defineProperties : function defineProperties(O, Properties) {
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

                  var require$$4$6 = _objectDps && (typeof _objectDps === 'undefined' ? 'undefined' : babelHelpers.typeof(_objectDps)) === 'object' && 'default' in _objectDps ? _objectDps['default'] : _objectDps;

                  var _objectCreate = createCommonjsModule(function (module) {
                    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
                    var anObject = require$$2$3,
                        dPs = require$$4$6,
                        enumBugKeys = require$$3,
                        IE_PROTO = require$$2('IE_PROTO'),
                        Empty = function Empty() {/* empty */},
                        PROTOTYPE = 'prototype';

                    // Create object with fake `null` prototype: use iframe Object with cleared prototype
                    var _createDict = function createDict() {
                      // Thrash, waste and sodomy: IE GC bug
                      var iframe = require$$1$13('iframe'),
                          i = enumBugKeys.length,
                          gt = '>',
                          iframeDocument;
                      iframe.style.display = 'none';
                      require$$0$8.appendChild(iframe);
                      iframe.src = 'javascript:'; // eslint-disable-line no-script-url
                      // createDict = iframe.contentWindow.Object;
                      // html.removeChild(iframe);
                      iframeDocument = iframe.contentWindow.document;
                      iframeDocument.open();
                      iframeDocument.write('<script>document.F=Object</script' + gt);
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

                  var require$$4$5 = _objectCreate && (typeof _objectCreate === 'undefined' ? 'undefined' : babelHelpers.typeof(_objectCreate)) === 'object' && 'default' in _objectCreate ? _objectCreate['default'] : _objectCreate;

                  var _iterCreate = createCommonjsModule(function (module) {
                    'use strict';

                    var create = require$$4$5,
                        descriptor = require$$3$2,
                        setToStringTag = require$$2$5,
                        IteratorPrototype = {};

                    // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
                    require$$0$5(IteratorPrototype, require$$1$14('iterator'), function () {
                      return this;
                    });

                    module.exports = function (Constructor, NAME, next) {
                      Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
                      setToStringTag(Constructor, NAME + ' Iterator');
                    };
                  });

                  var require$$3$7 = _iterCreate && (typeof _iterCreate === 'undefined' ? 'undefined' : babelHelpers.typeof(_iterCreate)) === 'object' && 'default' in _iterCreate ? _iterCreate['default'] : _iterCreate;

                  var _iterDefine = createCommonjsModule(function (module) {
                    'use strict';

                    var LIBRARY = require$$9$1,
                        $export = require$$8,
                        redefine = require$$0$4,
                        hide = require$$0$5,
                        has = require$$2$2,
                        Iterators = require$$4$3,
                        $iterCreate = require$$3$7,
                        setToStringTag = require$$2$5,
                        getPrototypeOf = require$$1$16,
                        ITERATOR = require$$1$14('iterator'),
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

                  var require$$0$11 = _iterDefine && (typeof _iterDefine === 'undefined' ? 'undefined' : babelHelpers.typeof(_iterDefine)) === 'object' && 'default' in _iterDefine ? _iterDefine['default'] : _iterDefine;

                  var _iterStep = createCommonjsModule(function (module) {
                    module.exports = function (done, value) {
                      return { value: value, done: !!done };
                    };
                  });

                  var require$$3$8 = _iterStep && (typeof _iterStep === 'undefined' ? 'undefined' : babelHelpers.typeof(_iterStep)) === 'object' && 'default' in _iterStep ? _iterStep['default'] : _iterStep;

                  var _addToUnscopables = createCommonjsModule(function (module) {
                    // 22.1.3.31 Array.prototype[@@unscopables]
                    var UNSCOPABLES = require$$1$14('unscopables'),
                        ArrayProto = Array.prototype;
                    if (ArrayProto[UNSCOPABLES] == undefined) require$$0$5(ArrayProto, UNSCOPABLES, {});
                    module.exports = function (key) {
                      ArrayProto[UNSCOPABLES][key] = true;
                    };
                  });

                  var require$$4$7 = _addToUnscopables && (typeof _addToUnscopables === 'undefined' ? 'undefined' : babelHelpers.typeof(_addToUnscopables)) === 'object' && 'default' in _addToUnscopables ? _addToUnscopables['default'] : _addToUnscopables;

                  var es6_array_iterator = createCommonjsModule(function (module) {
                    'use strict';

                    var addToUnscopables = require$$4$7,
                        step = require$$3$8,
                        Iterators = require$$4$3,
                        toIObject = require$$1$10;

                    // 22.1.3.4 Array.prototype.entries()
                    // 22.1.3.13 Array.prototype.keys()
                    // 22.1.3.29 Array.prototype.values()
                    // 22.1.3.30 Array.prototype[@@iterator]()
                    module.exports = require$$0$11(Array, 'Array', function (iterated, kind) {
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

                  var require$$5$1 = es6_array_iterator && (typeof es6_array_iterator === 'undefined' ? 'undefined' : babelHelpers.typeof(es6_array_iterator)) === 'object' && 'default' in es6_array_iterator ? es6_array_iterator['default'] : es6_array_iterator;

                  var web_dom_iterable = createCommonjsModule(function (module) {
                    var $iterators = require$$5$1,
                        redefine = require$$0$4,
                        global = require$$3$1,
                        hide = require$$0$5,
                        Iterators = require$$4$3,
                        wks = require$$1$14,
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

                  web_dom_iterable && (typeof web_dom_iterable === 'undefined' ? 'undefined' : babelHelpers.typeof(web_dom_iterable)) === 'object' && 'default' in web_dom_iterable ? web_dom_iterable['default'] : web_dom_iterable;

                  var _stringAt = createCommonjsModule(function (module) {
                    var toInteger = require$$1$8,
                        defined = require$$0$2;
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

                  var require$$1$17 = _stringAt && (typeof _stringAt === 'undefined' ? 'undefined' : babelHelpers.typeof(_stringAt)) === 'object' && 'default' in _stringAt ? _stringAt['default'] : _stringAt;

                  var es6_string_iterator = createCommonjsModule(function (module) {
                    'use strict';

                    var $at = require$$1$17(true);

                    // 21.1.3.27 String.prototype[@@iterator]()
                    require$$0$11(String, 'String', function (iterated) {
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

                  es6_string_iterator && (typeof es6_string_iterator === 'undefined' ? 'undefined' : babelHelpers.typeof(es6_string_iterator)) === 'object' && 'default' in es6_string_iterator ? es6_string_iterator['default'] : es6_string_iterator;

                  var es6_object_toString = createCommonjsModule(function (module) {
                    'use strict';
                    // 19.1.3.6 Object.prototype.toString()

                    var classof = require$$2$6,
                        test = {};
                    test[require$$1$14('toStringTag')] = 'z';
                    if (test + '' != '[object z]') {
                      require$$0$4(Object.prototype, 'toString', function toString() {
                        return '[object ' + classof(this) + ']';
                      }, true);
                    }
                  });

                  es6_object_toString && (typeof es6_object_toString === 'undefined' ? 'undefined' : babelHelpers.typeof(es6_object_toString)) === 'object' && 'default' in es6_object_toString ? es6_object_toString['default'] : es6_object_toString;

                  var promise = createCommonjsModule(function (module) {
                    module.exports = require$$0.Promise;
                  });

                  promise && (typeof promise === 'undefined' ? 'undefined' : babelHelpers.typeof(promise)) === 'object' && 'default' in promise ? promise['default'] : promise;

                  /* Built-in method references for those with the same name as other `lodash` methods. */
                  var nativeGetPrototype = Object.getPrototypeOf;

                  /**
                   * Gets the `[[Prototype]]` of `value`.
                   *
                   * @private
                   * @param {*} value The value to query.
                   * @returns {null|Object} Returns the `[[Prototype]]`.
                   */
                  function getPrototype(value) {
                    return nativeGetPrototype(Object(value));
                  }

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
                  var objectProto = Object.prototype;

                  /** Used to resolve the decompiled source of functions. */
                  var funcToString = Function.prototype.toString;

                  /** Used to check objects for own properties. */
                  var hasOwnProperty = objectProto.hasOwnProperty;

                  /** Used to infer the `Object` constructor. */
                  var objectCtorString = funcToString.call(Object);

                  /**
                   * Used to resolve the
                   * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
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
                   * @returns {boolean} Returns `true` if `value` is a plain object,
                   *  else `false`.
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

                  var ponyfill = createCommonjsModule(function (module) {
                  	'use strict';

                  	module.exports = function symbolObservablePonyfill(root) {
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
                  });

                  var require$$0$12 = ponyfill && (typeof ponyfill === 'undefined' ? 'undefined' : babelHelpers.typeof(ponyfill)) === 'object' && 'default' in ponyfill ? ponyfill['default'] : ponyfill;

                  var index = createCommonjsModule(function (module) {
                    /* global window */
                    'use strict';

                    module.exports = require$$0$12(commonjsGlobal || window || commonjsGlobal);
                  });

                  var $$observable = index && (typeof index === 'undefined' ? 'undefined' : babelHelpers.typeof(index)) === 'object' && 'default' in index ? index['default'] : index;

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
                   * @param {any} [initialState] The initial state. You may optionally specify it
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
                  function createStore(reducer, initialState, enhancer) {
                    var _ref2;

                    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
                      enhancer = initialState;
                      initialState = undefined;
                    }

                    if (typeof enhancer !== 'undefined') {
                      if (typeof enhancer !== 'function') {
                        throw new Error('Expected the enhancer to be a function.');
                      }

                      return enhancer(createStore)(reducer, initialState);
                    }

                    if (typeof reducer !== 'function') {
                      throw new Error('Expected the reducer to be a function.');
                    }

                    var currentReducer = reducer;
                    var currentState = initialState;
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
                      }, _ref[$$observable] = function () {
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
                    }, _ref2[$$observable] = observable, _ref2;
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

                  function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
                    var reducerKeys = Object.keys(reducers);
                    var argumentName = action && action.type === ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

                    if (reducerKeys.length === 0) {
                      return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
                    }

                    if (!isPlainObject(inputState)) {
                      return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
                    }

                    var unexpectedKeys = Object.keys(inputState).filter(function (key) {
                      return !reducers.hasOwnProperty(key);
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

                      if ("development" !== 'production') {
                        var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
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
                    } else {
                      var _ret = function () {
                        var last = funcs[funcs.length - 1];
                        var rest = funcs.slice(0, -1);
                        return {
                          v: function v() {
                            return rest.reduceRight(function (composed, f) {
                              return f(composed);
                            }, last.apply(undefined, arguments));
                          }
                        };
                      }();

                      if ((typeof _ret === "undefined" ? "undefined" : babelHelpers.typeof(_ret)) === "object") return _ret.v;
                    }
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
                      return function (reducer, initialState, enhancer) {
                        var store = createStore(reducer, initialState, enhancer);
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
                  // Data
                  var GET_DATA = 'get-data';
                  var GET_DATA_SUCCESSFUL = 'get-data-successful';
                  var GET_DATA_FAILED = 'get-data-failed';

                  var SET_DATA = 'set-data';
                  var SET_DATA_SUCCESSFUL = 'set-data-successful';
                  var SET_DATA_FAILED = 'set-data-failed';

                  var REMOVE_DATA = 'remove-data';
                  var REMOVE_DATA_SUCCESSFUL = 'remove-data-successful';
                  var REMOVE_DATA_FAILED = 'remove-data-failed';

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

                  fetchNpmBrowserify && (typeof fetchNpmBrowserify === 'undefined' ? 'undefined' : babelHelpers.typeof(fetchNpmBrowserify)) === 'object' && 'default' in fetchNpmBrowserify ? fetchNpmBrowserify['default'] : fetchNpmBrowserify;

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

                  function generateRequestActions(types) {
                    return [function (uid, data) {
                      return { type: types[0], uid: uid, data: data };
                    }, function (uid, response) {
                      return { type: types[1], uid: uid, response: response };
                    }, function (uid, error) {
                      return { type: types[2], uid: uid, error: error };
                    }];
                  }

                  function generateHandler(method, types) {
                    var _generateRequestActio = generateRequestActions(types);

                    var _generateRequestActio2 = babelHelpers.slicedToArray(_generateRequestActio, 3);

                    var start = _generateRequestActio2[0];
                    var success = _generateRequestActio2[1];
                    var fail = _generateRequestActio2[2];


                    return function (uid, body) {
                      return function (dispatch, getState) {
                        var _getState = getState();

                        var options = _getState.options;
                        var authentication = _getState.authentication;
                        var token = authentication.token;
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

                  var get = generateHandler('get', [GET_DATA, GET_DATA_SUCCESSFUL, GET_DATA_FAILED]);
                  var set$2 = generateHandler('put', [SET_DATA, SET_DATA_SUCCESSFUL, SET_DATA_FAILED]);
                  var remove = generateHandler('delete', [REMOVE_DATA, REMOVE_DATA_SUCCESSFUL, REMOVE_DATA_FAILED]);

                  var AUTH_SERVER = 'https://api.simpla.io';
                  var ELEMENTS_SERVER = 'https://elements.simpla.io';
                  var ELEMENTS = ['simpla-img/simpla-img.html', 'simpla-text/simpla-text.html', 'simpla-block/simpla-block.html', 'sm-admin/sm-admin.html'];

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

                  function selectPropByPath(path, obj) {
                    var selector = void 0,
                        numberSelector = void 0;

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
                            onChange(currentState, lastState);
                            lastState = currentState;
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

                  function dispatchThunkAndExpect(store, action, expectedType) {
                    return store.dispatch(action).then(ensureActionMatches(expectedType)).then(function (action) {
                      return action.response;
                    }, function (action) {
                      return Promise.reject(action.response);
                    });
                  }

                  var index$1 = createCommonjsModule(function (module) {
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

                  var EventEmitter = index$1 && (typeof index$1 === 'undefined' ? 'undefined' : babelHelpers.typeof(index$1)) === 'object' && 'default' in index$1 ? index$1['default'] : index$1;

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
                    // Part one, bind from hash to Simpla
                    var hashObserver = function hashObserver(_ref) {
                      var target = _ref.target;

                      if (target.location.hash === HASH_EDIT) {
                        Simpla.toggleEditing(true);
                      } else {
                        Simpla.toggleEditing(false);
                      }
                    };

                    window.addEventListener('hashchange', hashObserver);
                    // Kickstart it
                    hashObserver({ target: window });

                    // Part two, bind from Simpla to hash
                    Simpla.observe('editing', function (editing) {
                      if (editing) {
                        window.location.hash = HASH_EDIT;
                      } else {
                        window.location.hash = '';
                      }
                    });
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
                      var expiry = window.localStorage.getItem(SESSION_KEY),
                          now = Date.now();

                      return false; //expiry && parseInt(expiry) > now;
                    }

                    /**
                     * Update the session to now + interval time
                     * @return {undefined}
                     */
                    function resetSession() {
                      window.localStorage.setItem(SESSION_KEY, Date.now() + INTERVAL);
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

                  function authentication() {
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

                  // // TODO: Reimplement the below
                  // export function dataEntity(state = {}, action) {
                  //   switch (action.type) {
                  //   case REQUEST_DATA:
                  //     return Object.assign({}, state, { requesting: true, error: null });
                  //   case REQUEST_DATA_FAILED:
                  //     return Object.assign({}, state, { requesting: false, error: action.error.message });
                  //   case RECEIVE_DATA:
                  //     return Object.assign({}, state, { requesting: false, error: null, data: action.data });
                  //   default:
                  //     return state;
                  //   }
                  // }

                  function data() {
                    var state = arguments.length <= 0 || arguments[0] === undefined ? INITIAL_STATE$1 : arguments[0];
                    var action = arguments[1];

                    switch (action.type) {
                      // TODO: Handle data actions
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

                  var reducer = combineReducers({
                    authenticated: authenticated,
                    options: options,
                    imports: imports,
                    editing: authentication,
                    data: data,
                    token: token
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
                        authEndpoint = void 0,
                        dataEndpoint = void 0,
                        elements = [];

                    // Initialize data endpoint
                    if (typeof options === 'string') {
                      project = options;
                    } else {
                      project = options.project;
                    }

                    Simpla._store.dispatch(setOption('project', project));

                    // Initialize the auth server
                    authEndpoint = AUTH_SERVER;
                    Simpla._store.dispatch(setOption('authEndpoint', authEndpoint));

                    dataEndpoint = AUTH_SERVER + '/projects/' + project + '/items';
                    Simpla._store.dispatch(setOption('dataEndpoint', dataEndpoint));

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
                      return dispatchThunkAndExpect(store, set$2.apply(undefined, arguments), SET_DATA_SUCCESSFUL);
                    },
                    remove: function remove$$() {
                      return dispatchThunkAndExpect(store, remove.apply(undefined, arguments), REMOVE_DATA_SUCCESSFUL);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaW1wbGEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjb3JlLWpzL2ZuL29iamVjdC9hc3NpZ24nO1xuaW1wb3J0ICdjb3JlLWpzL2ZuL3Byb21pc2UnO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IHNldE9wdGlvbiB9IGZyb20gJy4vYWN0aW9ucy9vcHRpb25zJztcbmltcG9ydCB7IGltcG9ydEVsZW1lbnQgfSBmcm9tICcuL2FjdGlvbnMvaW1wb3J0cyc7XG5pbXBvcnQgeyBlZGl0QWN0aXZlLCBlZGl0SW5hY3RpdmUgfSBmcm9tICcuL2FjdGlvbnMvZWRpdGluZyc7XG5pbXBvcnQgeyBsb2dpbiwgbG9nb3V0IH0gZnJvbSAnLi9hY3Rpb25zL2F1dGhlbnRpY2F0aW9uJztcbmltcG9ydCB7IGdldCwgc2V0LCByZW1vdmUgfSBmcm9tICcuL2FjdGlvbnMvZGF0YSc7XG5pbXBvcnQgeyBBVVRIX1NFUlZFUiwgQkFTRV9QQVRILCBFTEVNRU5UUyB9IGZyb20gJy4vY29uc3RhbnRzL29wdGlvbnMnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgaGlkZURlZmF1bHRDb250ZW50LCByZWFkeVdlYkNvbXBvbmVudHMsIGNvbmZpZ3VyZVBvbHltZXIgfSBmcm9tICcuL3V0aWxzL3ByZXBhcmUnO1xuaW1wb3J0IHsgc3RvcmVUb09ic2VydmVyLCBlbnN1cmVBY3Rpb25NYXRjaGVzLCBkaXNwYXRjaFRodW5rQW5kRXhwZWN0IH0gZnJvbSAnLi91dGlscy9oZWxwZXJzJztcbmltcG9ydCB7IGVtaXR0ZXIgfSBmcm9tICcuL21pZGRsZXdhcmUvZW1pdHRlcic7XG5pbXBvcnQgeyBzdXBwb3J0RGVwcmVjYXRlZENvbmZpZywgc3VwcG9ydERlcHJlY2F0ZWRJbml0aWFsaXplciB9IGZyb20gJy4vcGx1Z2lucy9kZXByZWNhdGlvbic7XG5pbXBvcnQgaGFzaFRyYWNraW5nIGZyb20gJy4vcGx1Z2lucy9oYXNoVHJhY2tpbmcnO1xuaW1wb3J0IHVzYWdlTW9uaXRvcmluZyBmcm9tICcuL3BsdWdpbnMvdXNhZ2VNb25pdG9yaW5nJztcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQgcm9vdFJlZHVjZXIgZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbi8vIENyZWF0ZSBjb3JlIHN0b3JlXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyLCBhcHBseU1pZGRsZXdhcmUodGh1bmspKTtcblxuLy8gSGlkZSBEZWZhdWx0IENvbnRlbnRcbmhpZGVEZWZhdWx0Q29udGVudCgpO1xuXG4vLyBDb25kaXRpb25hbGx5IGxvYWQgaW4gd2ViIGNvbXBvbmVudHNcbnJlYWR5V2ViQ29tcG9uZW50cygpO1xuXG4vLyBTZXR1cCBQb2x5bWVyIGNvbmZpZ3VyYXRpb25cbmNvbmZpZ3VyZVBvbHltZXIoKTtcblxuY29uc3QgU2ltcGxhID0gZnVuY3Rpb24gU2ltcGxhKG9wdGlvbnMpIHtcbiAgU2ltcGxhLl9zdG9yZSA9IFNpbXBsYS5fc3RvcmUgfHwgc3RvcmU7XG5cbiAgbGV0IHByb2plY3QsXG4gICAgICBiYXNlID0gJycsXG4gICAgICBhdXRoRW5kcG9pbnQsXG4gICAgICBkYXRhRW5kcG9pbnQsXG4gICAgICBlbGVtZW50cyA9IFtdO1xuXG4gIC8vIEluaXRpYWxpemUgZGF0YSBlbmRwb2ludFxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgcHJvamVjdCA9IG9wdGlvbnM7XG4gIH0gZWxzZSB7XG4gICAgcHJvamVjdCA9IG9wdGlvbnMucHJvamVjdDtcbiAgfVxuXG4gIFNpbXBsYS5fc3RvcmUuZGlzcGF0Y2goc2V0T3B0aW9uKCdwcm9qZWN0JywgcHJvamVjdCkpO1xuXG4gIC8vIEluaXRpYWxpemUgdGhlIGF1dGggc2VydmVyXG4gIGF1dGhFbmRwb2ludCA9IEFVVEhfU0VSVkVSO1xuICBTaW1wbGEuX3N0b3JlLmRpc3BhdGNoKHNldE9wdGlvbignYXV0aEVuZHBvaW50JywgYXV0aEVuZHBvaW50KSk7XG5cbiAgZGF0YUVuZHBvaW50ID0gYCR7QVVUSF9TRVJWRVJ9L3Byb2plY3RzLyR7cHJvamVjdH0vaXRlbXNgO1xuICBTaW1wbGEuX3N0b3JlLmRpc3BhdGNoKHNldE9wdGlvbignZGF0YUVuZHBvaW50JywgZGF0YUVuZHBvaW50KSk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBlbGVtZW50c1xuICBpZiAodHlwZW9mIG9wdGlvbnMuZWxlbWVudHMgPT09ICd1bmRlZmluZWQnKSB7IC8vIERvZXNuJ3QgZXhpc3QsIHVzZSBkZWZhdWx0c1xuICAgIGVsZW1lbnRzID0gRUxFTUVOVFM7XG4gICAgYmFzZSA9IEJBU0VfUEFUSDtcbiAgfSBlbHNlIGlmIChvcHRpb25zLmVsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpIHsgLy8gRXhpc3RzIGFuZCBpcyBhbiBhcnJheSBvZiBwYXRoc1xuICAgIGVsZW1lbnRzID0gb3B0aW9ucy5lbGVtZW50cztcbiAgfSBlbHNlIGlmIChvcHRpb25zLmVsZW1lbnRzKSB7IC8vIEV4aXN0cywgYW5kIG5vdCBmYWxzZXlcbiAgICAvLyBVc2UgZ2l2ZW4sIG9yIGZhbGxiYWNrIHRvIGRlZmF1bHRzXG4gICAgZWxlbWVudHMgPSBvcHRpb25zLmVsZW1lbnRzLnBhdGhzIHx8IEVMRU1FTlRTO1xuICAgIGJhc2UgPSBvcHRpb25zLmVsZW1lbnRzLmJhc2UgfHwgQkFTRV9QQVRIO1xuICB9XG5cbiAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IFNpbXBsYS5fc3RvcmUuZGlzcGF0Y2goaW1wb3J0RWxlbWVudChgJHtiYXNlfSR7ZWxlbWVudH1gKSkpO1xuXG4gIHJldHVybiBTaW1wbGE7XG59O1xuXG4vLyBBZGQgbWl4aW5zXG5PYmplY3QuYXNzaWduKFNpbXBsYSwge1xuICAvLyBBdXRoZW50aWNhdGlvblxuICBsb2dpbiguLi5hcmdzKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoVGh1bmtBbmRFeHBlY3Qoc3RvcmUsIGxvZ2luKC4uLmFyZ3MpLCB0eXBlcy5MT0dJTl9TVUNDRVNTRlVMKTtcbiAgfSxcblxuICBsb2dvdXQoLi4uYXJncykge1xuICAgIHJldHVybiBkaXNwYXRjaFRodW5rQW5kRXhwZWN0KHN0b3JlLCBsb2dvdXQoLi4uYXJncyksIHR5cGVzLkxPR09VVF9TVUNDRVNTRlVMKTtcbiAgfSxcblxuICAvLyBEYXRhXG4gIGdldCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoVGh1bmtBbmRFeHBlY3Qoc3RvcmUsIGdldCguLi5hcmdzKSwgdHlwZXMuR0VUX0RBVEFfU1VDQ0VTU0ZVTCk7XG4gIH0sXG5cbiAgc2V0KC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hUaHVua0FuZEV4cGVjdChzdG9yZSwgc2V0KC4uLmFyZ3MpLCB0eXBlcy5TRVRfREFUQV9TVUNDRVNTRlVMKTtcbiAgfSxcblxuICByZW1vdmUoLi4uYXJncykge1xuICAgIHJldHVybiBkaXNwYXRjaFRodW5rQW5kRXhwZWN0KHN0b3JlLCByZW1vdmUoLi4uYXJncyksIHR5cGVzLlJFTU9WRV9EQVRBX1NVQ0NFU1NGVUwpO1xuICB9LFxuXG4gIC8vIEV2ZW50c1xuICBvbiguLi5hcmdzKSB7XG4gICAgZW1pdHRlci5vbiguLi5hcmdzKTtcbiAgfSxcblxuICBvZmYoLi4uYXJncykge1xuICAgIGVtaXR0ZXIub2ZmKC4uLmFyZ3MpO1xuICB9LFxuXG4gIG9uY2UoLi4uYXJncykge1xuICAgIGVtaXR0ZXIub25jZSguLi5hcmdzKTtcbiAgfSxcblxuICBlbWl0KC4uLmFyZ3MpIHtcbiAgICBlbWl0dGVyLmVtaXQoLi4uYXJncyk7XG4gIH0sXG5cbiAgLy8gRWRpdGluZ1xuICB0b2dnbGVFZGl0aW5nKG9uKSB7XG4gICAgKHRoaXMuX3N0b3JlIHx8IHN0b3JlKS5kaXNwYXRjaChvbiA/IGVkaXRBY3RpdmUoKSA6IGVkaXRJbmFjdGl2ZSgpKTtcbiAgfSxcblxuICAvLyBTdGF0ZVxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gKHRoaXMuX3N0b3JlIHx8IHN0b3JlKS5nZXRTdGF0ZSgpO1xuICB9LFxuXG4gIG9ic2VydmUoLi4uYXJncykge1xuICAgIHJldHVybiBzdG9yZVRvT2JzZXJ2ZXIodGhpcy5fc3RvcmUgfHwgc3RvcmUpLm9ic2VydmUoLi4uYXJncyk7XG4gIH0sXG5cbiAgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHkgZm9yIHByZXZpb3VzIFNES1xuICBjbGllbnQ6IFNpbXBsYVxufSk7XG5cbi8vIEluaXQgcGx1Z2luc1xuW1xuICBoYXNoVHJhY2tpbmcsXG4gIHN1cHBvcnREZXByZWNhdGVkSW5pdGlhbGl6ZXIsXG4gIHN1cHBvcnREZXByZWNhdGVkQ29uZmlnLFxuICB1c2FnZU1vbml0b3Jpbmdcbl0uZm9yRWFjaChwbHVnaW4gPT4gcGx1Z2luKFNpbXBsYSkpO1xuXG5leHBvcnQgZGVmYXVsdCBTaW1wbGE7XG4iXSwiZmlsZSI6InNpbXBsYS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
