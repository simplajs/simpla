import { EDIT_ACTIVE, EDIT_INACTIVE } from '../constants/actionTypes';

const INITIAL_STATE = false;

export default function editing(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EDIT_ACTIVE:
    return true;
  case EDIT_INACTIVE:
    return false;
  default:
    return state;
  }
}
