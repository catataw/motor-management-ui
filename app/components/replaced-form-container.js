import Component from '@ember/component';
import {connect} from 'ember-redux';
import {getUsersList} from '../redux/selectors/users';
import {getPMList} from '../redux/selectors/pm';
import {getNewReplaceForm} from '../redux/selectors/replace';
import {getEquipmentList} from '../redux/selectors/equipment';
import {fetchMotor, fetchOnlineMotor} from '../redux/actions/motor'

class ReplacedFormContainer extends Component {}

const stateToComputed = state => {
  return {
    userList: getUsersList(state),
    pmList: getPMList(state),
    newForm: getNewReplaceForm(state),
    equipmentList: getEquipmentList(state),
  }
};

const dispatchToActions = dispatch => {
  return {
    searchMotorBySeriesNumber: seriesNumber => dispatch(fetchMotor(seriesNumber)),
    getOnlineMotor: data => dispatch(fetchOnlineMotor(data)),
  }
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(ReplacedFormContainer);
