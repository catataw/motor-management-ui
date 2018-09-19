import Component from '@ember/component';
import {connect} from 'ember-redux';
import {getNewMotor} from '../redux/selectors/storage';

class StorageNewContainer extends Component{
}
const stateToComputed = state => {
  return {
    motor: getNewMotor(state),
  }
};

const dispatchToActions = dispatch => {
  return {
    createNewMotor: motor => console.log(motor)
  }
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(StorageNewContainer);
