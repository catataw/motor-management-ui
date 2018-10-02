import {route} from 'ember-redux';
import {fetchUsers} from '../redux/actions/users';

// const model = (dispatch) => dispatch(fetchUsers());
const model = dispatch => console.log('in application route')
export default route({model})();
