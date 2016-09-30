import { SET_DATA_SUCCESSFUL, REMOVE_DATA_SUCCESSFUL } from '../constants/actionTypes';
import { clone } from '../utils/helpers';

const INITIAL_STATE = {};

function setIn(state, path, data) {
  let key = path[0],
      value = path.length === 1 ? clone(data) : setIn(state[key] || {}, path.slice(1), data);

  return Object.assign({}, state, { [key]: value });
}

export default function data(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_DATA_SUCCESSFUL:
    return setIn(state, action.uid.split('.'), action.response);
  case REMOVE_DATA_SUCCESSFUL:
    return setIn(state, action.uid.split('.'), null);
  default:
    return state;
  }
}
