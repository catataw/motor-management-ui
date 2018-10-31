import Component from '@ember/component';
import {connect} from 'ember-redux';
import {getUsersList} from '../redux/selectors/users';
import {getPMList} from '../redux/selectors/pm';
import {getNewReplaceForm} from '../redux/selectors/replace';
import {getEquipmentList} from '../redux/selectors/equipment';
import {fetchMotor, fetchOnlineMotor} from '../redux/actions/motor'
import {fetchEquipmentList} from "../redux/actions/equipment";
import {getOnlineMotor, getStorageMotor} from '../redux/selectors/motor';
import {getStatuses} from '../redux/selectors/statuses';
import {sendNewReplaceForm} from '../redux/actions/replace';

class ReplacedFormContainer extends Component {}

const stateToComputed = state => {
  return {
    userList: getUsersList(state),
    pmList: getPMList(state),
    newForm: getNewReplaceForm(state),
    equipmentList: getEquipmentList(state),
    motorOnline: getOnlineMotor(state),
    storageMotors: getStorageMotor(state),
    statuses: getStatuses(state),
  }
};

const dispatchToActions = dispatch => {
  return {
    searchMotorBySeriesNumber: seriesNumber => dispatch(fetchMotor(seriesNumber)),
    getSelectedPmEquipment: pm => dispatch(fetchEquipmentList(pm)),
    getOnlineMotor: data => dispatch(fetchOnlineMotor(data)),
    saveNewReplaceForm: newForm => dispatch(sendNewReplaceForm(newForm))
  }
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(ReplacedFormContainer);
