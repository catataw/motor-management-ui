import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import {set} from '@ember/object';
import {isEmpty} from '@ember/utils';

export default class StorageList extends Component{

  @computed('storageList', 'motors', 'details')
  get storageArray() {
    let resultArray = [];
    _.values(this.storageList).forEach(storage => {
      let s = _.clone(storage);
      let m = _.get(this.motors, s.motor);
      s.motor = m;
      resultArray.push(s)
    });
    return resultArray;
  }
}
