import {createAction} from 'redux-actions';

export const fetchOnlineMotor = createAction("FETCH_ONLINE_MOTOR");
export const fetchOnlineMotorSuccess = createAction("FETCH_ONLINE_MOTOR_SUCCESS");
export const fetchOnlineMotorFailed = createAction("FETCH_ONLINE_MOTOR_FALIED");

export const fetchPMList = createAction("FETCH_PM_LIST");
export const fetchPMListSuccess = createAction("FETCH_PM_LIST_SUCCESS");
export const fetchPMListFailed = createAction("FETCH_PM_LIST_FAILED");
