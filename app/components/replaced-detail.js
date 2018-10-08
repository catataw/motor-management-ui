import Component from '@ember/component';
import { action, observes} from '@ember-decorators/object';


export default class ReplacedDetailComponent extends Component {

  isActionSelected = false

  @action
  selectedAction(action) {
    this.set('isActionSelected', true);
    this.set('replacedMotor.action', action)
  }

  @action
  saveReplacedMotorAction() {
    if(this.saveReplacedMotor) {
      this.saveReplacedMotor(this.replacedMotor);
    }
  }
}
