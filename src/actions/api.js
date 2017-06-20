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
import { toQueryParams, toUidQuery, pathToUid, pathIsInvalid, itemUidToPath } from '../utils/helpers';

function formatAndRun({ path = '', shouldValidate = true, query, endpoint, token, method, body }) {
  const uid = pathToUid(path),
        uri = `${endpoint}/${encodeURIComponent(uid)}${toQueryParams(toUidQuery(query))}`;
  
  if (shouldValidate) {
    let invalid = pathIsInvalid(path);
    if (invalid) {
      return Promise.reject(invalid);
    }
  }

  return client[method](uri, {
    body,
    token
  }).then(response => {
    if (response) {
      if (response.items) {
        response.items = response.items.map(itemUidToPath);
      } else {
        response = itemUidToPath(response);
      }
    }

    return response;
  });
}

function generateHandler(method, paramsToObj, [ start, success, fail ], shouldValidate) {
  return (...args) => (dispatch, getState) => {
    let { config, token } = getState(),
        endpoint = config.dataEndpoint,
        options;

    options = Object.assign({ method, endpoint, token, shouldValidate }, paramsToObj(...args));

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

export const getData = (path) => ({ type: GET_DATA_FROM_API, path });
export const getDataSuccessful = (path, response) => ({ type: GET_DATA_FROM_API_SUCCESSFUL, path, response });
export const getDataFailed = (path, response) => ({ type:  GET_DATA_FROM_API_FAILED, path, response });

export const setData = (path, body) => ({ type: SET_DATA_TO_API, path, body });
export const setDataSuccessful = (path, body, response) => ({ type: SET_DATA_TO_API_SUCCESSFUL, path, body, response });
export const setDataFailed = (path, body, response) => ({ type:  SET_DATA_TO_API_FAILED, path, body, response });

export const removeData = (path) => ({ type: REMOVE_DATA_FROM_API, path });
export const removeDataSuccessful = (path, response) => ({ type: REMOVE_DATA_FROM_API_SUCCESSFUL, path, response });
export const removeDataFailed = (path, response) => ({ type:  REMOVE_DATA_FROM_API_FAILED, path, response });

export const get = generateHandler('get', (path) => ({ path }), [ getData, getDataSuccessful, getDataFailed ]);
export const set = generateHandler('put', (path, body) => ({ path, body }), [ setData, setDataSuccessful, setDataFailed ]);
export const remove = generateHandler('delete', (path) => ({ path }), [ removeData, removeDataSuccessful, removeDataFailed ]);
export const find = generateHandler('get', (query) => ({ query }), [ findData, findDataSuccessful, findDataFailed ], false);
