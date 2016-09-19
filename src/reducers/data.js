import { SET_DATA_STATE, REMOVE_DATA_STATE } from '../constants/actionTypes';

const INITIAL_STATE = {};

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function setIn(state, path, data) {
  let key = path[0],
      value = path.length === 1 ? clone(data) : setIn(state[key] || {}, path.slice(1), data);

  return Object.assign({}, state, { [key]: value });
}

export default function data(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_DATA_STATE:
    return setIn(state, action.uid.split('.'), action.data);
  case REMOVE_DATA_STATE:
    return setIn(state, action.uid.split('.'), null);
  default:
    return state;
  }
}
