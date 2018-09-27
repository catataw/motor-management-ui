import {ofType} from 'redux-observable';
import {map, switchMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs/observable/of';
import {
  fetchReplacedList,
  fetchReplacedListSuccess,
  fetchReplacedListFailed,
  fetchReplacedDetailFailed,
  fetchReplacedDetailSuccess,
  fetchReplacedDetail
} from '../../redux/actions/replace';
import {normalize, schema} from 'normalizr';
import config from '../../config/environment';
import {fetchStorageDetailFailed, fetchStorageDetailSuccess} from "../actions/storage";

const replaceSchema = new schema.Entity('motor');

export const fetchReplacedListEpic = action$ => action$.pipe(
  ofType(fetchReplacedList.toString()),
  switchMap(() => {
    return ajax.getJSON(`${config.API.host}/replacedList`).pipe(
      map(response => {
        const normalized = normalize(response, [replaceSchema]);
        const { motor } = normalized.entities;
        return fetchReplacedListSuccess(motor);
      }),
      catchError(err => of(fetchReplacedListFailed(err)))
    )
  })
);

export const fetchReplacedDetailEpic = action$ => action$.pipe(
  ofType(fetchReplacedDetail.toString()),
  switchMap(action => {
    return ajax.getJSON(`${config.API.host}/replacedList/${action.payload}`).pipe(
      map(response => {
        const normalized = normalize(response, replaceSchema);
        const { motors }  = normalized.entities;
        return fetchReplacedDetailSuccess(motors);
      }),
      catchError(err => of(fetchReplacedDetailFailed(err))
      )
    )
  })
);
