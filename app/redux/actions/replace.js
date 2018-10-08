import {createAction} from 'redux-actions';

export const fetchOnlineMotor = createAction("FETCH_ONLINE_MOTOR");
export const fetchOnlineMotorSuccess = createAction("FETCH_ONLINE_MOTOR_SUCCESS");
export const fetchOnlineMotorFailed = createAction("FETCH_ONLINE_MOTOR_FALIED");

export const fetchPMList = createAction("FETCH_PM_LIST");
export const fetchPMListSuccess = createAction("FETCH_PM_LIST_SUCCESS");
export const fetchPMListFailed = createAction("FETCH_PM_LIST_FAILED");

export const fetchReplacedList = createAction("FETCH_REPLACED_LIST");
export const fetchReplacedListSuccess = createAction("FETCH_REPLACED_LIST_SUCCESS");
export const fetchReplacedListFailed = createAction("FETCH_REPLACED_LIST_FAILED");

export const gotoReplacedListPage = createAction("GO_TO_STORAGE_PAGE");

export const fetchReplacedDetail = createAction("FETCH_REPLACED_DETAIL");
export const fetchReplacedDetailSuccess = createAction("FETCH_REPLACED_DETAIL_SUCCESS");
export const fetchReplacedDetailFailed = createAction("FETCH_REPLACED_DETAIL_FAILED");

export const setMotorDetail = createAction('SET_MOTOR_DETAIL');

export const setMotor = createAction('SET_MOTOR');

export const setOffLineMotor = createAction('SET_OFF_LINE_MOTOR');
export const setOffLineMotorDetail = createAction("SET_OFF_LINE_MOTOR_DETAIL");

export const saveReplacedMotorAction = createAction("SAVE_REPLACED_MOTOR_ACTION");
export const saveReplacedMotorActionSuccess = createAction("SAVE_REPLACED_MOTOR_ACTION_SUCCESS");
export const saveReplacedMotorActionFailed = createAction("SAVE_REPLACED_MOTOR_ACTION_FAILED");
