import {createAction} from 'redux-actions';

export const fetchPMList = createAction("FETCH_PM_LIST");
export const fetchPMListSuccess = createAction("FETCH_PM_LIST_SUCCESS");
export const fetchPMListFailed = createAction("FETCH_PM_LIST_FAILED");
