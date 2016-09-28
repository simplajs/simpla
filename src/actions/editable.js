import { EDIT_ACTIVE, EDIT_INACTIVE } from '../constants/actionTypes';

export function editActive() {
  return {
    type: EDIT_ACTIVE
  };
}

export function editInactive() {
  return {
    type: EDIT_INACTIVE
  };
}
