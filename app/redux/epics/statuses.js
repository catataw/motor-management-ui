import {ofType} from 'redux-observable';
import {map, switchMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs/observable/of';
import {normalize, schema} from 'normalizr';
import config from '../../config/environment';
import {
  fetchStatuses,
  fetchStatusesFailed,
  fetchStatusesSuccess
} from '../actions/statuses'

const statusesSchema = new schema.Entity('statuses');

export const fetchStatusesEpic = action$ => action$.pipe(
  ofType(fetchStatuses.toString()),
  switchMap(() => {
    return ajax.getJSON(`${config.API.host}/statuses`).pipe(
      map(response => {
        const normalized = normalize(response, [statusesSchema]);
        const { statuses } = normalized.entities;
        return fetchStatusesSuccess(statuses);
      }),
      catchError(err => of(fetchStatusesFailed(err)))
    )
  })
)
