import {
  LOGIN,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESSFUL,
  LOGOUT_FAILED
} from '../constants/actionTypes';
import client from '../utils/client';

function syncLogin({ email, password }) {
  return {
    type: LOGIN,
    email,
    password
  };
}

export function loginSuccessful(token) {
  return {
    type: LOGIN_SUCCESSFUL,
    response: token
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    response: error
  };
}

export function login({ email, password }) {
  return (dispatch, getState) => {
    let { authEndpoint } = getState().config;

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

export function logoutSuccessful() {
  return {
    type: LOGOUT_SUCCESSFUL
  };
}

export function logoutFailed() {
  return {
    type: LOGOUT_FAILED
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(syncLogout());
    return Promise.resolve().then(() => dispatch(logoutSuccessful()));
  }
}
