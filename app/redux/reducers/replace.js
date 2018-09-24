import {handleActions} from 'redux-actions';
import {
  fetchReaplcedList,
  fetchReaplcedListFailed,
  fetchReaplcedListSuccess
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
  [fetchReaplcedList] (state) {
    return {
      ...state,
      loading: true
    }
  },
  [fetchReaplcedListSuccess] (state, {payload}) {
    return {
      ...state,
      all: payload,
      error: null,
      loading: false
    }
  },
  [fetchReaplcedListFailed] (state, {payload: {message}}) {
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
}, initStates);

