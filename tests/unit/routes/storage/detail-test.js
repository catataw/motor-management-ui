import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | storage/detail', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:storage/detail');
    assert.ok(route);
  });
});
