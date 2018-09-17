import { combineReducers } from 'redux';
import users from './users';
import storage from './storage'

export default combineReducers({
  users,
  storage
});

