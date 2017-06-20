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

export function getData(path) {
  return {
    type: GET_DATA,
    path
  };
}

export function getDataSuccessful(path, response) {
  return {
    type: GET_DATA_SUCCESSFUL,
    response,
    path
  }
}

export function setData(path, data) {
  return {
    type: SET_DATA,
    path,
    data
  };
}

export function setDataSuccessful(path, response, options = {}) {
  let { persist } = Object.assign({ persist: true }, options);

  return {
    type: SET_DATA_SUCCESSFUL,
    response: makeItemWith(path, response),
    path,
    persist
  };
}

export function setDataFailed(path, error) {
  return {
    type: SET_DATA_FAILED,
    response: error,
    path
  };
}

export function removeData(path) {
  return {
    type: REMOVE_DATA,
    path
  };
}

export function removeDataSuccessful(path, options = {}) {
  let { persist } = Object.assign({ persist: true }, options);

  return {
    type: REMOVE_DATA_SUCCESSFUL,
    path,
    persist
  };
}

export function set(path, data, options = {}) {
  let { validate, createAncestry, persist } = Object.assign({
    validate: true,
    createAncestry: true,
    persist: true
  }, options);

  return (dispatch, getState) => {
    function ensureParentExists(child) {
      let parent = child.split('/').slice(0, -1).join('/');

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

    dispatch(setData(path, data));

    if (validate && !dataIsValid(data)) {
      action = setDataFailed(path, new Error(INVALID_DATA));
    } else {
      let currentData = selectDataFromState(path, getState());

      if (typeof currentData !== 'undefined') {
        data = Object.assign({}, currentData, data);
      }

      action = setDataSuccessful(path, data, { persist });
    }

    return (createAncestry ? ensureParentExists(path) : Promise.resolve())
      .then(() => dispatch(action));
  };
}

export function remove(path, options = {}) {
  options = Object.assign({ persist: true }, options);
  let { persist } = options;

  return (dispatch, getState) => {
    function removeChildren(path) {
      if (!path) {
        return Promise.resolve();
      }

      let { items } = findDataInState({ parent: path }, getState()),
          removeItem = item => {
            return runDispatchAndExpect(
              dispatch,
              remove(item.path, { persist: false }),
              REMOVE_DATA_SUCCESSFUL
            );
          };

      return Promise.all(items.map(removeItem));
    }

    dispatch(removeData(path));

    return removeChildren(path)
      .then(() => dispatch(removeDataSuccessful(path, { persist })));
  };
}

export function get(path) {
  return (dispatch, getState) => {
    let state,
        stored,
        fetchData; 

    dispatch(getData(path));

    state = getState();
    stored = selectDataFromState(path, state);

    if (typeof stored === 'undefined') {
      fetchData = runDispatchAndExpect(
          dispatch,
          getFromApi(path),
          GET_DATA_FROM_API_SUCCESSFUL
        ).then((response) => {
          return runDispatchAndExpect(
            dispatch,
            set(path, response, { validate: false, createAncestry: false }),
            SET_DATA_SUCCESSFUL
          )
        });
    } else {
      fetchData = Promise.resolve(stored);
    }

    return fetchData
      .then((response) => dispatch(getDataSuccessful(path, response)));
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
        set(item.path, item, { validate: false }),
        SET_DATA_SUCCESSFUL
      );
    };

    storeResponse = (response) => {
      let state = getState(),
          itemNotInState = ({ path }) => typeof selectDataFromState(path, state) === 'undefined';

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
