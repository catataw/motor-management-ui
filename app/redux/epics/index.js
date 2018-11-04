import {combineEpics} from 'redux-observable';
import {
  fetchUsersEpic,
  // fetchUserDetailsEpic
} from './users';
import {
  subscribeAndFetchUsersEpic,
} from './websocket/users';
import {
  fetchStatusesWebSocketEpic,
} from './websocket/statuses';
import {
  subscribeAndFetchPMListEpic
} from './websocket/pm';
import {
  subscribeAndFetchStorageEpic
} from './websocket/storage';
import {
  fetchAllStorageEpic,
  fetchStorageDetailEpic,
  deleteMotorByIdEpic,
  updateMotorEpic,
  saveMotorEpic,
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

  //web socket
  subscribeAndFetchUsersEpic,
  fetchStatusesWebSocketEpic,
  subscribeAndFetchPMListEpic,
  subscribeAndFetchStorageEpic
);
