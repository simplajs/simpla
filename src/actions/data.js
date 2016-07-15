import {
  GET_DATA,
  GET_DATA_SUCCESSFUL,
  GET_DATA_FAILED,

  SET_DATA,
  SET_DATA_SUCCESSFUL,
  SET_DATA_FAILED,

  REMOVE_DATA,
  REMOVE_DATA_SUCCESSFUL,
  REMOVE_DATA_FAILED
} from '../constants/actionTypes';
import client from '../utils/client';

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
  const endpoint = `${dataEndpoint}/${uid}`,
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

function generateRequestActions(types) {
  return [
    (uid, data) => ({ type: types[0], uid, data }),
    (uid, response) => ({ type: types[1], uid, response }),
    (uid, error) => ({ type: types[2], uid, error })
  ];
}

function generateHandler(method, types) {
  let [ start, success, fail ] = generateRequestActions(types);

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

export const get = generateHandler('get', [ GET_DATA, GET_DATA_SUCCESSFUL, GET_DATA_FAILED ]);
export const set = generateHandler('put', [ SET_DATA, SET_DATA_SUCCESSFUL, SET_DATA_FAILED ]);
export const remove = generateHandler('delete', [ REMOVE_DATA, REMOVE_DATA_SUCCESSFUL, REMOVE_DATA_FAILED ]);
