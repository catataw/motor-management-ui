import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | motor-replace/detail', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:motor-replace/detail');
    assert.ok(route);
  });
});
