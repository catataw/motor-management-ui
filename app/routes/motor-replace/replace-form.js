import {route} from 'ember-redux';
import {fetchUsers, subscribeAndFetchUsers} from '../../redux/actions/users';
import {fetchPMList} from '../../redux/actions/pm';
import {fetchStatuses} from '../../redux/actions/statuses'
const model = (dispatch) => {
    // dispatch(fetchUsers());
    dispatch(fetchPMList());
    dispatch(fetchStatuses());
    dispatch(subscribeAndFetchUsers());

};
export default route({model})();
