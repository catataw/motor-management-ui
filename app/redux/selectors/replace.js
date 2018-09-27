import {createSelector} from 'reselect/es';
import _ from 'lodash';

const replacedList = state => state.replace.all;
const loading = state => state.replace.loading;
const getPageIndexSelector = state => state.replace.pageIndex;
const getPageSizeSelector = state => state.replace.pageSize;
const getSelectedMotorId = state => state.replace.selectedId;

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
    // if(isDelete) {
    //   return null;
    // }
    return replaced[selectedId]
  }
);
