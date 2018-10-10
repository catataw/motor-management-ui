import {ofType} from 'redux-observable';
import {map, switchMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs/observable/of';
import {normalize, schema} from 'normalizr';
import config from '../../config/environment';
import {fetchPMList,
  fetchPMListSuccess,
  fetchPMListFailed
} from '../../redux/actions/pm'

const pmSchema = new schema.Entity('pm');

export const fetchPMListEpic = action$ => action$.pipe(
  ofType(fetchPMList.toString()),
  switchMap(() => {
    return ajax.getJSON(`${config.API.host}/pmList`).pipe(
      map(response => {
        const normalized = normalize(response, [pmSchema]);
        const { pm } = normalized.entities;
        return fetchPMListSuccess(pm);
      }),
      catchError(err => {of(fetchPMListFailed(err))})
    )
  })
)
