// import Route from '@ember/routing/route';
//
// export default Route.extend({
// });

import {route} from 'ember-redux';
import {openWebSocketConnection} from '../redux/actions/stomp';

const model = (dispatch) => dispatch(openWebSocketConnection());
// const model = dispatch => console.log('in application route')
export default route({model})();
