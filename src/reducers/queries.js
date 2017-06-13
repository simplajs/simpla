import {
  FIND_DATA,
  FIND_DATA_SUCCESSFUL,
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

const notAlreadyIn = haystack => needle => haystack.indexOf(needle) === -1,
      isNot = a => b => a !== b;

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
  case FIND_DATA_SUCCESSFUL:
    queryString = toQueryParams(action.query);

    if (state[queryString].cache.length !== 0) {
      let { matches, cache } = state[queryString],
          updatedMatches;

      updatedMatches = [
        ...matches,
        ...cache.filter(notAlreadyIn(matches))
      ];

      if (updatedMatches.length !== matches.length) {
        return updateStateWithQuery(state, queryString, {
          querying: false,
          cache: [],
          matches: updatedMatches
        });
      }
    }

    return updateStateWithQuery(state, queryString, { cache: [], querying: false });
  case FIND_DATA_FROM_API_SUCCESSFUL:
    queryString = toQueryParams(action.query);

    if (!state[queryString].queriedRemote) {
      return updateStateWithQuery(state, queryString, { queriedRemote: true });
    }

    return state;
  case OBSERVE_QUERY:
    let { content, query } = action;
    queryString = toQueryParams(query);

    if (!state[queryString]) {
      let matches = Object.keys(content)
        .filter(id => matchesQuery(query, content[id]));

      return updateStateWithQuery(state, queryString, {
        query,
        querying: false,
        queriedRemote: false,
        cache: [],
        matches
      });
    }

    return state;
  case SET_DATA_SUCCESSFUL:
    return Object.keys(state)
      .reduce((state, queryString) => {
        let { query, matches, cache, querying } = state[queryString],
            { response, uid } = action,
            current = querying ? cache : matches,
            updated;

        if (!matchesQuery(query, response)) {
          updated = current.filter(isNot(uid));
        } else {
          updated = [ ...current, uid ];
        }

        if (updated.length !== current.length) {
          return updateStateWithQuery(state, queryString, {
            [ querying ? 'cache' : 'matches' ]: updated
          });
        }

        return state;
      }, state);
  case REMOVE_DATA_SUCCESSFUL:
    return Object.keys(state)
      .reduce((state, queryString) => {
        let { matches } = state[queryString],
            { uid } = action,
            updatedMatches;

        updatedMatches = matches.filter(isNot(uid));

        if (updatedMatches !== matches.length) {
          return updateStateWithQuery(state, queryString, {
            matches: updatedMatches
          });
        }

        return state;
      }, state);
  default:
    return state;
  }
}
