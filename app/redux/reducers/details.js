import {handleActions} from 'redux-actions';
import { fetchDetailsSuccess } from '../actions/details'

const initState = {
  all:{}
};

export default handleActions({
  [fetchDetailsSuccess](state, {payload}) {
    return {
      ...state,
      all: {
        ...state.all,
        ...payload
      }
    }
  }
}, initState);
