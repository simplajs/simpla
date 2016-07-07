import { LOGIN_SUCCESSFUL, LOGOUT } from '../constants/actionTypes';

const INITIAL_STATE = {
  token: null,
  authenticated: false
};

export default function authentication(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_SUCCESSFUL:
    return Object.assign({}, state, {
      token: action.token,
      authenticated: true
    });
  case LOGOUT:
    return Object.assign({}, state, {
      token: null,
      authenticated: false
    });
  default:
    return state;
  }
}
