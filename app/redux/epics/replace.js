import {ofType} from 'redux-observable';
import {map, switchMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs/observable/of';
import {
  fetchReaplcedList,
  fetchReaplcedListSuccess,
  fetchReaplcedListFailed
} from '../../redux/actions/replace';
import {normalize, schema} from 'normalizr';
import config from '../../config/environment';

const replaceSchema = new schema.Entity('motor');

export const fetchReplacedListEpic = action$ => action$.pipe(
  ofType(fetchReaplcedList.toString()),
  switchMap(() => {
    return ajax.getJSON(`${config.API.host}/replacedList`).pipe(
      map(response => {
        const normalized = normalize(response, [replaceSchema]);
        const { motor } = normalized.entities;
        return fetchReaplcedListSuccess(motor);
      }),
      catchError(err => of(fetchReaplcedListFailed(err)))
    )
  })
)
