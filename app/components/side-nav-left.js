import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this.$('.sidenav').sidenav();
    this.$('.collapsible').collapsible();
  }
});
