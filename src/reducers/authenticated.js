import { LOGIN_SUCCESSFUL, LOGOUT } from '../constants/actionTypes';

export default function authenticated(state = false, action) {
  switch (action.type) {
  case LOGIN_SUCCESSFUL:
    return true;
  case LOGOUT:
    return false;
  default:
    return state;
  }
}
