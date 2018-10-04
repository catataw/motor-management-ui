import {createSelector} from 'reselect/es';
import _ from 'lodash';

const pmList = state => state.pm.all;

export const getPMList = createSelector(
  [pmList],
  pmList => pmList
)
