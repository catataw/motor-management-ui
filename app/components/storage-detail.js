import Component from '@ember/component';
import { action } from '@ember-decorators/object';

export default class StorageDetailComponent extends Component {
  @action
  deleteMotorAction(motorId) {
    if(this.deleteMotor) {
      this.deleteMotor(motorId);
    }
  }
}
