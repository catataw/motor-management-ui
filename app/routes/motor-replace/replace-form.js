import {subscribeAndFetchUsers} from '../../redux/actions/users';
import {subscribeAndFetchPMList} from '../../redux/actions/pm';
import {subscribeAndFetchStatuses} from '../../redux/actions/statuses';
import {service} from '@ember-decorators/service';
import {later} from '@ember/runloop';
import Route from '@ember/routing/route';

export default class ReplaceForm extends Route.extend() {
  @service redux;
  setupController() {
    later(() => {
      this.redux.dispatch(subscribeAndFetchUsers());
      this.redux.dispatch((subscribeAndFetchStatuses()));
      this.redux.dispatch((subscribeAndFetchPMList()));
    }, 400)
  }
}
