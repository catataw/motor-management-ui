import {createSelector} from 'reselect/es';
import _ from 'lodash';

const replacedList = state => state.replace.all;
const loading = state => state.replace.loading;
const getPageIndexSelector = state => state.replace.pageIndex;
const getPageSizeSelector = state => state.replace.pageSize;
const getSelectedMotorId = state => state.replace.selectedId;
const motorDetail = state => state.replace.motorDetail;
const motor = state => state.replace.motor;
const offLineMotorDetail = state => state.replace.offLineMotorDetail;
const offLineMotor = state => state.replace.offLineMotor;

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
    return replaced[selectedId]
  }
);

export const getMotorDetail = createSelector(
  [motorDetail],
  md => md
);

export const getMotor = createSelector(
  [motor],
  m => m
);

export const getOffLineMotor = createSelector(
  [offLineMotor],
  offLineMotor => offLineMotor
);

export const getOffLineMotorDetail = createSelector(
  [offLineMotorDetail],
  offLineMotorDetail => offLineMotorDetail
)

//todo need add a selector to filter List and return action equals null
