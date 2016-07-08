import { IMPORT_ELEMENT, IMPORT_ELEMENT_FAILED, IMPORT_ELEMENT_SUCCESSFUL } from '../constants/actionTypes';

function singleImportReducer(state = {}, action) {
  switch (action.type) {
  case IMPORT_ELEMENT:
    return Object.assign({}, state, {
      status: 'loading',
    });
  case IMPORT_ELEMENT_FAILED:
    return Object.assign({}, state, {
      status: 'failed',
    });
  case IMPORT_ELEMENT_SUCCESSFUL:
    return Object.assign({}, state, {
      status: 'loaded',
    });
  default:
    return state;
  }
}

export default function imports(state = {}, action) {
  switch (action.type) {
  case IMPORT_ELEMENT:
  case IMPORT_ELEMENT_FAILED:
  case IMPORT_ELEMENT_SUCCESSFUL:
    return Object.assign({}, state, {
      [ action.href ]: singleImportReducer(state[ action.href ], action)
    });
  default:
    return state;
  }
}
