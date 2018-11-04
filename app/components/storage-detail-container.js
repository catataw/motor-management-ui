import Component from '@ember/component';
import {connect} from 'ember-redux';
import {getStorageDetail, getLoading} from '../redux/selectors/storage'
import {deleteMotorById, updateMotor} from '../redux/actions/storage'

class StorageDetailContainer extends Component {}

const stateToComputed = state => {
  // console.log('test123  getStorageDetail(state)',  getStorageDetail(state));
  return {
    isLoading: getLoading(state),
    storageDetail: getStorageDetail(state)
  }
};

const dispatchToActions = dispatch => {
  return {
    deleteMotor: motorId => dispatch(deleteMotorById(motorId)),
    updateMotor: motor => dispatch(updateMotor(motor))

  }
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(StorageDetailContainer);
