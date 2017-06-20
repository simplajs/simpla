import { SET_DATA_SUCCESSFUL, REMOVE_DATA_SUCCESSFUL } from '../constants/actionTypes';
import { clone, jsonIsEqual } from '../utils/helpers';

export default function content(state = {}, action) {
  switch (action.type) {
  case SET_DATA_SUCCESSFUL:
    let currentContent = state[action.path],
        newContent = clone(action.response);

    if (jsonIsEqual(currentContent, newContent)) {
      return state;
    }

    return Object.assign({}, state, { [ action.path ]: clone(action.response) });
  case REMOVE_DATA_SUCCESSFUL:
    if (state[action.path] === null) {
      return state;
    }

    return Object.assign({}, state, { [ action.path ]: null });
  default:
    return state;
  }
}
