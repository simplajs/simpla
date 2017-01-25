import { DATA_PREFIX, QUERIES_PREFIX } from '../constants/state';
import { combineReducers } from 'redux';
import authenticated from './authenticated';
import options from './options';
import queries from './queries';
import imports from './imports';
import editable from './editable';
import data from './data';
import token from './token';
import save from './save';

const reducer = combineReducers({
  [ DATA_PREFIX ]: data,
  [ QUERIES_PREFIX ]: queries,
  _imports: imports,
  authenticated,
  config: options,
  editable,
  token,
  save
});

export default reducer;
