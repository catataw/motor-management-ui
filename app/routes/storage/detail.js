import {route} from 'ember-redux';
import {fetchStorageDetail} from '../../redux/actions/storage';
const model = (dispatch, params) => dispatch(fetchStorageDetail(params.id));

export default route({model})();
