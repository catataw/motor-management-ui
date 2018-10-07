import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this.$('select').formSelect({classes: 'select'});
  }

});
