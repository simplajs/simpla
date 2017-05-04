import { DATA_PREFIX, QUERIES_PREFIX } from '../constants/state';
import { combineReducers } from 'redux';
import authenticated from './authenticated';
import options from './options';
import queries from './queries';
import editable from './editable';
import data from './data';
import token from './token';
import buffer from './buffer';

const reducer = combineReducers({
  [ DATA_PREFIX ]: data,
  [ QUERIES_PREFIX ]: queries,
  authenticated,
  config: options,
  editable,
  token,
  buffer
});

export default reducer;
