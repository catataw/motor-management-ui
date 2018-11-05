import {createSelector} from 'reselect/es';
import _ from 'lodash';

const replacedList = state => state.replace.all;
const loading = state => state.replace.loading;
const getPageIndexSelector = state => state.replace.pageIndex;
const getPageSizeSelector = state => state.replace.pageSize;
const getSelectedMotorId = state => state.replace.selectedId;
const onlineMotorDetail = state => state.replace.onlineMotorDetail;
const onlineMotor = state => state.replace.onlineMotor;
const offlineMotorDetail = state => state.replace.offlineMotorDetail;
const offlineMotor = state => state.replace.offlineMotor;
const newReplaceForm = state => state.replace.newReplaceForm;

export const getReplacedListPageIndex = createSelector(
  [getPageIndexSelector],
  (pageIndex) => pageIndex
);

export const getReplacedListPageSize = createSelector(
  [getPageSizeSelector],
  (pageSize) => pageSize
);

export const getReplacedListPageCount = createSelector(
  [replacedList, getPageSizeSelector],
  (from, pageSize) => {
    const listCount = _.keys(from).length;
    return Math.ceil(listCount/pageSize); // page count
  }
);

export const getReplacedListByPage = createSelector(
  [replacedList,getPageIndexSelector, getPageSizeSelector],
  (replaced, pageIndex, pageSize)  =>
    _.values(replaced).filter((motor, index) => {
      return index >= (pageIndex-1)*pageSize && index < pageIndex*pageSize;
    })
);

export const getLoading = createSelector(
  [loading],
  loading => loading
);

export const getReplacedDetail = createSelector(
  [replacedList, getSelectedMotorId],
  (replaced, selectedId) => {
    return _.get(replaced, selectedId, null)
  }
);

export const getOnlineMotorDetail = createSelector(
  [onlineMotorDetail],
  md => {
    let result = null;
    _.values(md).filter(e => {
      result =  e
    });
    return result
  }
);

export const getOnlineMotor = createSelector(
  [onlineMotor],
  onlineMotor => {
    let result = null;
    _.values(onlineMotor).filter(m => {
      result = m
    });
    return result
  }
);

export const getOfflineMotor = createSelector(
  [offlineMotor],
  offlineMotor => {
    let result = null;
    _.values(offlineMotor).filter(m => {
      result = m;
    });
    return result;
  }
);

export const getOfflineMotorDetail = createSelector(
  [offlineMotorDetail],
  md => {
    let result = null;
    _.values(md).filter(e => {
      result =  e
    });
    return result
  }
);

export const getNewReplaceForm = createSelector(
  [newReplaceForm],
  newReplaceForm => newReplaceForm
);

//todo need add a selector to filter List and return action equals null
