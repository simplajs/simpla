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

function formatAndRun({ uid = '', query, endpoint: dataEndpoint, token, method, body }) {
  const endpoint = `${dataEndpoint}/${encodeURIComponent(uid)}${toQueryParams(query)}`,
        invalid = !query && isInvalid(uid),
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
    let { config, token } = getState(),
        endpoint = config.dataEndpoint;

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

export const findData = (query) => {
  return {
    type: FIND_DATA_FROM_API,
    query
  };
};

export const findDataSuccessful = (query, response) => {
  return {
    type: FIND_DATA_FROM_API_SUCCESSFUL,
    query,
    response
  };
};

export const findDataFailed = (query, error) => {
  return {
    type: FIND_DATA_FROM_API_FAILED,
    query,
    error
  };
};


export function find(query) {
  return (dispatch, getState) => {
    let { config, token } = getState(),
        endpoint = config.dataEndpoint;

    dispatch(findData(query));
    return formatAndRun({ method: 'get', query, endpoint, token })
      .then(
        response => dispatch(findDataSuccessful(query, response)),
        error => dispatch(findDataSuccessful(query, error))
      );
  };
}
