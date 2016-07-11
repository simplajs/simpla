import { LOGIN_SUCCESSFUL, LOGOUT_SUCCESSFUL } from '../constants/actionTypes';

export default function authenticated(state = false, action) {
  switch (action.type) {
  case LOGIN_SUCCESSFUL:
    return true;
  case LOGOUT_SUCCESSFUL:
    return false;
  default:
    return state;
  }
}
