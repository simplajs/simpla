import { combineReducers } from 'redux';
import authentication from './authentication';
import options from './options';
import imports from './imports';
import editing from './editing';
import data from './data';

const reducer = combineReducers({
  authentication,
  options,
  imports,
  editing,
  data
});

export default reducer;
