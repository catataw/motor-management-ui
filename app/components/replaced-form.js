import Component from '@ember/component';
import { action, observes, computed} from '@ember-decorators/object';
import {set, /*get*/} from '@ember/object';
import RSVP from 'rsvp';
import {debounce} from '@ember/runloop';
// import {A} from '@ember/array';
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
  replacedReason;

  @computed('newForm.{onlineMotor,offlineMotor,pm,replacedReason,worker}')
  get canSave() {
    let online = isEmpty(this.newForm.onlineMotor);
    let offline = isEmpty(this.newForm.offlineMotor);
    let pm = isEmpty(this.newForm.pm);
    let reason = isEmpty(this.newForm.replacedReason);
    let user = isEmpty(this.newForm.worker);
    return online || offline || pm || reason || user
  }

  @observes('newForm.replacedReason')
  isOtherReason() {
    if(this.newForm.replacedReason === '4' || this.newForm.replacedReason.length > 1) {
      set(this, 'showReasonTextArea', true)
    } else {
      set(this, 'showReasonTextArea', false)
    }
  }

  @observes('storageMotors')
  setMotorArray() {
    let array = [];
    _.values(this.storageMotors).filter(motor => {
      let obj = {};
      obj.id = motor.id;
      obj.name = motor.seriesNumber;
      array.push(obj)
    });
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
        });
        this.getSelectedPmEquipment(pmName)
      }
    }
  }

  @observes('motorStorage', 'replacedReason', 'onlineMotor', 'newForm.worker', 'searchedMotor')
  setFinalForm() {
    let newForm = this.newForm;
    set(newForm, 'onlineMotor', this.motorOnline);
    set(newForm, 'offlineMotor', this.searchedMotor);
    _.values(this.pmList).forEach(pm => {
      if(pm.id === parseInt(newForm.pm)) {
        set(newForm, 'pm', pm)
      }
    });
    _.values(this.userList).forEach(worker => {
      if(worker.id === newForm.worker) {
        set(newForm, 'worker', worker)
      }
    });
  }

  @observes('newForm.pm', 'selectedEquipment')
  isSelectedPmAndEquipment() {
    if(!isEmpty(this.newForm.pm) && !isEmpty(this.selectedEquipment)) {
      if(this.getOnlineMotor) {
        this.getOnlineMotor({pm: this.newForm.pm, equipment: this.selectedEquipment.id});
      }
    }
  }

  @observes('motorStorage')
  searchedStorageMotor() {
    let motorStorage = this.motorStorage;
    _.values(this.storageMotors).forEach(motor => {
      if(motor.id === motorStorage.id) {
        set(this, 'searchedMotor', motor);
      }
    });
  }

  @computed('equipmentList')
  get equipmentListArray() {
    let array = [];
    _.values(this.equipmentList).filter(obj => {
      array=obj.equipmentList
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
    this.newForm.pm = null
  }

  @action
  saveForm() {
    if(this.saveNewReplaceForm){
      if(this.newForm.replacedReason === '4') {
        set(this.newForm, 'replacedReason', this.replacedReason)
      } else {
        _.values(this.replacedReasonArray).forEach(reason => {
          if(this.newForm.replacedReason === reason.id) {
            set(this.newForm, 'replacedReason', reason.name)
          }
        })
      }
      this.saveNewReplaceForm(this.newForm)
    }
  }
}
