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
  _data: data,
  _imports: imports,
  _queries: queries,
  authenticated,
  config: options,
  editable,
  token,
  save
});

export default reducer;
