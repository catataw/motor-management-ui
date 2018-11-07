import {createSelector} from 'reselect/es';
import _ from 'lodash';
import {isEmpty} from '@ember/utils';
import {set} from '@ember/object';

const getStorageSelector = state => state.storage.all;
const getLoadingSelector = state => state.storage.loading;
const getPageIndexSelector = state => state.storage.pageIndex;
const getPageSizeSelector = state => state.storage.pageSize;
const getSelectedMotorId = state => state.storage.selectedId;

const isDeletedMotor = state => state.storage.isDeleted;
const getNewMotorSelector = state => state.storage.newMotor;
const responseStatus = state => state.storage.responseStatus;
const getMotors = state => state.motor.all;
const getDetails = state => state.details.all;

export const getStoragePageIndex = createSelector(
  [getPageIndexSelector],
  (pageIndex) => pageIndex
);

export const getStoragePageSize = createSelector(
  [getPageSizeSelector],
  (pageSize) => pageSize
);

export const getStoragePageCount = createSelector(
  [getStorageSelector, getPageSizeSelector],
  (motors, pageSize) => {
    const userCount = _.keys(motors).length;
    return Math.ceil(userCount/pageSize); // page count
  }
);

export const getStorageListByPage = createSelector(
  [getStorageSelector,getPageIndexSelector, getPageSizeSelector/*, getMotors, getDetails*/],
  (storage, pageIndex, pageSize/*, motors, details*/)  => {
    return _.values(storage).filter((motor, index) => {
      return index >= (pageIndex-1)*pageSize && index < pageIndex*pageSize;
    })
  }
);

export const getLoading = createSelector(
  [getLoadingSelector],
  load => load
);

export const getStorageDetail = createSelector(
  [getStorageSelector, getSelectedMotorId, isDeletedMotor, getMotors, getDetails],
  (storage, selectedId, isDelete, motors, details) => {
    if(isDelete) {
      return null;
    }
    return _.get(storage, selectedId, null);
  }
);

export const getNewMotor = createSelector(
  [getNewMotorSelector],
  motor => motor
);

export const getResponseStatus = createSelector(
  [responseStatus],
  status => status
);
