import { FIND_DATA_FROM_API_SUCCESSFUL } from '../constants/actionTypes';
import { toQueryParams } from '../utils/helpers';

export default function options(state = {}, action) {
  switch (action.type) {
  case FIND_DATA_FROM_API_SUCCESSFUL:
    return Object.assign({}, state, {
      [ toQueryParams(action.query) ]: true
    });
  default:
    return state;
  }
}
