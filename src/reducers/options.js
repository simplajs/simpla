import { SET_OPTION } from '../constants/actionTypes';

export default function options(state = {}, action) {
  switch (action.type) {
  case SET_OPTION:
    return Object.assign({}, state, {
      [ action.prop ]: action.value
    });
  default:
    return state;
  }
}
