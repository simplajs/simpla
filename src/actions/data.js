import {
  FIND_DATA,
  FIND_DATA_SUCCESSFUL,
  FIND_DATA_FROM_API_SUCCESSFUL,
  GET_DATA,
  GET_DATA_SUCCESSFUL,
  GET_DATA_FROM_API_SUCCESSFUL,
  SET_DATA,
  SET_DATA_SUCCESSFUL,
  SET_DATA_FAILED,
  REMOVE_DATA,
  REMOVE_DATA_SUCCESSFUL
} from '../constants/actionTypes';
import { INVALID_DATA } from '../constants/errors';
import {
  selectDataFromState,
  runDispatchAndExpect,
  dataIsValid,
  findDataInState,
  hasRunQuery,
  makeBlankItem,
  makeItemWith
} from '../utils/helpers';
import { get as getFromApi, find as findFromApi } from './api';

export function findData(query) {
  return {
    type: FIND_DATA,
    query
  };
}

export function findDataSuccessful(query, response) {
  return {
    type: FIND_DATA_SUCCESSFUL,
    query,
    response
  };
}

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

export function setDataSuccessful(uid, response, options = {}) {
  options = Object.assign({ persist: true }, options);
  let { persist } = options;

  return {
    type: SET_DATA_SUCCESSFUL,
    response: makeItemWith(uid, response),
    uid,
    persist
  };
}

export function setDataFailed(uid, error) {
  return {
    type: SET_DATA_FAILED,
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

export function removeDataSuccessful(uid, options = {}) {
  options = Object.assign({ persist: true }, options);
  let { persist } = options;

  return {
    type: REMOVE_DATA_SUCCESSFUL,
    uid,
    persist
  };
}

export function set(uid, data, options = {}) {
  options = Object.assign({
    validate: true,
    createAncestry: true,
    persist: true
  }, options);

  let { validate, createAncestry, persist } = options;

  return (dispatch, getState) => {
    function ensureParentExists(child) {
      let parent = child.split('.').slice(0, -1).join('.');

      if (!parent || selectDataFromState(parent, getState())) {
        return Promise.resolve();
      }

      return runDispatchAndExpect(
        dispatch,
        set(parent, makeBlankItem(parent), { persist: false }),
        SET_DATA_SUCCESSFUL
      );
    }

    let action;

    dispatch(setData(uid, data));

    if (validate && !dataIsValid(data)) {
      action = setDataFailed(uid, new Error(INVALID_DATA));
    } else {
      let currentData = selectDataFromState(uid, getState());

      if (typeof currentData !== 'undefined') {
        data = Object.assign({}, currentData, data);
      }

      action = setDataSuccessful(uid, data, { persist });
    }

    return (createAncestry ? ensureParentExists(uid) : Promise.resolve())
      .then(() => dispatch(action));
  };
}

export function remove(uid, options = {}) {
  options = Object.assign({ persist: true }, options);
  let { persist } = options;

  return (dispatch, getState) => {
    function removeChildren(uid) {
      if (!uid) {
        return Promise.resolve();
      }

      let { items } = findDataInState({ parent: uid }, getState()),
          removeItem = item => {
            return runDispatchAndExpect(
              dispatch,
              remove(item.id, { persist: false }),
              REMOVE_DATA_SUCCESSFUL
            );
          };

      return Promise.all(items.map(removeItem));
    }

    dispatch(removeData(uid));

    return removeChildren(uid)
      .then(() => dispatch(removeDataSuccessful(uid, { persist })));
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
      fetchData = runDispatchAndExpect(
          dispatch,
          getFromApi(uid),
          GET_DATA_FROM_API_SUCCESSFUL
        ).then((response) => {
          return runDispatchAndExpect(
            dispatch,
            set(uid, response, { validate: false, createAncestry: false }),
            SET_DATA_SUCCESSFUL
          )
        });
    } else {
      fetchData = Promise.resolve(stored);
    }

    return fetchData
      .then((response) => dispatch(getDataSuccessful(uid, response)));
  };
}

export function find(query = {}) {
  return (dispatch, getState) => {
    let storeResponse,
        storeItemInState,
        findLocallyAndReturn;

    dispatch(findData(query));

    storeItemInState = (item) => {
      return runDispatchAndExpect(
        dispatch,
        set(item.id, item, { validate: false }),
        SET_DATA_SUCCESSFUL
      );
    };

    storeResponse = (response) => {
      let state = getState(),
          itemNotInState = ({ id }) => typeof selectDataFromState(id, state) === 'undefined';

      return Promise.all(
        response.items
          .filter(itemNotInState)
          .map(storeItemInState)
      );
    };

    findLocallyAndReturn = () => {
      return Promise.resolve()
        .then(() => findDataInState(query, getState()))
        .then(response => dispatch(findDataSuccessful(query, response)));
    }

    if (hasRunQuery(query, getState())) {
      return findLocallyAndReturn();
    }

    return runDispatchAndExpect(dispatch, findFromApi(query), FIND_DATA_FROM_API_SUCCESSFUL)
      .then(storeResponse)
      .then(findLocallyAndReturn);
  };
}
