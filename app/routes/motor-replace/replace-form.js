import {route} from 'ember-redux';
import {fetchUsers} from '../../redux/actions/users';
import {fetchPMList} from '../../redux/actions/pm';
import {fetchStatuses} from '../../redux/actions/statuses'
const model = (dispatch) => {
    dispatch(fetchUsers());
    dispatch(fetchPMList());
    dispatch(fetchStatuses())
};
export default route({model})();
