import Component from '@ember/component';
import { action, observes, computed} from '@ember-decorators/object';
import {set, get} from '@ember/object';
import RSVP from 'rsvp';
import {debounce} from '@ember/runloop';
import {A} from '@ember/array';
import { isEmpty } from '@ember/utils';
import _ from 'lodash';


export default class ReplacedFormComponent extends Component{
  constructor() {
    super(...arguments);
    this.replacedReasonArray = [
      {id: '0', name: 'AA'},
      {id: '1', name: 'BB'},
      {id: '2', name: 'CC'},
      {id: '3', name: 'DD'},
      {id: '4', name: 'Other'}
    ]
  }

  @observes('newForm.replacedReason')
  isOtherReason() {
    console.log('tet123', this.newForm.replacedReason)
    if(this.newForm.replacedReason === '4') {
      set(this, 'showReasonTextArea', true)
    } else {
      set(this, 'showReasonTextArea', false)
    }
  }

  @observes('storageMotors')
  setMotorArray() {
    let array = [];
    _.values(this.storageMotors).filter(motor => {
      let obj = {}
      obj.id = motor.id;
      obj.name = motor.seriesNumber;
      array.push(obj)
    })
    console.log(array)
    set(this, 'motorArray', array)
  }

  @observes('newForm.pm')
  getSelectedPmEquipmentList() {
    if(!isEmpty(this.newForm.pm)) {
      if(this.getSelectedPmEquipment) {
        let pmName = null;
        _.values(this.pmList).filter(pm => {
          if(pm.id.toString() === this.newForm.pm) {
            pmName = pm.name
          }
        })
        this.getSelectedPmEquipment(pmName)
      }
    }
  }

  @observes('newForm.pm', 'selectedEquipment')
  isSelectedPmAndEquipment() {
    if(!isEmpty(this.newForm.pm) && !isEmpty(this.selectedEquipment)) {
      if(this.getOnlineMotor) {
        this.getOnlineMotor({pm: this.newForm.pm, equipment: this.selectedEquipment.id});
      }
    }
  }

  @computed('equipmentList')
  get equipmentListArray() {
    let array = [];
    _.values(this.equipmentList).filter(obj => {
      array.push(obj)
    });
    return array;
  }

  @action
  searchSeriesNumber(offlineNumber) {
    new RSVP.Promise(() => {
      debounce(this, this._discountInput, offlineNumber, 800);
    });
  }

  _discountInput(offlineNumber) {
    if (this.searchMotorBySeriesNumber) {
      let status = null;
      _.values(this.statuses).filter(s => {
        if (s.id === '1') {
          status = s.status
        }
      });
      this.searchMotorBySeriesNumber({offlineNumber: offlineNumber, status: status});
    }
  }

  @action
  cancelForm() {
    console.log('cancel form')
  }

  @action
  saveForm() {
    console.log('save form')
  }
};
