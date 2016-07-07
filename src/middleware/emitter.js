import EventEmitter from 'eventemitter3';

export const emitter = new EventEmitter();

/**
 * Emit events that correspond to the given action. Only done after any particular
 * 	action has been fixed
 */
export const emitterMiddleware = store => next => action => {
  let result = next(action),
      event = action.type,
      data = Object.assign({}, action);

  delete data.type;

  emitter.emit(event, data);
  return result;
}

export default emitterMiddleware;
