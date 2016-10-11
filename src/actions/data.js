import {
  GET_DATA,
  GET_DATA_SUCCESSFUL,
  GET_DATA_FROM_API_SUCCESSFUL,
  SET_DATA,
  SET_DATA_SUCCESSFUL,
  SET_DATA_FAILED,
  REMOVE_DATA,
  REMOVE_DATA_SUCCESSFUL
} from '../constants/actionTypes';
import { DATA_PREFIX } from '../constants/state';
import { INVALID_DATA } from '../constants/errors';
import { selectDataFromState, runDispatchAndExpect, dataIsValid } from '../utils/helpers';
import { get as getFromApi } from './api';

export function getData(uid) {
  return {
    type: GET_DATA,
    uid
  };
}

export function getDataSuccessful(uid, response) {
  return {
    type: GET_DATA_SUCCESSFUL,
    response,
    uid
  }
}

export function setData(uid, data) {
  return {
    type: SET_DATA,
    uid,
    data
  };
}

export function setDataSuccessful(uid, response) {
  return {
    type: SET_DATA_SUCCESSFUL,
    response,
    uid
  };
}

export function setDataFailed(uid, error) {
  return {
    type: SET_DATA_SUCCESSFUL,
    response: error,
    uid
  };
}

export function removeData(uid) {
  return {
    type: REMOVE_DATA,
    uid
  };
}

export function removeDataSuccessful(uid) {
  return {
    type: REMOVE_DATA_SUCCESSFUL,
    uid
  };
}

export function get(uid) {
  return (dispatch, getState) => {
    let state,
        stored,
        fetchData;

    dispatch(getData(uid));

    state = getState();
    stored = selectDataFromState(uid, state);

    if (typeof stored === 'undefined') {
      fetchData = runDispatchAndExpect(dispatch, getFromApi(uid), GET_DATA_FROM_API_SUCCESSFUL)
        .then((response) => runDispatchAndExpect(dispatch, set(uid, response, false), SET_DATA_SUCCESSFUL));
    } else {
      fetchData = Promise.resolve(stored);
    }

    return fetchData
      .then((response) => dispatch(getDataSuccessful(uid, response)));
  };
}

export function set(uid, data, validate = true) {
  return (dispatch, getState) => {
    let action;

    dispatch(setData(uid, data));

    if (validate && !dataIsValid(data)) {
      action = setDataFailed(uid, new Error(INVALID_DATA));
    } else {
      action = setDataSuccessful(uid, data);
    }

    return Promise.resolve()
      .then(() => dispatch(action));
  };
}

export function remove(uid, data) {
  return (dispatch, getState) => {
    dispatch(removeData(uid));

    return Promise.resolve()
      .then(() => dispatch(removeDataSuccessful(uid)));
  };
}
