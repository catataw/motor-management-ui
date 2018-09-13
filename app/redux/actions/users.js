import {createAction} from 'redux-actions';

// AJAX actions
export const fetchUsers = createAction('FETCH_USERS');
export const fetchUsersSuccess = createAction('FETCH_USERS_SUCCESS');
export const fetchUsersFailed = createAction('FETCH_USERS_FAILED');

export const fetchUserDetails = createAction('FETCH_USER_DETAILS');
export const fetchUserDetailsSuccess = createAction('FETCH_USER_DETAILS_SUCCESS');
export const fetchUserDetailsFailed = createAction('FETCH_USER_DETAILS_FAILED');

export const gotoUsersPage = createAction('GO_TO_USERS_PAGE');
export const gotoUsersPageSuccess = createAction('GO_TO_USERS_PAGE_SUCCESS');


