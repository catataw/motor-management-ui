import {subscribeAndFetchStorage} from '../../redux/actions/storage';
import {service} from '@ember-decorators/service';
import {later} from '@ember/runloop';
import Route from '@ember/routing/route';

export default class StorageIndexList extends Route.extend() {
  @service redux;
  setupController() {
    later(() => {
      this.redux.dispatch(subscribeAndFetchStorage());
    }, 400)
  }
}
