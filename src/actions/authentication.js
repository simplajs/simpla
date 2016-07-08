import { LOGIN, LOGIN_SUCCESSFUL, LOGIN_FAILED, LOGOUT } from '../constants/actionTypes';
import client from '../utils/client';

function syncLogin({ email, password }) {
  return {
    type: LOGIN,
    email,
    password
  };
}

function loginSuccessful(token) {
  return {
    type: LOGIN_SUCCESSFUL,
    response: token
  };
}

function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    response: error
  };
}

export function login({ email, password }) {
  return (dispatch, getState) => {
    let { authEndpoint } = getState().options;

    dispatch(syncLogin({ email, password }));

    return client.post(`${authEndpoint}/login`, {
      body: { email, password }
    })
    .then(
      success => dispatch(loginSuccessful(success.token)),
      error => dispatch(loginFailed(error))
    );
  }
}

function syncLogout() {
  return {
    type: LOGOUT
  };
}

export function logout() {
  return (dispatch) => Promise.resolve().then(() => dispatch(syncLogout()));
}
