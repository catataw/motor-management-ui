import {route} from 'ember-redux';
import {fetchReplacedDetail} from '../../redux/actions/replace';
const model = (dispatch, params) => dispatch(fetchReplacedDetail(params.id));

export default route({model})();
