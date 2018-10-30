import {combineEpics} from 'redux-observable';
import {
  fetchUsersEpic,
  // fetchUserDetailsEpic
} from './users';
import {
  subscribeAndFetchUsersEpic,
  // fetchUsersWebSocketEpic
} from './websocket/users';
import {
  fetchAllStorageEpic,
  fetchStorageDetailEpic,
  deleteMotorByIdEpic,
  updateMotorEpic,
  saveMotorEpic
} from './storage';

import {
  fetchReplacedListEpic,
  fetchReplacedDetailEpic,
  saveReplacedMotorActionEpic,
  sendNewReplaceFormEpic
} from './replace';

import {
  fetchPMListEpic
} from './pm';

import {
  fetchEquipmentListEpic
} from './equipment';

import {
  fetchMotorEpic,
  fetchOnlineMotorEpic
} from './motor'

import {fetchStatusesEpic} from './statuses'

import {openWebSocketConnectionEpic} from './websocket/stomp'

export default combineEpics(
  fetchUsersEpic,
  // fetchUserDetailsEpic,
  fetchAllStorageEpic,
  fetchStorageDetailEpic,
  deleteMotorByIdEpic,
  updateMotorEpic,
  saveMotorEpic,
  fetchReplacedListEpic,
  fetchReplacedDetailEpic,
  saveReplacedMotorActionEpic,
  fetchPMListEpic,
  fetchEquipmentListEpic,
  fetchMotorEpic,
  fetchOnlineMotorEpic,
  fetchStatusesEpic,
  sendNewReplaceFormEpic,
  openWebSocketConnectionEpic,
  // fetchUsersWebSocketEpic,
  subscribeAndFetchUsersEpic
);
