import {handleActions} from 'redux-actions';
import {
  fetchMotor,
  fetchMotorSuccess,
  fetchMotorFailed,
  fetchOnlineMotor,
  fetchOnlineMotorSuccess,
  fetchOnlineMotorFailed,
  fetchMotorsSuccess
} from '../../redux/actions/motor';

const initStates = {
  all:{},
  error: null,
  loading: false,
  storageMotor: null
};

export default handleActions({
  [fetchMotor] (state) {
    return {
      ...state,
      loading: true
    }
  },
  [fetchMotorSuccess] (state, {payload}) {
    return {
      ...state,
      loading: false,
      error: null,
      storageMotor: payload
    }
  },
  [fetchMotorFailed] (state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  },
  [fetchOnlineMotor] (state) {
    return {
      ...state,
      loading: true
    }
  },
  [fetchOnlineMotorSuccess] (state, {payload}) {
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
  [fetchOnlineMotorFailed] (state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  },
  [fetchMotorsSuccess](state, {payload}) {
    return {
      ...state,
      error: null,
      all: {
        ...state.all,
        ...payload
      },
      loading: false
    }
  }
}, initStates)
