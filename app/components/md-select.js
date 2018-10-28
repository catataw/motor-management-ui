import Component from '@ember/component';
import { action, observes} from '@ember-decorators/object';
import _ from 'lodash';
import {set} from '@ember/object';

export default class MdSelect extends Component{

  didRender() {
    this.$('select').formSelect()
  }

  willRender() {
    if(typeof this.options === 'object') {
      let newOptions = [];
      _.values(this.options).forEach(obj => {
        newOptions.push(obj);
      });
      set(this, 'uiOptions', newOptions);
    } else {
      set(this, 'uiOptions', this.options)
    }
  }

  @observes('clear')
  initSelect() {
    this.$('select').val(-1)
  }

  selectOptionAction = this.setSelection;

  @action
  setSelection(selected) {
    // console.log('input selected = ', selected);
    this.set('selectedOption', selected);
  }

};
