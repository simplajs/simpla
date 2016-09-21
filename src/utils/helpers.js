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

      return store.subscribe(handleChange);
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
