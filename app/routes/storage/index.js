import {route} from 'ember-redux';
import {fetchAllStorageList} from '../../redux/actions/storage';

const model = (dispatch) => dispatch(fetchAllStorageList());

export default route({model})();
