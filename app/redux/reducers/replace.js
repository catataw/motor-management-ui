import {handleActions} from 'redux-actions';
import {
  fetchReplacedList,
  fetchReplacedListFailed,
  fetchReplacedListSuccess,
  fetchReplacedDetail,
  fetchReplacedDetailSuccess,
  fetchReplacedDetailFailed
} from '../actions/replace'
import {gotoStoragePage} from "../actions/storage";

const initStates = {
  all: {},
  error: null,
  selectedId: null,
  filters: [],
  pageIndex: 1,
  pageSize: 5,
  loading: false,
  isDeleted: false,
  responseStatus: 0
};

export default handleActions({
  [fetchReplacedList] (state) {
    return {
      ...state,
      loading: true
    }
  },
  [fetchReplacedListSuccess] (state, {payload}) {
    return {
      ...state,
      all: payload,
      error: null,
      loading: false
    }
  },
  [fetchReplacedListFailed] (state, {payload: {message}}) {
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
  [fetchReplacedDetail](state) {
    return {
      ...state,
      loading: true
    }
  },
  [fetchReplacedDetailSuccess](state, {payload}){
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
  [fetchReplacedDetailFailed](state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  }
}, initStates);

