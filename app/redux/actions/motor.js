import {createAction} from 'redux-actions';

export const fetchMotor = createAction("FETCH_MOTOR");
export const fetchMotorSuccess = createAction("FETCH_MOTOR_SUCCESS");
export const fetchMotorFailed = createAction("FETCH_MOTOR_FAILED");
