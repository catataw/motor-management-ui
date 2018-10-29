import {createAction} from 'redux-actions';

export const openWebSocketConnection = createAction("OPEN_WEB_SOCKET_CONNECTION");
export const openWebSocketConnectionSuccess = createAction("OPEN_WEB_SOCKET_CONNECTION_SUCCESS");
export const openWebSocketConnectionFailed = createAction("OPEN_WEB_SOCKET_CONNECTION_FAILED");
export const closeWebSocketConnection = createAction("CLONSE_WEB_SOCKET_CONNECTION")
