import {handleActions} from 'redux-actions';
import {
  fetchReplacedList,
  fetchReplacedListFailed,
  fetchReplacedListSuccess,
  fetchReplacedDetail,
  fetchReplacedDetailSuccess,
  fetchReplacedDetailFailed,
  gotoReplacedListPage,
  setOnlineMotorDetail,
  setOnlineMotor,
  setOfflineMotor,
  setOfflineMotorDetail,
  saveReplacedMotorAction,
  saveReplacedMotorActionSuccess,
  saveReplacedMotorActionFailed,
  sendNewReplaceForm,
  sendNewReplaceFormFailed,
  sendNewReplaceFormSuccess
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
  onlineMotorDetail:null,
  onlineMotor:null,
  offlineMotor: null,
  offlineMotorDetail: null,
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
  [setOnlineMotorDetail](state, {payload}) {
    return {
      ...state,
      onlineMotorDetail:payload
    }
  },
  [setOnlineMotor](state, {payload}) {
    return {
      ...state,
      onlineMotor: payload
    }
  },
  [setOfflineMotor](state, {payload}) {
    return {
      ...state,
      offlineMotor: payload
    }
  },
  [setOfflineMotorDetail](state, {payload}) {
    return {
      ...state,
      offlineMotorDetail: payload
    }
  },
  [setOfflineMotor](state, {payload}) {
    return {
      ...state,
      offlineMotor: payload
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
  },
  [sendNewReplaceForm](state) {
    return {
      ...state,
      loading: true
    }
  },
  [sendNewReplaceFormSuccess](state, {payload}) {
    return {
      ...state,
      all: {
        ...state,
        ...payload
      },
      error: null,
      loading: false
    }
  },
  [sendNewReplaceFormFailed](state, {payload: {message}}) {
    return {
      ...state,
      error: message,
      loading: false
    }
  }
}, initStates);

