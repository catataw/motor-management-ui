import {createSelector} from 'reselect/es';

const getConnectedSuccess = state => state.stomp.connectedSuccess;

export const getConnectedStatus = createSelector(
  [getConnectedSuccess],
  status => status
)
