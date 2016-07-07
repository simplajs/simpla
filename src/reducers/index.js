import { combineReducers } from 'redux';
import authentication from './authentication';
import options from './options';
import imports from './imports';
import data from './data';

const reducer = combineReducers({
  authentication,
  options,
  imports,
  data
});

export default reducer;
