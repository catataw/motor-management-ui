import { combineReducers } from 'redux';
import users from './users';
import storage from './storage';
import replace from './replace';
import pm from './pm';
import equipment from './equipment';
import motor from './motor';

export default combineReducers({
  users,
  storage,
  replace,
  pm,
  equipment,
  motor
});

