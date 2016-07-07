import { combineReducers } from 'redux';
import authentication from './authentication';
import options from './options';
import imports from './imports';

const reducer = combineReducers({
  authentication,
  options,
  imports
});

export default reducer;
