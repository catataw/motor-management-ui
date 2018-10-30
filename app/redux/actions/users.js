import {createAction} from "redux-actions";

// AJAX actions
export const fetchUsers = createAction("FETCH_USERS");
export const fetchUsersSuccess = createAction("FETCH_USERS_SUCCESS");
export const fetchUsersFailed = createAction("FETCH_USERS_FAILED");

export const fetchUserDetails = createAction("FETCH_USER_DETAILS");
export const fetchUserDetailsSuccess = createAction("FETCH_USER_DETAILS_SUCCESS");
export const fetchUserDetailsFailed = createAction("FETCH_USER_DETAILS_FAILED");

export const gotoUsersPage = createAction("GO_TO_USERS_PAGE");
export const gotoUsersPageSuccess = createAction("GO_TO_USERS_PAGE_SUCCESS");

//web socket actions
export const fetchUsersWebSocket = createAction("FETCH_USERS_WEB_SOCKET");
export const fetchUsersWebSocketSuccess = createAction("FETCH_USERS_WEB_SOCKET_SUCCESS");
export const fetchUsersWebSocketFailed = createAction("FETCH_USERS_WEB_SOCKET_FAILED");

export const subscribeAndFetchUsers = createAction("SUBSCRIBE_AND_FETCH_USERS");
export const subscribeToUsersSuccess = createAction("SUBSCRIBE_TO_USERS_SUCCESS");
export const subscribeToUsersFailed = createAction("SUBSCRIBE_TO_USERS_FAILED");
export const receiveUsersSuccess = createAction("RECEIVE_USERS_SUCCESS");
export const unsubscribeFromUsers = createAction("UNSUBSCRIBE_FROM_USERs");
export const unsubscribeFromUsersSuccess = createAction("UNSUBSCRIBE_FROM_USERS_SUCCESS")



