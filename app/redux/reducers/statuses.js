import {handleActions} from 'redux-actions';
import {
  fetchStatuses,
  fetchStatusesFailed,
  fetchStatusesSuccess,
  receiveStatusesSuccess
} from '../../redux/actions/statuses';

const initStates = {
  all:{},
  error: null,
  loading: false,
};

export default handleActions( {
  [fetchStatuses] (state) {
    return {
      ...state,
      loading: true
    }
  },
  [fetchStatusesSuccess] (state, {payload}) {
    return {
      ...state,
      all: {
        ...state.all,
        ...payload
      },
      loading: false,
      error: null
    }
  },
  [fetchStatusesFailed](state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  },
  [receiveStatusesSuccess](state, {payload}) {
    return {
      ...state,
      all: {
        ...state.all,
        ...payload
      },
      loading: false,
      error: null
    }
  }
}, initStates);
