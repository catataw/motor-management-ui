import {createSelector} from 'reselect/es';
import _ from 'lodash';

const equipmentList = state => state.equipment.all;

export const getEquipmentList = createSelector(
  [equipmentList],
  equipmentList => {
    let result = null
    _.values(equipmentList).filter(e => {
      result = e.equipmentList
    });
    return result
  }
)
