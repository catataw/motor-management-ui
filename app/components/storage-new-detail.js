import Component from '@ember/component';
import { action } from '@ember-decorators/object';

export default class StorageNewDetailComponent extends Component {
 @action
 createNewMotorAction(motor) {
   if (this.createNewMotor)
     this.createNewMotor(motor);
 }

 @action
 cancelNewMotorAction() {
   if(this.cancelNewMotor)
     this.cancelNewMotor();
 }
}
