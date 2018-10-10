import {handleActions} from 'redux-actions';
import {
  fetchMotor,
  fetchMotorSuccess,
  fetchMotorFailed
} from '../../redux/actions/motor';

const initStates = {
  all:{},
  error: null,
  loading: false
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
      all: payload,
      loading: false,
      error: null
    }
  },
  [fetchMotorFailed] (state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  }
}, initStates)
