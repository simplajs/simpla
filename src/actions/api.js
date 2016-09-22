import {
  GET_DATA_FROM_API,
  GET_DATA_FROM_API_SUCCESSFUL,
  GET_DATA_FROM_API_FAILED,

  SET_DATA_TO_API,
  SET_DATA_TO_API_SUCCESSFUL,
  SET_DATA_TO_API_FAILED,

  REMOVE_DATA_FROM_API,
  REMOVE_DATA_FROM_API_SUCCESSFUL,
  REMOVE_DATA_FROM_API_FAILED
} from '../constants/actionTypes';
import client from '../utils/client';
import { selectPropByPath } from '../utils/helpers';

/**
 * Check if uid is invalid. If invalid, returns message why, otherwise returns
 * 	false
 * @param  {String} uid
 * @return {Boolean}
 */
function isInvalid(uid) {
  if (typeof uid !== 'undefined' && uid === '') {
    return 'Invalid UID: Empty string is not a valid UID';
  }
}

function formatAndRun({ uid, endpoint: dataEndpoint, token, method, body }) {
  const endpoint = `${dataEndpoint}/${encodeURIComponent(uid)}`,
        invalid = isInvalid(uid),
        args = [ endpoint ];

  if (invalid) {
    return Promise.reject(new Error(invalid));
  }

  return client[method](endpoint, {
    body,
    token
  });
}

function generateRequestActions(start, success, fail) {
  return [
    (uid, data) => ({ type: start, uid, data }),
    (uid, response) => ({ type: success, uid, response }),
    (uid, error) => ({ type: fail, uid, error })
  ];
}

function generateHandler(method, [ start, success, fail ]) {
  return (uid, body) => (dispatch, getState) => {
    let { options, token } = getState(),
        endpoint = options.dataEndpoint;

    dispatch(start(uid, body));
    return formatAndRun({ method, uid, body, endpoint, token })
      .then(
        response => dispatch(success(uid, response)),
        error => dispatch(fail(uid, error))
      );
  };
}

export const [
  getData,
  getDataSuccessful,
  getDataFailed
] = generateRequestActions(GET_DATA_FROM_API, GET_DATA_FROM_API_SUCCESSFUL, GET_DATA_FROM_API_FAILED);

export const [
  setData,
  setDataSuccessful,
  setDataFailed
] = generateRequestActions(SET_DATA_TO_API, SET_DATA_TO_API_SUCCESSFUL, SET_DATA_TO_API_FAILED);

export const [
  removeData,
  removeDataSuccessful,
  removeDataFailed
] = generateRequestActions(REMOVE_DATA_FROM_API, REMOVE_DATA_FROM_API_SUCCESSFUL, REMOVE_DATA_FROM_API_FAILED);

export const get = generateHandler('get', [ getData, getDataSuccessful, getDataFailed ]);
export const set = generateHandler('put', [ setData, setDataSuccessful, setDataFailed ]);
export const remove = generateHandler('delete', [ removeData, removeDataSuccessful, removeDataFailed ]);
