import Component from '@ember/component';

export default Component.extend({
  didRender() {
    this.$('select').formSelect({classes: 'select'});
  }
});