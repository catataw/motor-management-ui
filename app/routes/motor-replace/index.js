import {route} from 'ember-redux';
import {fetchReaplcedList} from '../../redux/actions/replace';

const model = (dispatch) => dispatch(fetchReaplcedList());

export default route({model})();
