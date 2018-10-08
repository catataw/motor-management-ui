import Component from '@ember/component';
import {connect} from 'ember-redux';
import {getReplacedDetail, getMotorDetail, getLoading, getMotor, getOffLineMotor, getOffLineMotorDetail,} from '../redux/selectors/replace'
import {getPMList} from "../redux/selectors/pm";
import {getEquipmentList} from "../redux/selectors/equipment";
import { isEmpty } from '@ember/utils';
import {getUsersList} from "../redux/selectors/users";
import {saveReplacedMotorAction} from '../redux/actions/replace'


class ReplacedDetailContainer extends Component {}

const stateToComputed = state => {
  return {
    replacedMotor: getReplacedDetail(state),
    motorDetail: getMotorDetail(state),
    isLoading: getLoading(state),
    pmList: getPMList(state),
    equipmentList: getEquipmentList(state),
    motor: getMotor(state),
    workerList: getUsersList(state),
    offLineMotor: getOffLineMotor(state),
    offLineMotorDetail: getOffLineMotorDetail(state)
  }
};

const dispatchToActions = dispatch => {
  return {
    saveReplacedMotor: (replacedMotor) => dispatch(saveReplacedMotorAction(replacedMotor))
  }
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(ReplacedDetailContainer);
