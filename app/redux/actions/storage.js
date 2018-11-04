import {createAction} from 'redux-actions';

//ajax
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


export const updateMotor = createAction('UPDATE_MOTOR');
export const updateMotorSuccess = createAction('UPDATE_MOTOR_SUCCESS');
export const updateMotorFailed = createAction('UPDATE_MOTOR_FAILED');


export const createMotor = createAction("CREATE_MOTOR");
export const sendCreateMotor = createAction("SEND_CREATE_MOTOR");
export const createMotorSuccess = createAction("CREATE_MOTOR_SUCCESS");
export const createMotorFailed = createAction("CREATE_MOTOR_FAILED");

export const cancelMotor = createAction("CANCEL_MOTOR");


//web socket
export const fetchStorageWebSocket = createAction("FETCH_STORAGE_WEB_SOCKET");
export const fetchStorageWebSocketSuccess = createAction("FETCH_STORAGE_WEB_SOCKET_SUCCESS");
export const fetchStorageWebSocketFailed = createAction("FETCH_STORAGE_WEB_SOCKET_FAILED");
export const subscribeAndFetchStorage = createAction("SUBSCRIBE_AND_FETCH_STORAGE");
export const subscribeAndFetchStorageFailed = createAction("SUBSCRIBE_AND_FETCH_STORAGE_FAILED");
export const receiveStorageSuccess = createAction("RECEIVE_STORAGE_SUCCESS");
export const fetchDetailsSuccess = createAction("FETCH_DETAILS_SUCCESS");
