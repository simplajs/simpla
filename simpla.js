(function (global, factory) {
                  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
                  typeof define === 'function' && define.amd ? define('Simpla', factory) :
                  (global.Simpla = factory());
}(this, (function () { 'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.4.0' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

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





var defineProperty$1 = function (obj, key, value) {
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

var _isObject = function _isObject(it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

var isObject = _isObject;
var _anObject = function _anObject(it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function _fails(exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

var isObject$1 = _isObject;
var document$1 = _global.document;
var is = isObject$1(document$1) && isObject$1(document$1.createElement);
var _domCreate = function _domCreate(it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject$2 = _isObject;
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function _toPrimitive(it, S) {
  if (!isObject$2(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject$2(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var anObject = _anObject;
var IE8_DOM_DEFINE = _ie8DomDefine;
var toPrimitive = _toPrimitive;
var dP$1 = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP$1(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
  f: f
};

var _propertyDesc = function _propertyDesc(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var dP = _objectDp;
var createDesc = _propertyDesc;
var _hide = _descriptors ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function _has(it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function _uid(key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
  var global = _global,
      hide = _hide,
      has = _has,
      SRC = _uid('src'),
      TO_STRING = 'toString',
      $toString = Function[TO_STRING],
      TPL = ('' + $toString).split(TO_STRING);

  _core.inspectSource = function (it) {
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

var _aFunction = function _aFunction(it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding
var aFunction = _aFunction;
var _ctx = function _ctx(fn, that, length) {
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

var global$1 = _global;
var core = _core;
var hide = _hide;
var redefine = _redefine;
var ctx = _ctx;
var PROTOTYPE = 'prototype';

var $export$1 = function $export$1(type, name, source) {
  var IS_FORCED = type & $export$1.F,
      IS_GLOBAL = type & $export$1.G,
      IS_STATIC = type & $export$1.S,
      IS_PROTO = type & $export$1.P,
      IS_BIND = type & $export$1.B,
      target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] || (global$1[name] = {}) : (global$1[name] || {})[PROTOTYPE],
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
    exp = IS_BIND && own ? ctx(out, global$1) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export$1.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global$1.core = core;
// type bitmap
$export$1.F = 1; // forced
$export$1.G = 2; // global
$export$1.S = 4; // static
$export$1.P = 8; // proto
$export$1.B = 16; // bind
$export$1.W = 32; // wrap
$export$1.U = 64; // safe
$export$1.R = 128; // real proto method for `library` 
var _export = $export$1;

var toString$1 = {}.toString;

var _cof = function _cof(it) {
  return toString$1.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _cof;
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function _defined(it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject$1 = _iobject;
var defined = _defined;
var _toIobject = function _toIobject(it) {
  return IObject$1(defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function _toInteger(it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength
var toInteger = _toInteger;
var min = Math.min;
var _toLength = function _toLength(it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var toInteger$1 = _toInteger;
var max = Math.max;
var min$1 = Math.min;
var _toIndex = function _toIndex(index, length) {
  index = toInteger$1(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes
var toIObject$1 = _toIobject;
var toLength = _toLength;
var toIndex = _toIndex;
var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject$1($this),
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

var global$2 = _global;
var SHARED = '__core-js_shared__';
var store = global$2[SHARED] || (global$2[SHARED] = {});
var _shared = function _shared(key) {
  return store[key] || (store[key] = {});
};

var shared = _shared('keys');
var uid = _uid;
var _sharedKey = function _sharedKey(key) {
  return shared[key] || (shared[key] = uid(key));
};

var has = _has;
var toIObject = _toIobject;
var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function _objectKeysInternal(object, names) {
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

// IE 8- don't enum bug keys
var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = _objectKeysInternal;
var enumBugKeys = _enumBugKeys;

var _objectKeys = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)
var defined$1 = _defined;
var _toObject = function _toObject(it) {
  return Object(defined$1(it));
};

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = _objectKeys;
var gOPS = _objectGops;
var pIE = _objectPie;
var toObject = _toObject;
var IObject = _iobject;
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
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

// 19.1.3.1 Object.assign(target, source)
var $export = _export;

$export($export.S + $export.F, 'Object', { assign: _objectAssign });

var _wks = createCommonjsModule(function (module) {
  var store = _shared('wks'),
      uid = _uid,
      _Symbol = _global.Symbol,
      USE_SYMBOL = typeof _Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
  };

  $exports.store = store;
});

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof$1 = _cof;
var TAG = _wks('toStringTag');
var ARG = cof$1(function () {
  return arguments;
}()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {/* empty */}
};

var _classof = function _classof(it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
  // builtinTag case
  : ARG ? cof$1(O)
  // ES3 arguments fallback
  : (B = cof$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

// 19.1.3.6 Object.prototype.toString()
var classof = _classof;
var test = {};
test[_wks('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  _redefine(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

var toInteger$2 = _toInteger;
var defined$2 = _defined;
// true  -> String#at
// false -> String#codePointAt
var _stringAt = function _stringAt(TO_STRING) {
  return function (that, pos) {
    var s = String(defined$2(that)),
        i = toInteger$2(pos),
        l = s.length,
        a,
        b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = false;

var _iterators = {};

var dP$2 = _objectDp;
var anObject$2 = _anObject;
var getKeys$1 = _objectKeys;

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$2(O);
  var keys = getKeys$1(Properties),
      length = keys.length,
      i = 0,
      P;
  while (length > i) {
    dP$2.f(O, P = keys[i++], Properties[P]);
  }return O;
};

var _html = _global.document && document.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject$1 = _anObject;
var dPs = _objectDps;
var enumBugKeys$1 = _enumBugKeys;
var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function Empty() {/* empty */};
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe'),
      i = enumBugKeys$1.length,
      lt = '<',
      gt = '>',
      iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;
  while (i--) {
    delete _createDict[PROTOTYPE$1][enumBugKeys$1[i]];
  }return _createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = anObject$1(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = _createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

var def = _objectDp.f;
var has$2 = _has;
var TAG$1 = _wks('toStringTag');

var _setToStringTag = function _setToStringTag(it, tag, stat) {
  if (it && !has$2(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
};

var create$1 = _objectCreate;
var descriptor = _propertyDesc;
var setToStringTag$1 = _setToStringTag;
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () {
  return this;
});

var _iterCreate = function _iterCreate(Constructor, NAME, next) {
  Constructor.prototype = create$1(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag$1(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has$3 = _has;
var toObject$1 = _toObject;
var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = toObject$1(O);
  if (has$3(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};

var LIBRARY = _library;
var $export$2 = _export;
var redefine$1 = _redefine;
var hide$1 = _hide;
var has$1 = _has;
var Iterators = _iterators;
var $iterCreate = _iterCreate;
var setToStringTag = _setToStringTag;
var getPrototypeOf = _objectGpo;
var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys());
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

var _iterDefine = function _iterDefine(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
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
      if (!LIBRARY && !has$1(IteratorPrototype, ITERATOR)) hide$1(IteratorPrototype, ITERATOR, returnThis);
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
    hide$1(proto, ITERATOR, $default);
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
      if (!(key in proto)) redefine$1(proto, key, methods[key]);
    } else $export$2($export$2.P + $export$2.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
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

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
var _addToUnscopables = function _addToUnscopables(key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

var _iterStep = function _iterStep(done, value) {
  return { value: value, done: !!done };
};

var addToUnscopables = _addToUnscopables;
var step = _iterStep;
var Iterators$2 = _iterators;
var toIObject$2 = _toIobject;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = toIObject$2(iterated); // target
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
Iterators$2.Arguments = Iterators$2.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var $iterators = es6_array_iterator;
var redefine$2 = _redefine;
var global$3 = _global;
var hide$2 = _hide;
var Iterators$1 = _iterators;
var wks = _wks;
var ITERATOR$1 = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators$1.Array;

for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
  var NAME = collections[i],
      Collection = global$3[NAME],
      proto = Collection && Collection.prototype,
      key;
  if (proto) {
    if (!proto[ITERATOR$1]) hide$2(proto, ITERATOR$1, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide$2(proto, TO_STRING_TAG, NAME);
    Iterators$1[NAME] = ArrayValues;
    for (key in $iterators) {
      if (!proto[key]) redefine$2(proto, key, $iterators[key], true);
    }
  }
}

var _anInstance = function _anInstance(it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }return it;
};

// call something on iterator step with safe closing on error
var anObject$3 = _anObject;
var _iterCall = function _iterCall(iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject$3(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject$3(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator
var Iterators$3 = _iterators;
var ITERATOR$2 = _wks('iterator');
var ArrayProto$1 = Array.prototype;

var _isArrayIter = function _isArrayIter(it) {
  return it !== undefined && (Iterators$3.Array === it || ArrayProto$1[ITERATOR$2] === it);
};

var classof$2 = _classof;
var ITERATOR$3 = _wks('iterator');
var Iterators$4 = _iterators;
var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$3] || it['@@iterator'] || Iterators$4[classof$2(it)];
};

var _forOf = createCommonjsModule(function (module) {
  var ctx = _ctx,
      call = _iterCall,
      isArrayIter = _isArrayIter,
      anObject = _anObject,
      toLength = _toLength,
      getIterFn = core_getIteratorMethod,
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

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject$4 = _anObject;
var aFunction$2 = _aFunction;
var SPECIES = _wks('species');
var _speciesConstructor = function _speciesConstructor(O, D) {
  var C = anObject$4(O).constructor,
      S;
  return C === undefined || (S = anObject$4(C)[SPECIES]) == undefined ? D : aFunction$2(S);
};

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function _invoke(fn, args, that) {
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

var ctx$2 = _ctx;
var invoke = _invoke;
var html = _html;
var cel = _domCreate;
var global$5 = _global;
var process$1 = global$5.process;
var setTask = global$5.setImmediate;
var clearTask = global$5.clearImmediate;
var MessageChannel = global$5.MessageChannel;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer;
var channel;
var port;
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
  if (_cof(process$1) == 'process') {
    defer = function defer(id) {
      process$1.nextTick(ctx$2(run, id, 1));
    };
    // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx$2(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global$5.addEventListener && typeof postMessage == 'function' && !global$5.importScripts) {
    defer = function defer(id) {
      global$5.postMessage(id + '', '*');
    };
    global$5.addEventListener('message', listener, false);
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
      setTimeout(ctx$2(run, id, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};

var global$6 = _global;
var macrotask = _task.set;
var Observer = global$6.MutationObserver || global$6.WebKitMutationObserver;
var process$2 = global$6.process;
var Promise$1 = global$6.Promise;
var isNode$1 = _cof(process$2) == 'process';

var _microtask = function _microtask() {
  var head, last, notify;

  var flush = function flush() {
    var parent, fn;
    if (isNode$1 && (parent = process$2.domain)) parent.exit();
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
  if (isNode$1) {
    notify = function notify() {
      process$2.nextTick(flush);
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
  } else if (Promise$1 && Promise$1.resolve) {
    var promise = Promise$1.resolve();
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
      macrotask.call(global$6, flush);
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

var redefine$3 = _redefine;
var _redefineAll = function _redefineAll(target, src, safe) {
  for (var key in src) {
    redefine$3(target, key, src[key], safe);
  }return target;
};

var global$7 = _global;
var dP$3 = _objectDp;
var DESCRIPTORS = _descriptors;
var SPECIES$1 = _wks('species');

var _setSpecies = function _setSpecies(KEY) {
  var C = global$7[KEY];
  if (DESCRIPTORS && C && !C[SPECIES$1]) dP$3.f(C, SPECIES$1, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

var ITERATOR$4 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$4]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {/* empty */}

var _iterDetect = function _iterDetect(exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7],
        iter = arr[ITERATOR$4]();
    iter.next = function () {
      return { done: safe = true };
    };
    arr[ITERATOR$4] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

var LIBRARY$1 = _library;
var global$4 = _global;
var ctx$1 = _ctx;
var classof$1 = _classof;
var $export$3 = _export;
var isObject$3 = _isObject;
var aFunction$1 = _aFunction;
var anInstance = _anInstance;
var forOf = _forOf;
var speciesConstructor = _speciesConstructor;
var task = _task.set;
var microtask = _microtask();
var PROMISE = 'Promise';
var TypeError$1 = global$4.TypeError;
var process = global$4.process;
var $Promise = global$4[PROMISE];
var process = global$4.process;
var isNode = classof$1(process) == 'process';
var empty = function empty() {/* empty */};
var Internal;
var GenericPromiseCapability;
var Wrapper;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1),
        FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
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
  return isObject$3(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function newPromiseCapability(C) {
  return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError$1('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$1(resolve);
  this.reject = aFunction$1(reject);
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
            reject(TypeError$1('Promise-chain cycle'));
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
  task.call(global$4, function () {
    var value = promise._v,
        abrupt,
        handler,
        console;
    if (isUnhandled(promise)) {
      abrupt = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global$4.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global$4.console) && console.error) {
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
  task.call(global$4, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global$4.onrejectionhandled) {
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
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx$1($resolve, wrapper, 1), ctx$1($reject, wrapper, 1));
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
    aFunction$1(executor);
    Internal.call(this);
    try {
      executor(ctx$1($resolve, this, 1), ctx$1($reject, this, 1));
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
  Internal.prototype = _redefineAll($Promise.prototype, {
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
    this.resolve = ctx$1($resolve, promise, 1);
    this.reject = ctx$1($reject, promise, 1);
  };
}

$export$3($export$3.G + $export$3.W + $export$3.F * !USE_NATIVE, { Promise: $Promise });
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
$export$3($export$3.S + $export$3.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this),
        $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export$3($export$3.S + $export$3.F * (LIBRARY$1 || !USE_NATIVE), PROMISE, {
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
$export$3($export$3.S + $export$3.F * !(USE_NATIVE && _iterDetect(function (iter) {
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

var global$8 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

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
if (typeof global$8.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$8.clearTimeout === 'function') {
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
var queue$1 = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue$1 = currentQueue.concat(queue$1);
    } else {
        queueIndex = -1;
    }
    if (queue$1.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue$1.length;
    while (len) {
        currentQueue = queue$1;
        queue$1 = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue$1.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};





 // empty string to avoid regexp issues


















// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$8.performance || {};
var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
    return new Date().getTime();
};

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global$8 === 'undefined' ? 'undefined' : _typeof(global$8)) == 'object' && global$8 && global$8.Object === Object && global$8;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var _Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$1.hasOwnProperty;

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
  var isOwn = hasOwnProperty$2.call(value, symToStringTag$1),
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
var hasOwnProperty$1 = objectProto.hasOwnProperty;

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
  var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
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
} else if (typeof global$8 !== 'undefined') {
  root$2 = global$8;
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

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

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
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
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
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ',' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
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
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
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
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

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

    if (input instanceof Request) {
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
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
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
    return new Request(this, { body: this._bodyInit });
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

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split(/\r?\n/).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
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
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
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
})(typeof self !== 'undefined' ? self : undefined);

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.

var fetchNpmBrowserify = self.fetch.bind(self);

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
    Accept: 'application/json'
  }, fetchOptions.headers);

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
    fetchOptions.headers = Object.assign({
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

  return Object.assign(clone(item), { id: uid });
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
  transformed = Object.assign({}, item, { path: path });
  delete transformed.id;

  return transformed;
}

function queryResultsToPath(results) {
  var items = void 0;

  if (!results) {
    return results;
  }

  items = results.items.map(itemUidToPath);

  return Object.assign({}, results, { items: items });
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

      options = Object.assign({ method: method, endpoint: endpoint, token: token, validateUid: validateUid }, paramsToObj.apply(undefined, args));

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

  options = Object.assign({ persist: true }, options);
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

  options = Object.assign({ persist: true }, options);
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

  options = Object.assign({
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
      action = setDataSuccessful$$1(uid, data, { persist: persist });
    }

    return (createAncestry ? ensureParentExists(uid) : Promise.resolve()).then(function () {
      return dispatch(action);
    });
  };
}

function remove$1(uid) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options = Object.assign({ persist: true }, options);
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

var AUTH_SERVER = 'https://api-beta-xb177olenlgv.netdna-ssl.com';

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
      return Object.assign({}, state, defineProperty$1({}, action.prop, action.value));
    default:
      return state;
  }
}

function updateStateWithQuery(state, queryString, updates) {
  return Object.assign({}, state, defineProperty$1({}, queryString, Object.assign({}, state[queryString], updates)));
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
          return updateStateWithQuery(state, queryString, defineProperty$1({}, querying ? 'cache' : 'matches', updated));
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

  return Object.assign({}, state, defineProperty$1({}, key, value));
}

function pruneAt(state, path) {
  var key = path[0];

  if (path.length === 1) {
    var newState = Object.assign({}, state);
    delete newState[key];
    return newState;
  }

  if (state.hasOwnProperty(key)) {
    return Object.assign({}, state, defineProperty$1({}, key, pruneAt(state[key], path.slice(1))));
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

      return Object.assign({}, state, defineProperty$1({}, action.uid, clone(action.response)));
    case REMOVE_DATA_SUCCESSFUL:
      if (state[action.uid] === null) {
        return state;
      }

      return Object.assign({}, state, defineProperty$1({}, action.uid, null));
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

  return Object.assign({}, state, { local: local, remote: remote, changed: changed });
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

      return oldSubstate === newSubstate ? state : Object.assign({}, whole, defineProperty$1({}, id, newSubstate));
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
        var purged = Object.assign({}, state);
        delete purged[action.uid];
        return purged;
      }

      return updateLocal(state, action.uid, action.response);
    default:
      return state;
  }
}

var _combineReducers;

var reducer = combineReducers((_combineReducers = {}, defineProperty$1(_combineReducers, DATA_PREFIX, data), defineProperty$1(_combineReducers, QUERIES_PREFIX, queries), defineProperty$1(_combineReducers, 'authenticated', authenticated), defineProperty$1(_combineReducers, 'config', options), defineProperty$1(_combineReducers, 'editable', editable$1), defineProperty$1(_combineReducers, 'token', token), defineProperty$1(_combineReducers, 'save', save$2), _combineReducers));

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
