import {ofType} from 'redux-observable';
import {map, switchMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs/observable/of';
import {normalize, schema} from 'normalizr';
import config from '../../config/environment';
import {
  fetchMotor,
  fetchMotorSuccess,
  fetchMotorFailed
} from '../actions/motor'

const motorSchema = new schema.Entity('motors')

export const fetchMotorEpic = action$ => action$.pipe(
  ofType(fetchMotor.toString()),
  switchMap(action=> {
    return ajax.getJSON(`${config.API.host}/search-motor-status?seriesNumber=${action.payload}`).pipe(
      map(response => {
        const normalized = normalize(response, [motorSchema]);
        const { motors } = normalized.entities;
        return fetchMotorSuccess(motors);
      }),
      catchError(err => of(fetchMotorFailed(err)))
    )
  })
);
