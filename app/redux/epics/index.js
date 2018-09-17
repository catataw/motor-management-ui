import {combineEpics} from 'redux-observable';
import {fetchUsersEpic, fetchUserDetailsEpic} from './users';
import {fetchAllStorageEpic, fetchStorageDetailEpic} from './storage'

export default combineEpics(
  fetchUsersEpic,
  fetchUserDetailsEpic,
  fetchAllStorageEpic,
  fetchStorageDetailEpic
);
