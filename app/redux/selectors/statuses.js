import {createSelector} from 'reselect/es';

const statuses = state => state.statuses.all;

export const getStatuses = createSelector(
  [statuses],
  statuses => statuses
)
