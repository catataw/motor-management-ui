import Component from '@ember/component';
import {connect} from 'ember-redux';
import {getStorageDetail, getLoading} from '../redux/selectors/storage'
import {deleteMotorById, subscribeUpdateStorage} from '../redux/actions/storage'
import {getAllMotors} from "../redux/selectors/motor";
import {getAllDetails} from "../redux/selectors/details";

class StorageDetailContainer extends Component {}

const stateToComputed = state => {
  return {
    storageDetail: getStorageDetail(state),
    motors: getAllMotors(state),
    details: getAllDetails(state)
  }
};

const dispatchToActions = dispatch => {
  return {
    deleteMotor: motorId => dispatch(deleteMotorById(motorId)),
    updateMotor: motor => dispatch(subscribeUpdateStorage(motor))

  }
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(StorageDetailContainer);
