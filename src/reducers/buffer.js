import {
  GET_DATA_FROM_API_SUCCESSFUL,
  SET_DATA_TO_API_SUCCESSFUL,
  REMOVE_DATA_FROM_API_SUCCESSFUL,
  FIND_DATA_FROM_API_SUCCESSFUL,

  SET_DATA_SUCCESSFUL,
  REMOVE_DATA_SUCCESSFUL
} from '../constants/actionTypes';
import { clone, jsonIsEqual } from '../utils/helpers';

const INITIAL_STATE = { verbose: {}, simple: {} };

function verboseToSimple(verbose) {
  return Object.keys(verbose)
    .reduce((simple, path) => {
      let { changed: modified } = verbose[path];

      return Object.assign(simple, { [ path ]: { modified } });
    }, {});
}

/**
 * Reduce state of individual path
 * @param  {Object}   [state={}] State of save info at path
 * @param  {Object}   data       Incoming data for the item at path
 * @param  {Boolean}  isRemote   Whether data is remote data or local if not
 * @return {Object}
 */
function reducePart(state = {}, data, isRemote) {
  let { local, remote, changed } = state;

  if (isRemote) {
    remote = clone(data || null);
  } else {
    local = clone(data || null);
  }

  changed = !jsonIsEqual(remote, local);

  return Object.assign({}, state, { local, remote, changed });
}

/**
 * Save Reducer
 * @param  {Object} [state={}] Current state
 * @param  {Object} action       Action to apply to state
 * @return {Object}              New state
 */
export function verboseReducer(state = {}, action) {
  let updatePart,
      updateLocal,
      updateRemote;

  updatePart = (remote) => (whole, path, data) => {
    let oldSubstate = whole[path],
        newSubstate = reducePart(whole[path], data, remote);

    return oldSubstate === newSubstate ? state : Object.assign({}, whole, { [ path ]: newSubstate });
  };

  updateLocal = updatePart(false);
  updateRemote = updatePart(true);

  switch (action.type) {
  case FIND_DATA_FROM_API_SUCCESSFUL:
    return action.response.items.reduce((whole, item) => {
      return updateRemote(whole, item.path, item);
    }, state);
  case GET_DATA_FROM_API_SUCCESSFUL:
  case SET_DATA_TO_API_SUCCESSFUL:
    return updateRemote(state, action.path, action.response);
  case REMOVE_DATA_FROM_API_SUCCESSFUL:
    return updateRemote(state, action.path, null);
  case SET_DATA_SUCCESSFUL:
    if (!action.persist) {
      return state;
    }

    return updateLocal(state, action.path, action.response);
  case REMOVE_DATA_SUCCESSFUL:
    if (!action.persist) {
      let purged = Object.assign({}, state);
      delete purged[action.path];
      return purged;
    }

    return updateLocal(state, action.path, action.response);
  default:
    return state;
  }
}

export default function buffer(state = INITIAL_STATE, action) {
  let verbose,
      simple;

  verbose = verboseReducer(state.verbose, action);

  if (verbose !== state.verbose) {
    simple = verboseToSimple(verbose);
    return { verbose, simple };
  }

  return state;
}
