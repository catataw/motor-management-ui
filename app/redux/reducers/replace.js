import {handleActions} from 'redux-actions';
import {
  fetchReplacedList,
  fetchReplacedListFailed,
  fetchReplacedListSuccess,
  fetchReplacedDetail,
  fetchReplacedDetailSuccess,
  fetchReplacedDetailFailed,
  gotoReplacedListPage,
  setMotorDetail,
  setMotor,
  setOffLineMotor,
  setOffLineMotorDetail,
  saveReplacedMotorAction,
  saveReplacedMotorActionSuccess,
  saveReplacedMotorActionFailed
} from '../actions/replace'

const initStates = {
  all: {},
  error: null,
  selectedId: null,
  filters: [],
  pageIndex: 1,
  pageSize: 5,
  loading: false,
  isDeleted: false,
  responseStatus: 0,
  motorDetail:null,
  motor:null,
  offLineMotor: null,
  offLineMotorDetail: null,
  newReplaceForm: {},
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
  [gotoReplacedListPage](state, { payload }) {
    return {
      ...state,
      pageIndex: payload,
    }
  },
  [fetchReplacedDetail](state, {payload}) {
    return {
      ...state,
      selectedId:payload,
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
  },
  [setMotorDetail](state, {payload}) {
    return {
      ...state,
      motorDetail:payload
    }
  },
  [setMotor](state, {payload}) {
    return {
      ...state,
      motor: payload
    }
  },
  [setOffLineMotor](state, {payload}) {
    return {
      ...state,
      offLineMotor: payload
    }
  },
  [setOffLineMotorDetail](state, {payload}) {
    return {
      ...state,
      offLineMotorDetail: payload
    }
  },
  [setOffLineMotor](state, {payload}) {
    return {
      ...state,
      offLineMotor: payload
    }
  },
  [saveReplacedMotorAction] (state, {payload}) {
    return {
      ...state,
      all: payload,
      loading: true
    }
  },
  [saveReplacedMotorActionSuccess] (state, {payload}) {
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
  [saveReplacedMotorActionFailed] (state, {payload: {message}}){
    return {
      ...state,
      error: message,
      loading: false
    }
  }
}, initStates);

