import {
  SAVE,
  SAVE_SUCCESSFUL,
  SAVE_FAILED,
  SET_DATA_TO_API_SUCCESSFUL,
  REMOVE_DATA_FROM_API_SUCCESSFUL
} from '../constants/actionTypes';
import { set, remove } from '../actions/api';
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

export default function save() {
  return (dispatch, getState) => {
    dispatch(startSave());

    const saveState = getState().save,
          entries = Object.keys(saveState).map(uid => [ uid, saveState[uid] ]);

    let shouldRemove = ([, { local, changed }]) => local === null && changed,
        shouldSet = ([, { local, changed }]) => local !== null && changed;

    let setPromises = entries
      .filter(shouldSet)
      .map(([ uid, { local } ]) => set(uid, local))
      .map(action => runDispatchAndExpect(dispatch, action, SET_DATA_TO_API_SUCCESSFUL));

    let removePromises = entries
      .filter(shouldRemove)
      .map(([ uid ]) => remove(uid))
      .map(action => runDispatchAndExpect(dispatch, action, REMOVE_DATA_FROM_API_SUCCESSFUL));

    return Promise.all([ ...setPromises, ...removePromises ])
      .then(
        () => dispatch(saveSuccessful()),
        () => dispatch(saveFailed())
      )
  };
}
