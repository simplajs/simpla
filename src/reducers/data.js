import { SET_DATA_SUCCESSFUL, REMOVE_DATA_SUCCESSFUL } from '../constants/actionTypes';
import { clone, jsonIsEqual } from '../utils/helpers';

export default function content(state = {}, action) {
  switch (action.type) {
  case SET_DATA_SUCCESSFUL:
    let currentContent = state[action.uid],
        newContent = clone(action.response);

    if (jsonIsEqual(currentContent, newContent)) {
      return state;
    }

    return Object.assign({}, state, { [ action.uid ]: clone(action.response) });
  case REMOVE_DATA_SUCCESSFUL:
    if (state[action.uid] === null) {
      return state;
    }

    return Object.assign({}, state, { [ action.uid ]: null });
  default:
    return state;
  }
}
