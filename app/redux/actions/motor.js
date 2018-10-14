import {createAction} from 'redux-actions';

export const fetchMotor = createAction("FETCH_MOTOR");
export const fetchMotorSuccess = createAction("FETCH_MOTOR_SUCCESS");
export const fetchMotorFailed = createAction("FETCH_MOTOR_FAILED");

export const fetchOnlineMotor = createAction("FETCH_ONLINE_MOTOR");
export const fetchOnlineMotorSuccess = createAction("FETCH_ONLINE_MOTOR_SUCCESS");
export const fetchOnlineMotorFailed = createAction("FETCH_ONLINE_MOTOR_FAILED");

