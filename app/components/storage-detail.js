import Component from '@ember/component';
import { action } from '@ember-decorators/object';

export default class StorageDetailComponent extends Component {
  @action
  deleteMotorAction(motorId) {
    if(this.deleteMotor) {
      this.deleteMotor(motorId);
    }
  }

  @action
  updateMotorDetailAction(motor) {
    if(this.updateMotor) {
      console.log('in detail ', this.get('motor'));
      this.updateMotor(motor);
    }
  }
}