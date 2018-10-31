import {createAction} from 'redux-actions';
//ajax
export const fetchStatuses = createAction('FETCH_STATUSES');
export const fetchStatusesSuccess = createAction('FETCH_STATUSES_SUCCESS');
export const fetchStatusesFailed = createAction('FETCH_STATUSES_FAILED');

//web socket
export const subscribeAndFetchStatuses = createAction("SUBSCRIBE_AND_FETCH_STATUSES");
export const subscribeAndFetchStatusesFailed = createAction("SUBSCRIBE_AND_FETCH_STATUSES_FAILED");
export const receiveStatusesSuccess = createAction("RECEIVE_STATUSES_SUCCESS");
export const fetchStatusesWebSocket = createAction("FETCH_STATUSES_WEB_SOCKET");
export const fetchStatusesWebSocketSuccess = createAction("FETCH_STATUSES_WEB_SOCKET_SUCCESS");
export const fetchStatusesWebSocketFailed = createAction("FETCH_STATUSES_WEB_SOCKET_FAILED");
