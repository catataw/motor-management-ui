import {createAction} from 'redux-actions';

export const fetchAllStorageList = createAction("FETCH_ALL_STORAGE_LIST");
export const fetchAllStorageListSuccess = createAction("FETCH_ALL_STORAGE_LIST_SUCCESS");
export const fetchAllStorageListFailed = createAction("FETCH_ALL_STORAGE_LIST_FAILED");

export const gotoStoragePage = createAction("GO_TO_STORAGE_PAGE");
export const gotoStoragePageSUCCESS = createAction("GO_TO_STORAGE_PAGE_SUCCESS");

export const fetchStorageDetail = createAction('FETCH_STORAGE_DETAIL');
export const fetchStorageDetailSuccess = createAction('FETCH_STORAGE_DETAIL_SUCCESS');
export const fetchStorageDetailFailed = createAction('FETCH_STORAGE_DETAIL_FAILED');


export const deleteMotorById = createAction("DELETE_MOTOR_BY_ID");
export const deleteMotorByIdSuccess = createAction("DELETE_MOTOR_BY_ID_SUCCESS");
export const deleteMotorByIdFailed = createAction("DELETE_MOTOR_BY_ID_FAILED");

