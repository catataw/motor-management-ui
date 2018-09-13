import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import ReduxService from 'ember-redux/services/redux';
import reducers from '../redux/reducers/index';
import enhancers from 'ember-redux/enhancers/index';
import epics from '../redux/epics/index';

const epicMiddleware = createEpicMiddleware();

const makeStoreInstance = ({reducers, enhancers}) => {
  const middleware = applyMiddleware(epicMiddleware);
  const createStoreWithMiddleware = compose(
    middleware,
    enhancers
  )(createStore);
  const store = createStoreWithMiddleware(reducers);
  epicMiddleware.run(epics);
  return store;
};

export default class EpicReduxService extends ReduxService {

  constructor() {
    super(...arguments);
    this.store = makeStoreInstance({ reducers, enhancers });
  }
}
