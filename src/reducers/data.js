import { SET_DATA_SUCCESSFUL, REMOVE_DATA_SUCCESSFUL } from '../constants/actionTypes';
import { clone } from '../utils/helpers';
import { combineReducers } from 'redux';

const INITIAL_STATE = {};

function markAt(state, path) {
  let key = path[0],
      value = path.length === 1 ? {} : markAt(state[key] || {}, path.slice(1));

  return Object.assign({}, state, { [key]: value });
}

function pruneAt(state, path) {
  let key = path[0];

  if (path.length === 1) {
    let newState = Object.assign({}, state);
    delete newState[key];
    return newState;
  }

  if (state.hasOwnProperty(key)) {
    return Object.assign({}, state, { [key]: pruneAt(state[key], path.slice(1)) });
  }

  return state;
}

export function hierachy(state = {}, action) {
  switch (action.type) {
  case SET_DATA_SUCCESSFUL:
    return markAt(state, action.uid.split('.'), {});
  case REMOVE_DATA_SUCCESSFUL:
    return pruneAt(state, action.uid.split('.'));
  default:
    return state;
  }
}

export function content(state = {}, action) {
  switch (action.type) {
  case SET_DATA_SUCCESSFUL:
    return Object.assign({}, state, { [ action.uid ]: clone(action.response) });
  case REMOVE_DATA_SUCCESSFUL:
    return Object.assign({}, state, { [ action.uid ]: null });
  default:
    return state;
  }
}

export default combineReducers({ hierachy, content });
