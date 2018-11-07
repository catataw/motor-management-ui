import {createSelector} from 'reselect/es';
import _ from 'lodash';

const responseMotor = state => state.motor.all;
const storageMotor = state => state.motor.storageMotor;

export const getOnlineMotor = createSelector(
  [responseMotor],
  motor => motor
);

export const getStorageMotor = createSelector(
  [storageMotor],
  motor => motor
);

export const getAllMotors = createSelector(
  [responseMotor],
  motors => motors
);
