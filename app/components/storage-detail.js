import Component from '@ember/component';
import { action, observes, computed } from '@ember-decorators/object';
import {service} from '@ember-decorators/service';
import {set} from '@ember/object';
import {isEmpty} from '@ember/utils';

export default class StorageDetailComponent extends Component {
  @service redux;

  @computed('storageDetail', 'motors', 'details')
  get isLoading() {
    if(isEmpty(this.storageDetail) || isEmpty(this.motors) || isEmpty(this.details)) {
      return true
    } else {
      return false
    }
  }

  @observes('storageDetail', 'motors', 'details')
  setStorageMotor() {
    if(!isEmpty(this.storageDetail)) {
      let motor = _.get(this.motors, this.storageDetail.motor);
      if(!isEmpty(motor)) {
        let detail = _.get(this.details, motor.detail);
        let motorObject = {
          id: this.storageDetail.id,
          location: this.storageDetail.location,
          motor: {
            id: motor.id,
            remark: motor.remark,
            seriesNumber: motor.seriesNumber,
            status: motor.status,
            detail: {
              ...detail
            }
          }
        };
        set(this,'storageMotor',motorObject);
        set(this, 'showData', true);
      }
    }
  }

  @action
  deleteMotorAction(motorId) {
    if(this.deleteMotor) {
      this.deleteMotor(motorId);
    }
  }

  @action
  updateMotorDetailAction(motor) {
    if(this.updateMotor) {
      this.updateMotor(motor);
    }
  }
}
