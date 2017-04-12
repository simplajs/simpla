import {
  FIND_DATA_FROM_API,
  FIND_DATA_FROM_API_SUCCESSFUL,
  FIND_DATA_FROM_API_FAILED,

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
import { toQueryParams } from '../utils/helpers';

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

function formatAndRun({ uid = '', validateUid = true, query, endpoint: dataEndpoint, token, method, body }) {
  const endpoint = `${dataEndpoint}/${encodeURIComponent(uid)}${toQueryParams(query)}`,
        invalid = isInvalid(uid);

  if (validateUid && invalid) {
    return Promise.reject(new Error(invalid));
  }

  return client[method](endpoint, {
    body,
    token
  });
}

function generateHandler(method, paramsToObj, [ start, success, fail ], validateUid) {
  return (...args) => (dispatch, getState) => {
    let { config, token } = getState(),
        endpoint = config.dataEndpoint,
        options;

    options = Object.assign({ method, endpoint, token, validateUid }, paramsToObj(...args));

    dispatch(start(...args));
    return formatAndRun(options)
      .then(
        response => dispatch(success(...args, response)),
        error => dispatch(fail(...args, error))
      );
  };
}

export const findData = (query) => ({ type: FIND_DATA_FROM_API, query });
export const findDataSuccessful = (query, response) => ({ type: FIND_DATA_FROM_API_SUCCESSFUL, query, response });
export const findDataFailed = (query, response) => ({ type: FIND_DATA_FROM_API_FAILED, query, response });

export const getData = (uid) => ({ type: GET_DATA_FROM_API, uid });
export const getDataSuccessful = (uid, response) => ({ type: GET_DATA_FROM_API_SUCCESSFUL, uid, response });
export const getDataFailed = (uid, response) => ({ type:  GET_DATA_FROM_API_FAILED, uid, response });

export const setData = (uid, body) => ({ type: SET_DATA_TO_API, uid, body });
export const setDataSuccessful = (uid, body, response) => ({ type: SET_DATA_TO_API_SUCCESSFUL, uid, body, response });
export const setDataFailed = (uid, body, response) => ({ type:  SET_DATA_TO_API_FAILED, uid, body, response });

export const removeData = (uid) => ({ type: REMOVE_DATA_FROM_API, uid });
export const removeDataSuccessful = (uid, response) => ({ type: REMOVE_DATA_FROM_API_SUCCESSFUL, uid, response });
export const removeDataFailed = (uid, response) => ({ type:  REMOVE_DATA_FROM_API_FAILED, uid, response });

export const get = generateHandler('get', (uid) => ({ uid }), [ getData, getDataSuccessful, getDataFailed ]);
export const set = generateHandler('put', (uid, body) => ({ uid, body }), [ setData, setDataSuccessful, setDataFailed ]);
export const remove = generateHandler('delete', (uid) => ({ uid }), [ removeData, removeDataSuccessful, removeDataFailed ]);
export const find = generateHandler('get', (query) => ({ query }), [ findData, findDataSuccessful, findDataFailed ], false);
