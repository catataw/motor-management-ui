import {createAction} from 'redux-actions';

export const fetchEquipmentList = createAction("FETCH_EQUIPMENT_LIST");
export const fetchEquipmentListSuccess = createAction("FETCH_EQUIPMENT_LIST_SUCCESS");
export const fetchEquipmentListFailed = createAction("FETCH_EQUIPMENT_LIST_FAILED");
