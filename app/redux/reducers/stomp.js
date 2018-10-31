import {handleActions} from 'redux-actions';
import {
  openWebSocketConnection,
  openWebSocketConnectionSuccess,
  openWebSocketConnectionFailed
} from '../actions/stomp';

const initialState = { // state.stomp
  connectedClient: null, // state.stomp.connectedClient
  error: null, // state.stomp.error
  loading: false, // state.stomp.loading
  connectedSuccess: false
};

export default handleActions({
  [openWebSocketConnection](state, /*{ payload }*/) {
    return {
      ...state,
      error: null, // reset state.stomp.error
      connectedClient: null, // rest state.stomp.connectedClient
      loading: true // state.stomp.loading
    }
  },
  [openWebSocketConnectionSuccess](state, { payload }) {
    return {
      ...state,
      error: null, // reset state.stomp.error
      connectedClient: payload, // state.stomp.connectedClient
      loading: false, // state.stomp.loading
      connectedSuccess: true
    }
  },
  [openWebSocketConnectionFailed](state, { payload }) {
    return {
      ...state,
      error: payload, // state.stomp.error
      connectedClient: null, // state.stomp.connectedClient
      loading: false // state.stomp.loading
    }
  },
  // [showRetrySecond](state,{payload}){
  //   return {
  //     ...state,
  //     error:payload,
  //     connectedClient: null, // state.stomp.connectedClient
  //     loading: false // state.stomp.loading
  //   }
  // }
}, initialState);
