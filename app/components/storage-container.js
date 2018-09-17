import Component from '@ember/component';
import {
  getLoading,
  getStorageListByPage,
  getStoragePageCount,
  getStoragePageIndex,
  getStoragePageSize
} from '../redux/selectors/storage';
import {connect} from 'ember-redux';
import {gotoStoragePage} from "../redux/actions/storage";

class StorageContainer extends Component {}

const stateToComputed = (state) => {
  return {
    isLoading: getLoading(state),
    storageList: getStorageListByPage(state),
    pageCount: getStoragePageCount(state),
    pageSize: getStoragePageSize(state),
    pageIndex: getStoragePageIndex(state)
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
