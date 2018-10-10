import {route} from 'ember-redux';
import {fetchUsers} from '../../redux/actions/users';
import {fetchPMList} from '../../redux/actions/pm';
import {fetchEquipmentList} from '../../redux/actions/equipment'
const model = (dispatch) => {
    dispatch(fetchUsers());
    dispatch(fetchPMList());
    dispatch(fetchEquipmentList());
};
export default route({model})();
