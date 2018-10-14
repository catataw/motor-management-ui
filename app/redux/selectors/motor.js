import {createSelector} from 'reselect/es';
import _ from 'lodash';

const responseMotor = state => state.motor.all;

export const getOnlineMotor = createSelector(
  [responseMotor],
  motor => motor
)
