import { DATA_PREFIX } from '../constants/state';

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

export function findDataInState(query, state) {
  let dataState = state[DATA_PREFIX],
      items = [],
      content,
      hierarchy;

  if (!dataState) {
    return [];
  }

  ({ content, hierarchy } = dataState);

  // Parent filter
  if (query.parent) {
    let childObject = selectPropByPath(query.parent, hierarchy);

    if (childObject) {
      let children = Object.keys(childObject)
        .map(id => content[`${query.parent}.${id}`]);

      items = children;
    }
  } else {
    items = Object.keys(content)
      .map(uid => content[uid]);
  }

  return { items };
}

export function storeToObserver(store) {
  return {
    observe(...args) {
      let onChange = args.pop(),
          selector = args[0],
          lastState,
          unsubscribe,
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

export function ensureActionMatches(expectedType) {
  return (action) => {
    return action.type === expectedType ? Promise.resolve(action) : Promise.reject(action);
  }
}

export function dispatchThunkAndExpect(store, ...args) {
  return runDispatchAndExpect(store.dispatch, ...args);
}

export function runDispatchAndExpect(dispatch, action, expectedType) {
  return dispatch(action)
    .then(ensureActionMatches(expectedType))
    .then(
      action => action.response,
      action => Promise.reject(action.response)
    );
}

/**
 * Clone's the given object using JSON.parse(JSON.stringify(...));
 * @param  {Object} object Object should be JSON compatible
 * @return {Object}        Clone of given object
 */
export function clone(object) {
  return JSON.parse(JSON.stringify(object));
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
  return Object.keys(query)
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
