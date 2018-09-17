import {createAction} from 'redux-actions';

export const fetchAllStorageList = createAction("FETCH_ALL_STORAGE_LIST");
export const fetchAllStorageListSuccess = createAction("FETCH_ALL_STORAGE_LIST_SUCCESS");
export const fetchAllStorageListFailed = createAction("FETCH_ALL_STORAGE_LIST_FAILED");

export const gotoStoragePage = createAction("GO_TO_STORAGE_PAGE");
export const gotoStoragePageSUCCESS = createAction("GO_TO_STORAGE_PAGE_SUCCESS");

export const fetchStorageDetail = createAction('FETCH_STORAGE_DETAIL');
export const fetchStorageDetailSuccess = createAction('FETCH_STORAGE_DETAIL_SUCCESS');
export const fetchStorageDetailFAILED = createAction('FETCH_STORAGE_DETAIL_FAILED');

