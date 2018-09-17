import {combineEpics} from 'redux-observable';
import {fetchUsersEpic, fetchUserDetailsEpic} from './users';
import {fetchAllStorageEpic, fetchStorageDetailEpic, deleteMotorByIdEpic} from './storage'

export default combineEpics(
  fetchUsersEpic,
  fetchUserDetailsEpic,
  fetchAllStorageEpic,
  fetchStorageDetailEpic,
  deleteMotorByIdEpic
);
