import Component from '@ember/component';
import {
  getLoading,
  getStorageListByPage,
  getStoragePageCount,
  getStoragePageIndex,
  getStoragePageSize
} from '../redux/selectors/storage';
import {
  getAllMotors
} from '../redux/selectors/motor';
import {
  getAllDetails
} from '../redux/selectors/details';

import {connect} from 'ember-redux';
import {gotoStoragePage} from "../redux/actions/storage";

class StorageContainer extends Component {}

const stateToComputed = (state) => {
  return {
    isLoading: getLoading(state),
    storageList: getStorageListByPage(state),
    motors: getAllMotors(state),
    pageCount: getStoragePageCount(state),
    pageSize: getStoragePageSize(state),
    pageIndex: getStoragePageIndex(state),
    details: getAllDetails(state)
  };
};

const dispatchToActions = (dispatch) => {
  return {
    gotoPage: (pageIndex) => dispatch(gotoStoragePage(pageIndex)),
  };
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(StorageContainer);
