import Component from '@ember/component';
import {connect} from 'ember-redux';
import {getNewMotor, getResponseStatus} from '../redux/selectors/storage';
import {sendCreateMotor, cancelMotor} from "../redux/actions/storage";

class StorageNewContainer extends Component{
}
const stateToComputed = state => {
  return {
    motor: getNewMotor(state),
    statusCode: getResponseStatus(state)
  }
};

const dispatchToActions = dispatch => {
  return {
    createNewMotor: motor =>
      dispatch(sendCreateMotor(motor)),
    cancelNewMotor: () => dispatch(cancelMotor())
  }
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(StorageNewContainer);
