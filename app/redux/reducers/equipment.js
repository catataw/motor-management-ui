import {handleActions} from 'redux-actions';
import {
  fetchEquipmentList,
  fetchEquipmentListFailed,
  fetchEquipmentListSuccess
} from '../actions/equipment';
import {fetchPMList, fetchPMListFailed, fetchPMListSuccess} from "../actions/pm";

const initState = {
  all: {},
  error: null,
  selectedId: null,
  filters: [],
  loading: false
};

export default handleActions({
  [fetchEquipmentList](state) {
    return {
      ...state,
      loading: true
    }
  },
  [fetchEquipmentListSuccess](state, {payload}) {
    return {
      ...state,
      all: payload,
      loading: false,
      error: null,
    }
  },
  [fetchEquipmentListFailed] (state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  }
}, initState)
