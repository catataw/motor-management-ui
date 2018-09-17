import Component from '@ember/component';
import {connect} from 'ember-redux';
import {getStorageDetail, getLoading} from '../redux/selectors/storage'
import {deleteMotorById} from '../redux/actions/storage'

class StorageDetailContainer extends Component {}

const stateToComputed = state => {
  return {
    isLoading: getLoading(state),
    motor: getStorageDetail(state)
  }
};

const dispatchToActions = dispatch => {
  return {
    deleteMotor: motorId => dispatch(deleteMotorById(motorId))
  }
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(StorageDetailContainer);
