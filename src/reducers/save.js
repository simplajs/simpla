import {
  GET_DATA_FROM_API_SUCCESSFUL,
  SET_DATA_TO_API_SUCCESSFUL,
  REMOVE_DATA_FROM_API_SUCCESSFUL,

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
function reducePart(state = {}, action) {
  let { local, remote, changed } = state;

  switch(action.type) {
    case GET_DATA_FROM_API_SUCCESSFUL:
    case SET_DATA_TO_API_SUCCESSFUL:
    case REMOVE_DATA_FROM_API_SUCCESSFUL:
      remote = clone(action.response || null);
      changed = isDifferent(remote, local);

      return Object.assign({}, state, { remote, changed });
    case SET_DATA_SUCCESSFUL:
    case REMOVE_DATA_SUCCESSFUL:
      local = clone(action.response || null);
      changed = isDifferent(remote, local);

      return Object.assign({}, state, { local, changed });
    default:
      return state;
  }
}

/**
 * Save Reducer
 * @param  {Object} [state={}] Current state
 * @param  {Object} action       Action to apply to state
 * @return {Object}              New state
 */
export default function save(state = {}, action) {
  if (action.hasOwnProperty('uid')) {
    const { uid } = action,
          currentUidState = state[uid],
          newUidState = reducePart(currentUidState, action);

    if (newUidState !== currentUidState) {
      return Object.assign({}, state, { [ uid ]: newUidState });
    }
  }

  return state;
}
