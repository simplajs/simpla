import {
  GET_DATA_FROM_API_SUCCESSFUL,
  SET_DATA_TO_API_SUCCESSFUL,
  REMOVE_DATA_FROM_API_SUCCESSFUL,
  FIND_DATA_FROM_API_SUCCESSFUL,

  SET_DATA_SUCCESSFUL,
  REMOVE_DATA_SUCCESSFUL
} from '../constants/actionTypes';
import { clone } from '../utils/helpers';

/**
 * Check if two object are different. Uses JSON stringify to check
 *  whether they've changed.
 * NOTE: May be a perf issue thanks to JSON.stringify, worth investigating
 * @param  {Object}  remote Object on remote state
 * @param  {Object}  local  Object on local state
 * @return {Boolean}        True if they are different, false otherwise
 */
function isDifferent(remote, local) {
  let remoteAsString = JSON.stringify(remote),
      localAsString = JSON.stringify(local);

  return remoteAsString !== localAsString;
}

/**
 * Reduce part of the save state. Designes to be a reducer for arbitrary UID
 * @param  {Object} [state={}] State of save info at UID
 * @param  {Object} action     Action being performed on the store
 * @return {Object}            New state
 */
function reducePart(state = {}, data, isRemote) {
  debugger;
  let { local, remote, changed } = state;

  if (isRemote) {
    remote = clone(data || null);
  } else {
    local = clone(data || null);
  }

  changed = isDifferent(remote, local);

  return Object.assign({}, state, { local, remote, changed });
}

/**
 * Save Reducer
 * @param  {Object} [state={}] Current state
 * @param  {Object} action       Action to apply to state
 * @return {Object}              New state
 */
export default function save(state = {}, action) {
  let updatePart = (whole, id, data, remote) => {
    let oldSubstate = whole[id],
        newSubstate = reducePart(whole[id], data, remote);

    return oldSubstate === newSubstate ? state : Object.assign({}, whole, { [ id ]: newSubstate });
  };

  switch (action.type) {
  case FIND_DATA_FROM_API_SUCCESSFUL:
    return action.response.items.reduce((whole, item) => {
      return updatePart(whole, item.id, item, true);
    }, state);
  case GET_DATA_FROM_API_SUCCESSFUL:
  case SET_DATA_TO_API_SUCCESSFUL:
  case REMOVE_DATA_FROM_API_SUCCESSFUL:
    return updatePart(state, action.uid, action.response, true);
  case SET_DATA_SUCCESSFUL:
  case REMOVE_DATA_SUCCESSFUL:
    return updatePart(state, action.uid, action.response, false);
  default:
    return state;
  }
}
