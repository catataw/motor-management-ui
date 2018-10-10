import Component from '@ember/component';
import { action, observes, computed} from '@ember-decorators/object';
import {set, get} from '@ember/object';
import RSVP from 'rsvp';
import {debounce} from '@ember/runloop';
import {A} from '@ember/array';
import { isEmpty } from '@ember/utils';

export default class ReplacedFormComponent extends Component{
  @action
  searchSeriesNumber(flag, offlineNumber) {
    new RSVP.Promise(() => {
      debounce(this, this._discountInput, flag, offlineNumber, 800);
    });
  }

  _discountInput(flag, offlineNumber) {
    if(this.searchMotorBySeriesNumber)
      this.searchMotorBySeriesNumber(offlineNumber);
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
