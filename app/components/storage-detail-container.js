import Component from '@ember/component';
import {connect} from 'ember-redux';
import {getStorageDetail, getLoading} from '../redux/selectors/storage'

class StorageDetailContainer extends Component {}

const stateToComputed = state => {
  return {
    isLoading: getLoading(state),
    motor: getStorageDetail(state)
  }
};

const dispatchToActions = dispatch => {
  return {
  }
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(StorageDetailContainer);
