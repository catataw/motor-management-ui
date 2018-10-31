import {createAction} from 'redux-actions';

//ajax
export const fetchPMList = createAction("FETCH_PM_LIST");
export const fetchPMListSuccess = createAction("FETCH_PM_LIST_SUCCESS");
export const fetchPMListFailed = createAction("FETCH_PM_LIST_FAILED");

//web socket
export const fetchPMListWebSocket = createAction("FETCH_PM_LIST_WEB_SOCKET");
export const fetchPMListWebSocketSuccess = createAction("FETCH_PM_LIST_WEB_SOCKET_SUCCESS");
export const fetchPMListWebSocketFailed = createAction("FETCH_PM_LIST_WEB_SOCKET_FAILED");
export const subscribeAndFetchPMList = createAction("SUBSCRIBE_AND_FETCH_PM_LIST");
export const subscribeAndFetchPMListFailed = createAction("SUBSCRIBE_AND_FETCH_PM_LIST_FAILED");
export const receivePMListSuccess = createAction("RECEIVE_PM_LIST_SUCCESS");
