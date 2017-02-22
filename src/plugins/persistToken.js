import { loginSuccessful } from '../actions/authentication';

export const TOKEN_KEY = 'simpla-token';

const TOKEN_ISSUER = 'https://simpla.auth0.com/',
      WARN_NO_SET = 'Could not remember login token. Are you in Private Mode?',
      WARN_NO_READ = 'Could not load login token from storage. Are you in Private Mode?',
      WARN_NO_REMOVE = 'Could not logout. Are you in Private Mode?',
      WARN_INVALID = 'Invalid token';

export function tokenIsValid(token) {
  const now = (new Date()).getTime() / 1000;
  let payload;

  if (!token) {
    return false;
  }

  try {
    let [, payloadString, ] = token.split('.');
    payload = JSON.parse(atob(payloadString));
  } catch (e) {
    console.warn(WARN_INVALID, e.message);
    return false;
  }

  // Check if payload has expired
  if (payload.exp && now > payload.exp) {
    return false;
  }

  // Check to see if issuer
  if (!payload.iss || payload.iss !== TOKEN_ISSUER) {
    return false;
  }

  return true;
}

export function setTokenToStorage(token) {
  if (token) {
    try {
      window.localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.warn(WARN_NO_SET);
    }
  } else {
    try {
      window.localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.warn(WARN_NO_REMOVE);
    }
  }
}

export function readTokenFromStorage(Simpla) {
  let tokenInStorage;

  try {
    tokenInStorage = window.localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    tokenInStorage = false;
    console.log(WARN_NO_READ);
  }

  if (tokenIsValid(tokenInStorage)) {
    // WARNING: This is private and should be removed in future
    Simpla._store.dispatch(loginSuccessful(tokenInStorage));
  } else {
    try {
      window.localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.warn(WARN_NO_REMOVE);
    }
  }
}

export default function(Simpla) {
  readTokenFromStorage(Simpla);
  Simpla.observeState('token', setTokenToStorage);
}
