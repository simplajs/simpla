const toString = Object.prototype.toString;

/**
 * Encodes the given string as base64. This differs from normal btoa
 * as it supports all unicode characters
 * @param {string} str String to encode
 */
export function encodeBase64Unicode(str) {
  return window.btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode('0x' + p1)
    )
  );
}

export function isPrimitive(data) {
  switch (toString.call(data)) {
    case '[object String]':
    case '[object Number]':
    case '[object Boolean]':
    case '[object Null]':
    case '[object Undefined]':
      return true;
  }

  return false;
}

export function equal(a, b) {
  let objectName = toString.call(a),
    isSameAsIn = other => (item, i) => equal(item, other[i]),
    hasSameIn = (a, b) => key => key in a && key in b && equal(a[key], b[key]),
    keysOfA;

  if (objectName !== toString.call(b)) {
    return false;
  }

  if (isPrimitive(a)) {
    return a === b;
  }

  if (Array.isArray(a)) {
    return a.length === b.length && a.every(isSameAsIn(b));
  }

  // At this point we assume it's an object
  keysOfA = Object.keys(a);

  if (keysOfA.length !== Object.keys(b).length) {
    return false;
  }

  return keysOfA.every(hasSameIn(a, b));
}

export function clone(data) {
  if (isPrimitive(data)) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(clone);
  }

  let copy = Object.create(null);

  for (let i in data) {
    copy[i] = clone(data[i]);
  }

  return copy;
}

export function getRandomString() {
  return Math.random().toString(32).slice(-5);
}

export function validatePath(path) {
  if (path.indexOf('/') !== 0) {
    throw new Error(`Invalid path '${path}'. Path must start with leading '/'`);
  }
}

export function validateItem(item) {
  if (item === null) {
    return;
  }

  const allowed = ['data', 'type', 'path', 'createdAt', 'updatedAt'];
  const keys = Object.keys(item);

  if ('data' in item) {
    if (typeof item.data !== 'object' || item.data === null) {
      throw new TypeError(
        `'data' property in item must be a non-null object. Got ${typeof item.data}`
      );
    }
  }

  if ('type' in item) {
    if (typeof item.type !== 'string' && item.type !== null) {
      throw new TypeError(
        `'type' property in item must be a string or null. Got ${typeof item.type}`
      );
    }
  }

  for (let i = 0, k = keys.length; i < k; i++) {
    let key = keys[i];
    if (allowed.indexOf(key) === -1) {
      throw new Error(
        `Invalid property ${key}. Valid properties are ${allowed
          .slice(0, -1)
          .join(', ')} or ${allowed[allowed.length - 1]}.`
      );
    }
  }
}

export function toShortcodeAndUploads(data) {
  let uploads = [],
    mapped;

  const withShortcode = (url, ext, content) => {
    let name = getRandomString(),
      file = `${name}.${ext}`,
      shortcode = `[upload ${file}]`;

    uploads.push([file, content]);

    return shortcode;
  };

  mapped = deepMapIn(data, value => {
    if (typeof value === 'string') {
      return value.replace(
        /data:image\/(.+?);base64,([A-Za-z0-9+/=]+)/g,
        withShortcode
      );
    }

    return value;
  });

  return [mapped, uploads];
}

export function byModified(buffer) {
  return ([key]) => !buffer || !buffer[key] || buffer[key].modified;
}

export function deepMapIn(item, transform) {
  if (Array.isArray(item)) {
    return item.map(item => deepMapIn(item, transform));
  }

  if (typeof item === 'object' && item !== null) {
    let mapped = Object.create(null);
    for (let i in item) {
      mapped[i] = deepMapIn(item[i], transform);
    }

    return mapped;
  }

  return transform(item);
}

export function noop() {}

export const assign = Object.assign ? Object.assign.bind(Object) : (target) => {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  let to = Object(target);

  for (let index = 1; index < arguments.length; index++) {
    let nextSource = arguments[index];

    if (nextSource != null) {
      for (let nextKey in nextSource) {
        if (nextSource.hasOwnProperty(nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
};