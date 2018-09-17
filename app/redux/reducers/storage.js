import {handleActions} from 'redux-actions';
import {fetchAllStorageList,
  fetchAllStorageListSuccess,
  fetchAllStorageListFailed,
  gotoStoragePage,
  fetchStorageDetail,
  fetchStorageDetailSuccess,
  fetchStorageDetailFAILED
} from "../actions/storage";


const initStatus = {
  all: {},
  error: null,
  selectedId: null,
  filters: [],
  pageIndex: 1,
  pageSize: 20,
  loading: false
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
      error: null
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
    console.log('in reducr  ', payload);
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
  [fetchStorageDetailFAILED](state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  }
}, initStatus)
