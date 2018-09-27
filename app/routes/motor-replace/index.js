import {route} from 'ember-redux';
import {fetchReplacedList} from '../../redux/actions/replace';

const model = (dispatch) => dispatch(fetchReplacedList());

export default route({model})();
