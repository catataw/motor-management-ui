import { combineReducers } from 'redux';
import users from './users';
import storage from './storage'
import replace from './replace'
import pm from './pm'

export default combineReducers({
  users,
  storage,
  replace,
  pm
});

