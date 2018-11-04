
import {service} from '@ember-decorators/service';
import {later} from '@ember/runloop';
import Route from '@ember/routing/route';
import {subscribeAndFetchStorageDetail} from '../../redux/actions/storage'

export default class StorageDetailIndexList extends Route.extend() {
  @service redux;

  model(params) {
    return params.id;
  }

  setupController(controller, model) {
    later(() => {
      this.redux.dispatch(subscribeAndFetchStorageDetail(model));
    }, 400)
  }
}
