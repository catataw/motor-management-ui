import {combineEpics} from 'redux-observable';
import {
  fetchUsersEpic,
  fetchUserDetailsEpic
} from './users';
import {
  fetchAllStorageEpic,
  fetchStorageDetailEpic,
  deleteMotorByIdEpic,
  updateMotorEpic,
  saveMotorEpic
} from './storage'

export default combineEpics(
  fetchUsersEpic,
  fetchUserDetailsEpic,
  fetchAllStorageEpic,
  fetchStorageDetailEpic,
  deleteMotorByIdEpic,
  updateMotorEpic,
  saveMotorEpic
);
