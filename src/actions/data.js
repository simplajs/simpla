import { SET_DATA_STATE, GET_DATA_STATE, REMOVE_DATA_STATE } from '../constants/actionTypes';
import { DATA_PREFIX } from '../constants/state';
import { selectPropByPath } from '../utils/helpers';

function syncGet(uid) {
  return {
    type: GET_DATA_STATE,
    uid
  };
}

export function get(uid) {
  return (dispatch, getState) => {
    let state,
        stored;

    dispatch(syncGet(uid));

    state = getState();
    stored = selectPropByPath(`${DATA_PREFIX}.${uid}`, state);

    return Promise.resolve(stored);
  };
}

export const set = (uid, data) => (dispatch, getState) => {

};

export const remove = (uid) => (dispatch, getState) => {

};
