import { combineReducers } from 'redux';
import users from './users';
import storage from './storage'
import replace from './replace'

export default combineReducers({
  users,
  storage,
  replace
});

