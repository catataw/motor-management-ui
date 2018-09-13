import {combineEpics} from 'redux-observable';
import {fetchUsersEpic, fetchUserDetailsEpic} from './users';

export default combineEpics(
  fetchUsersEpic,
  fetchUserDetailsEpic
);
