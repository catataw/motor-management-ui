import {route} from 'ember-redux';
import {createMotor} from '../../redux/actions/storage';

const model = (dispatch) => dispatch(createMotor());

export default route({model})();

