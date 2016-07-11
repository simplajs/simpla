import { SET_OPTION } from '../constants/actionTypes';

export function setOption(prop, value) {
  return {
    type: SET_OPTION,
    prop,
    value
  };
}
