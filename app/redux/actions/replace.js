import {createAction} from 'redux-actions';



export const fetchReplacedList = createAction("FETCH_REPLACED_LIST");
export const fetchReplacedListSuccess = createAction("FETCH_REPLACED_LIST_SUCCESS");
export const fetchReplacedListFailed = createAction("FETCH_REPLACED_LIST_FAILED");

export const gotoReplacedListPage = createAction("GO_TO_STORAGE_PAGE");

export const fetchReplacedDetail = createAction("FETCH_REPLACED_DETAIL");
export const fetchReplacedDetailSuccess = createAction("FETCH_REPLACED_DETAIL_SUCCESS");
export const fetchReplacedDetailFailed = createAction("FETCH_REPLACED_DETAIL_FAILED");

export const setOnlineMotorDetail = createAction('SET_ONLINE_MOTOR_DETAIL');

export const setOnlineMotor = createAction('SET_ONLINE_MOTOR');

export const setOfflineMotor = createAction('SET_offline_MOTOR');
export const setOfflineMotorDetail = createAction("SET_offline_MOTOR_DETAIL");

export const saveReplacedMotorAction = createAction("SAVE_REPLACED_MOTOR_ACTION");
export const saveReplacedMotorActionSuccess = createAction("SAVE_REPLACED_MOTOR_ACTION_SUCCESS");
export const saveReplacedMotorActionFailed = createAction("SAVE_REPLACED_MOTOR_ACTION_FAILED");

export const sendNewReplaceForm = createAction("SEND_NEW_REPLACE_FORM");
export const sendNewReplaceFormSuccess = createAction("SEND_NEW_REPLACE_FORM_SUCCESS");
export const sendNewReplaceFormFailed = createAction("SEND_NEW_REPLACE_FORM_FAILED");

