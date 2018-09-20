import {createSelector} from 'reselect/es';
import _ from 'lodash';


const getStorageSelector = state => state.storage.all;
const getLoadingSelector = state => state.storage.loading;
const getPageIndexSelector = state => state.storage.pageIndex;
const getPageSizeSelector = state => state.storage.pageSize;
const getSelectedMotorId = state => state.storage.selectedId;
const isDeletedMotor = state => state.storage.isDeleted;
const getNewMotorSelector = state => state.storage.newMotor;
const responseStatus = state => state.storage.responseStatus;

// export const getStorageList = createSelector(
//   [getStorageSelector],
//   list =>  _.values(list).filter(list => list)
// );
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
  [getStorageSelector,getPageIndexSelector, getPageSizeSelector],
  (storage, pageIndex, pageSize)  =>
    _.values(storage).filter((motor, index) => {
      return index >= (pageIndex-1)*pageSize && index < pageIndex*pageSize;
    })
);

export const getLoading = createSelector(
  [getLoadingSelector],
  load => load
);

export const getStorageDetail = createSelector(
  [getStorageSelector, getSelectedMotorId, isDeletedMotor],
  (storage, selectedId, isDelete) => {
    if(isDelete) {
      return null;
    }
    return storage[selectedId]
  }
);

export const getNewMotor = createSelector(
  [getNewMotorSelector],
  motor => motor
);

export const getResponseStatus = createSelector(
  [responseStatus],
  status => status
)
