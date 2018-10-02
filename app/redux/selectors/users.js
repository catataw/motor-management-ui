import {createSelector} from 'reselect/es';
import _ from 'lodash';
import {isArray} from '@ember/array'

const getUsers = (state) => state.users.all;
const getLoading = (state) => state.users.loading;
const getPageIndex = (state) => state.users.pageIndex;
const getPageSize = (state) => state.users.pageSize;
const getSelectedUserId = (state) => state.users.selectedId;

export const getUsersPageIndex = createSelector(
  [getPageIndex],
  (pageIndex) => pageIndex
);

export const getUsersPageSize = createSelector(
  [getPageSize],
  (pageSize) => pageSize
);

export const getUsersPageCount = createSelector(
  [getUsers, getPageSize],
  (users, pageSize) => {
    const userCount = _.keys(users).length;
    return Math.ceil(userCount/pageSize); // page count
  }
);

export const getUsersListByPage = createSelector(
  [getUsers, getPageIndex, getPageSize],
  (users, pageIndex, pageSize) =>
    _.values(users).filter((user, index) => {
      return index >= (pageIndex-1)*pageSize && index < pageIndex*pageSize;
    })
);

export const getUsersLoading = createSelector(
  [getLoading],
  (loading) => loading
);

export const getUserDetails = createSelector(
  [getUsers, getSelectedUserId],
  (users, selectedId) => users[selectedId]
);


export const getUsersList = createSelector(
  [getUsers],
  (users) => _.values(users)
);
