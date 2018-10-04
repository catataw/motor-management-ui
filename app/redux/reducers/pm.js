import {handleActions} from 'redux-actions';
import {
  fetchPMList,
  fetchPMListSuccess,
  fetchPMListFailed
} from '../actions/pm';
import _ from 'lodash';

const initState = {
  all: {},
  error: null,
  selectedId: null,
  filters: [],
  loading: false
}


export default handleActions({
  [fetchPMList](state) {
    return {
      ...state,
      loading: true
    }
  },
  [fetchPMListSuccess](state, {payload}) {
    return {
      ...state,
      all: payload,
      loading: false,
      error: null,
    }
  },
  [fetchPMListFailed] (state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  }
}, initState)
