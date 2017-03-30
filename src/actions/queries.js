import { OBSERVE_QUERY } from '../constants/actionTypes';

export function observeQuery(query) {
  return {
    type: OBSERVE_QUERY,
    query
  };
}
