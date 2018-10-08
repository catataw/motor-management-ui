import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | motor-repair', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:motor-repair');
    assert.ok(route);
  });
});
