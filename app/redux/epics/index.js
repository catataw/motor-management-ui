import {combineEpics} from 'redux-observable';
import {
  fetchUsersEpic,
  // fetchUserDetailsEpic
} from './users';
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
  saveReplacedMotorActionEpic
} from './replace';

import {
  fetchPMListEpic
} from './pm';

import {
  fetchEquipmentListEpic
} from './equipment';

import {
  fetchMotorEpic
} from './motor'

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
  fetchMotorEpic
);
