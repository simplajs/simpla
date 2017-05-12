import { DATA_PREFIX, QUERIES_PREFIX } from '../constants/state';

export function selectPropByPath(path, obj) {
  let selector,
      numberSelector;

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

export function selectDataFromState(uid, state) {
  let dataState = state[DATA_PREFIX],
      data;

  if (dataState) {
    data = dataState.content[uid];
  }

  return data;
}

export function uidsToResponse(uids, state) {
  let { content } = state[DATA_PREFIX];

  return {
    items: uids.map(uid => content[uid])
  };
}

export function findDataInState(query, state) {
  let dataState = state[DATA_PREFIX],
      uids = [],
      content,
      hierarchy;

  if (!dataState) {
    return { items: [] };
  }

  ({ content, hierarchy } = dataState);

  // Parent filter
  if (query.parent) {
    let childObject = selectPropByPath(query.parent, hierarchy);

    if (childObject) {
      uids = Object.keys(childObject)
        .map(id => `${query.parent}.${id}`);
    }
  } else {
    uids = Object.keys(content);
  }

  return uidsToResponse(uids, state);
}

export function storeToObserver(store) {
  return {
    observe(...args) {
      let onChange = args.pop(),
          selector = args[0],
          lastState,
          getState,
          handleChange;

      getState = () => {
        return selector ? selectPropByPath(selector, store.getState()) : store.getState();
      }

      lastState = getState();
      handleChange = () => {
        let currentState = getState();
        if (currentState !== lastState) {
          let args = [ currentState, lastState ];
          lastState = currentState;
          onChange(...args);
        }
      }

      return {
        unobserve: store.subscribe(handleChange)
      };
    }
  }
}

export function matchesQuery(query = {}, content) {
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

export function ensureActionMatches(expectedType) {
  return (action) => {
    return action.type === expectedType ? Promise.resolve(action) : Promise.reject(action);
  }
}

export function runDispatchAndExpect(dispatch, action, expectedType) {
  const isAction = (response) => typeof response.type !== 'undefined' && typeof response.response !== 'undefined';

  return dispatch(action)
    .then(ensureActionMatches(expectedType))
    .then(
      action => action.response,
      action => isAction(action) ? Promise.reject(action.response) : Promise.reject(action)
    );
}

export function dispatchThunkAndExpect(store, ...args) {
  return runDispatchAndExpect(store.dispatch, ...args);
}

/**
 * Deep clone's the given object recursively. Doesn't touch object's prototype,
 *  and only clones obejct, arrays and primitives.
 * @param  {Object} object Object should be JSON compatible
 * @return {Object}        Clone of given object
 */
export function clone(subject) {
  var cloned;

  if (typeof subject !== 'object' || !subject) {
    return subject;
  }

  if ('[object Array]' === Object.prototype.toString.apply(subject)) {
    return subject.map(clone);
  }

  cloned = {};
  for (let key in subject) {
    if (subject.hasOwnProperty(key)) {
      cloned[key] = clone(subject[key]);
    }
  }

  return cloned;
}

export function dataIsValid(data) {
  let whitelist = [ 'type', 'data' ],
      props = Object.keys(data || {});

  if (props.length === 0) {
    return false;
  }

  return props.every(prop => whitelist.indexOf(prop) !== -1);
}

export function toQueryParams(query = {}) {
  // Sort alphabetically, so that when caching it will always be the same key
  let alphabetically = (a, b) => a < b ? -1 : a > b ? 1 : 0;

  return Object.keys(query)
    .sort(alphabetically)
    .reduce((working, param) => {
      let value = query[param],
          prefix;

      if (!working) {
        prefix = '?';
      } else {
        prefix = `${working}&`;
      }

      return `${prefix}${param}=${encodeURIComponent(value)}`;
    }, '');
}

export function hasRunQuery(query, state) {
  const queryState = state[QUERIES_PREFIX],
        queryParams = toQueryParams(query);
  return !!(queryState && queryState[queryParams] && queryState[queryParams].queriedRemote);
}

export function makeBlankItem() {
  return {
    type: null,
    data: null
  };
}

export function makeItemWith(uid, item) {
  if (item === null) {
    return null
  };

  return Object.assign(clone(item), { id: uid });
}

export function pathToUid(path) {
  if (!path) {
    return path;
  }

  path = path.replace(/^\/+/, '').replace(/\/+$/, '');

  return path.split('/').join('.');
}

export function uidToPath(uid) {
  if (!uid) {
    return uid;
  }

  // Normalize so there's always a leading /
  if (uid.charAt(0) !== '.') {
    uid = `.${uid}`;
  }

  return uid.split('.').join('/');
}

export function itemUidToPath(item) {
  let path,
      transformed;

  if (!item) {
    return item;
  }

  path = uidToPath(item.id);
  transformed = Object.assign({}, item, { path });
  delete transformed.id;

  return transformed;
}

export function queryResultsToPath(results) {
  let items;

  if (!results) {
    return results;
  }

  items = results.items.map(itemUidToPath);

  return Object.assign({}, results, { items });
}

export function validatePath(path) {
  if (path.charAt(0) !== '/') {
    throw new Error(`Invalid path ${path}. Path must be a string starting with '/'`);
  }

  if (path.indexOf('//') !== -1) {
    throw new Error(`Invalid path '${path}'. Paths must not have more than one '/' in a row.`);
  }
}

export function jsonIsEqual(a, b) {
  let objectName = window.toString.call(a),
      isSameAsIn = other => (item, i) => jsonIsEqual(item, other[i]),
      hasSameIn = (a, b) => (key) => key in a && key in b && jsonIsEqual(a[key], b[key]),
      keysOfA;

  if (objectName !== toString.call(b)) {
    return false;
  }

  switch (objectName) {
  case '[object String]':
  case '[object Number]':
  case '[object Boolean]':
  case '[object Null]':
  case '[object Undefined]':
    return a === b;
  }

  if (Array.isArray(a)) {
    return a.length === b.length  && a.every(isSameAsIn(b));
  }

  // At this point we assume it's an object
  keysOfA = Object.keys(a);

  if (keysOfA.length !== Object.keys(b).length) {
    return false;
  }

  return keysOfA.every(hasSameIn(a, b));
}
