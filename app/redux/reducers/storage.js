import {handleActions} from 'redux-actions';
import {fetchAllStorageList,
  fetchAllStorageListSuccess,
  fetchAllStorageListFailed,
  gotoStoragePage,
  fetchStorageDetail,
  fetchStorageDetailSuccess,
  fetchStorageDetailFailed,
  deleteMotorById,
  deleteMotorByIdFailed,
  deleteMotorByIdSuccess
} from "../actions/storage";


const initStatus = {
  all: {},
  error: null,
  selectedId: null,
  filters: [],
  pageIndex: 1,
  pageSize: 20,
  loading: false,
  isDeleted: false
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
      all: payload,
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
  }
}, initStatus)
