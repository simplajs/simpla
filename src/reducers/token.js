import { LOGIN_SUCCESSFUL, LOGOUT } from '../constants/actionTypes';

export default function token(state = null, action) {
  switch (action.type) {
  case LOGIN_SUCCESSFUL:
    return action.token;
  case LOGOUT:
    return null;
  default:
    return state;
  }
}
