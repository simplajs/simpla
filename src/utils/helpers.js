export function selectPropByPath(path, obj) {
  let selector,
      numberSelector;

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
          onChange(currentState, lastState);
          lastState = currentState;
        }
      }

      store.subscribe(handleChange);
    }
  }
}
