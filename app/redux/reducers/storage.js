import {handleActions} from 'redux-actions';
import {fetchAllStorageList,
  fetchAllStorageListSuccess, fetchAllStorageListFailed,
  gotoStoragePage, fetchStorageDetail,
  fetchStorageDetailSuccess, fetchStorageDetailFailed,
  deleteMotorById, deleteMotorByIdFailed,
  deleteMotorByIdSuccess, updateMotor,
  updateMotorFailed, updateMotorSuccess,
  createMotor, createMotorFailed,
  createMotorSuccess, sendCreateMotor, cancelMotor,
  fetchStorageWebSocketFailed, subscribeAndFetchStorageFailed, receiveStorageSuccess,
  fetchDetailsSuccess, subscribeAndFetchStorageDetail,receiveUpdateStorageSuccess,
  subscribeUpdateStorageFailed, fetchUpdateStorageWebSocketFailed
} from "../actions/storage";


const initStates = {
  all: {},
  error: null,
  selectedId: null,
  filters: [],
  pageIndex: 1,
  pageSize: 15,
  loading: false,
  isDeleted: false,
  responseStatus: 0,
  details: {}
};

export default handleActions({
  [fetchAllStorageList](state) {
    return {
      ...state,
      loading: true
    }
  },
  [fetchAllStorageListSuccess](state, {payload}) {
    return {
      ...state,
      all: {
        ...state.all,
        ...payload
      },
      loading: false,
      error: null,
      isDeleted: false
    }
  },
  [fetchAllStorageListFailed] (state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  },
  [gotoStoragePage](state, { payload }) {
    return {
      ...state,
      pageIndex: payload,
    }
  },
  [fetchStorageDetail](state, {payload}) {
    return {
      ...state,
      selectedId:payload,
      loading: true
    }
  },
  [fetchStorageDetailSuccess](state, {payload}) {
    return {
      ...state,
      all: {
        ...state.all,
        ...payload
      },
      error: null,
      loading: false
    }
  },
  [fetchStorageDetailFailed](state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  },
  [deleteMotorById](state) {
    return {
      ...state,
      loading: true
    }
  },
  [deleteMotorByIdSuccess](state) {
    return {
      ...state,
      loading: false,
      isDeleted: true,
      selectedId: null,
      all: {
        ...state.all
      },
    }
  },
  [deleteMotorByIdFailed](state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  },
  [updateMotor](state) {
    return{
      ...state,
      loading: true
    }
  },
  [updateMotorSuccess](state, {payload}) {
    return {
      ...state,
      error: null,
      loading: false,
      all: {
        ...state.all,
        ...payload
      }
    }
  },
  [updateMotorFailed](state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  },
  [createMotor](state) {
    return {
      ...state,
      newMotor: {
        detail:{}
      }
    }
  },
  [sendCreateMotor](state) {
    return {
      ...state,
      loading: true,
    }
  },
  [createMotorSuccess] (state, {payload}) {
    return {
      ...state,
      error: null,
      loading: false,
      responseStatus: payload
    }
  },
  [createMotorFailed] (state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  },
  [cancelMotor](state) {
    return {
      ...state,
      newMotor: {
        detail:{}
      }
    }
  },
  [receiveStorageSuccess] (state, {payload}) {
    return {
      ...state,
      all: {
        ...state.all,
        ...payload
      },
      error: null,
      loading: false
    }
  },
  [fetchDetailsSuccess] (state, {payload}) {
    return {
      ...state,
      details: {
        ...state.details,
        ...payload
      },
      error: null,
      loading: false
    }
  },
  [fetchStorageWebSocketFailed] (state, {payload}) {
    return {
      ...state,
      error: payload,
      loading: false
    }
  },
  [subscribeAndFetchStorageFailed] (state, {payload}) {
    return {
      ...state,
      error: payload,
      loading: false
    }
  },
  [subscribeAndFetchStorageDetail](state, {payload}) {
    return {
      ...state,
      selectedId: payload
    }
  },
  [receiveUpdateStorageSuccess](state, {payload}) {
    return {
      ...state,
      all: {
        ...state.all,
        ...payload
      },
      error: false,
      loading: false
    }
  },
  [subscribeUpdateStorageFailed](state, {payload}) {
    return {
      ...state,
      error: payload,
      loading: false
    }
  },
  [fetchUpdateStorageWebSocketFailed](state, {payload}) {
    return {
      ...state,
      error: payload,
      loading: false
    }
  }
}, initStates)
