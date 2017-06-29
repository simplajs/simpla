import {
  SAVE,
  SAVE_SUCCESSFUL,
  SAVE_FAILED,
  SET_DATA_TO_API_SUCCESSFUL,
  REMOVE_DATA_FROM_API_SUCCESSFUL,
  SET_DATA_SUCCESSFUL
} from '../constants/actionTypes';
import { set, remove } from '../actions/api';
import { set as setLocally } from '../actions/data';
import { runDispatchAndExpect } from '../utils/helpers';

export function startSave() {
  return {
    type: SAVE
  };
}

export function saveSuccessful() {
  return {
    type: SAVE_SUCCESSFUL
  };
}

export function saveFailed() {
  return {
    type: SAVE_FAILED
  };
}

export default function save(path) {
  return (dispatch, getState) => {
    let toEntry,
        buffer,
        entries,
        saveResultLocally,
        shouldRemove,
        shouldSet,
        setPromises,
        removePromises;

    dispatch(startSave());

    toEntry = path => [ path, buffer[path] ];
    buffer = getState().buffer.verbose;
    entries = path ? [ toEntry(path) ] : Object.keys(buffer).map(toEntry);

    shouldRemove = ([, { local, changed }]) => local === null && changed;
    shouldSet = ([, { local, changed }]) => local !== null && changed;

    saveResultLocally = (result) => {
      return runDispatchAndExpect(
        dispatch,
        setLocally(result.path, result, { validate: false }),
        SET_DATA_SUCCESSFUL
      );
    };

    setPromises = entries
      .filter(shouldSet)
      .map(([ path, { local } ]) => set(path, local))
      .map(action => {
        return runDispatchAndExpect(dispatch, action, SET_DATA_TO_API_SUCCESSFUL)
          .then(saveResultLocally);
      });

    removePromises = entries
      .filter(shouldRemove)
      .map(([ path ]) => remove(path))
      .map(action => runDispatchAndExpect(dispatch, action, REMOVE_DATA_FROM_API_SUCCESSFUL));

    return Promise.all([ ...setPromises, ...removePromises ])
      .then(
        () => dispatch(saveSuccessful()),
        () => dispatch(saveFailed())
      )
  };
}
