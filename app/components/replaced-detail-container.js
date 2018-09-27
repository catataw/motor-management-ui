import Component from '@ember/component';
import {connect} from 'ember-redux';
import {getReplacedDetail} from '../redux/selectors/replace'
class ReplacedDetailContainer extends Component {}

const stateToComputed = state => {
  return {
    replacedMotor: getReplacedDetail(state)
  }
};

const dispatchToActions = dispatch => {
  return {
  }
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(ReplacedDetailContainer);
