import {combineEpics} from 'redux-observable';
import {
  fetchUsersEpic,
  fetchUserDetailsEpic
} from './users';
import {
  fetchAllStorageEpic,
  fetchStorageDetailEpic,
  deleteMotorByIdEpic,
  updateMotorEpic
} from './storage'

export default combineEpics(
  fetchUsersEpic,
  fetchUserDetailsEpic,
  fetchAllStorageEpic,
  fetchStorageDetailEpic,
  deleteMotorByIdEpic,
  updateMotorEpic
);
