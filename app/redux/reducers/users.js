import {handleActions} from 'redux-actions';
import {
  fetchUsers, fetchUsersSuccess, fetchUsersFailed,
  fetchUserDetails, fetchUserDetailsFailed, fetchUserDetailsSuccess,
  gotoUsersPage, gotoUsersPageSuccess
} from '../actions/users';

const initialState = { // state.users
  all: {}, // state.users.all
  error: null, // state.users.error
  selectedId: null, // state.users.selectedId
  filters: [], // state.users.filters
  pageIndex: 1, // state.users.pageIndex
  pageSize: 3, // state.users.pageSize
  loading: false // state.users.loading
};

export default handleActions({
  [fetchUsers](state, /*{ payload }*/) {
    return {
      ...state,
      loading: true // state.users.loading
    }
  },
  [fetchUsersSuccess](state, { payload }) {
    return {
      ...state,
      error: null, // reset state.users.error
      all: payload, // state.users.all,
      // pageIndex: state.pageIndex, // state.users.pageIndex
      loading: false // state.users.loading
    }
  },
  [fetchUsersFailed](state, { payload: {message} }) {
    return {
      ...state,
      error: message, // state.users.error
      loading: false // state.users.loading
    }
  },
  [fetchUserDetails](state, { payload }) {
    return {
      ...state,
      selectedId: payload,
      loading: true // state.users.loading
    }
  },
  [fetchUserDetailsSuccess](state, { payload }) {
    return {
      ...state,
      error: null, // reset state.users.error
      all: {
        ...state.all,
        ...payload
      }, // state.users.all,
      loading: false // state.users.loading
    }
  },
  [fetchUserDetailsFailed](state, { payload: {message} }) {
    return {
      ...state,
      error: message, // state.users.error
      loading: false // state.users.loading
    }
  },
  [gotoUsersPage](state, { payload }) {
    return {
      ...state,
      pageIndex: payload,
      // loading: true // state.users.loading
    }
  },
}, initialState);

