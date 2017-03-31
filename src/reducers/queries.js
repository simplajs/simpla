import {
  FIND_DATA,
  FIND_DATA_FROM_API_SUCCESSFUL,
  OBSERVE_QUERY,
  SET_DATA_SUCCESSFUL,
  REMOVE_DATA_SUCCESSFUL
} from '../constants/actionTypes';
import { toQueryParams, matchesQuery } from '../utils/helpers';

function updateStateWithQuery(state, queryString, updates) {
  return Object.assign({}, state, {
    [ queryString ]: Object.assign({}, state[queryString], updates)
  });
}

export default function queries(state = {}, action) {
  let queryString;

  switch (action.type) {
  case FIND_DATA:
    queryString = toQueryParams(action.query);

    if (!state[queryString]) {
      return updateStateWithQuery(state, queryString, {
        query: action.query,
        querying: true,
        queriedRemote: false,
        cache: [],
        matches: []
      });
    }

    if (!state[queryString].querying) {
      return updateStateWithQuery(state, queryString, { querying: true });
    }

    return state;
  case FIND_DATA_FROM_API_SUCCESSFUL:
    queryString = toQueryParams(action.query);

    if (!state[queryString].queriedRemote) {
      return updateStateWithQuery(state, queryString, { queriedRemote: true });
    }

    return state;
  case OBSERVE_QUERY:
    queryString = toQueryParams(action.query);

    if (!state[queryString]) {
      return updateStateWithQuery(state, queryString, {
        query: action.query,
        querying: false,
        queriedRemote: false,
        cache: [],
        matches: []
      });
    }

    return state;
  case SET_DATA_SUCCESSFUL:
    return Object.keys(state)
      .reduce((state, queryString) => {
        let { query, matches } = state[queryString],
            { response, uid } = action,
            updatedMatches;

        if (!matchesQuery(query, response)) {
          updatedMatches = matches.filter((match) => match !== uid);
        } else {
          updatedMatches = [ ...matches, uid ];
        }

        if (updatedMatches.length === matches.length) {
          return state;
        }

        return updateStateWithQuery(state, queryString, { matches: updatedMatches });
      }, state);
  case REMOVE_DATA_SUCCESSFUL:
    return Object.keys(state)
      .reduce((state, queryString) => {
        let { matches } = state[queryString],
            { uid } = action,
            updatedMatches;

        updatedMatches = matches.filter(match => match !== uid);

        if (updatedMatches === matches.length) {
          return state;
        }

        return updateStateWithQuery(state, queryString, { matches: updatedMatches });
      }, state);
  default:
    return state;
  }
}
