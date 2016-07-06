import { SET_OPTION } from '../constants/actionTypes';

export function setAuthEndpoint(authEndpoint) {
  return {
    type: SET_OPTION,
    prop: 'authEndpoint',
    value: authEndpoint
  };
}

export function setDataEndpoint(dataEndpoint) {
  return {
    type: SET_OPTION,
    prop: 'dataEndpoint',
    value: dataEndpoint
  };
}
