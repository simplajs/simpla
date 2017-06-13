import { OBSERVE_QUERY } from '../constants/actionTypes';

export function observeQuery({ query, content }) {
  return {
    type: OBSERVE_QUERY,
    query,
    content
  };
}
