import {createAction} from 'redux-actions';

export const fetchStatuses = createAction('FETCH_STATUSES');
export const fetchStatusesSuccess = createAction('FETCH_STATUSES_SUCCESS');
export const fetchStatusesFailed = createAction('FETCH_STATUSES_FAILED');

