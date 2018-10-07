import {createSelector} from 'reselect/es';
import _ from 'lodash';

const equipmentList = state => state.equipment.all;

export const getEquipmentList = createSelector(
  [equipmentList],
  equipmentList => equipmentList
)
