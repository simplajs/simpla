import { combineReducers } from 'redux';
import authenticated from './authenticated';
import options from './options';
import imports from './imports';
import editing from './editing';
import data from './data';
import token from './token';

const reducer = combineReducers({
  authenticated,
  options,
  imports,
  editing,
  data,
  token
});

export default reducer;
