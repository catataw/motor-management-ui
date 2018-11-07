import {createSelector} from 'reselect/es';
import _ from 'lodash';

const allDetails = state => state.details.all;

export const getAllDetails= createSelector(
  [allDetails],
  details => details
)
