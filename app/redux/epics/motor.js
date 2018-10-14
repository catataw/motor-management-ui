import {ofType} from 'redux-observable';
import {map, switchMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs/observable/of';
import {normalize, schema} from 'normalizr';
import config from '../../config/environment';
import {
  fetchMotor,
  fetchMotorSuccess,
  fetchMotorFailed,
  fetchOnlineMotor,
  fetchOnlineMotorSuccess,
  fetchOnlineMotorFailed
} from '../actions/motor'

const motorSchema = new schema.Entity('motors')

export const fetchMotorEpic = action$ => action$.pipe(
  ofType(fetchMotor.toString()),
  switchMap(action=> {
    return ajax.getJSON(`${config.API.host}/searchMotorByStatus?seriesNumber=${action.payload.offlineNumber}&status=${action.payload.status}`).pipe(
      map(response => {
        const normalized = normalize(response, [motorSchema]);
        const { motors } = normalized.entities;
        return fetchMotorSuccess(motors);
      }),
      catchError(err => of(fetchMotorFailed(err)))
    )
  })
);

export const fetchOnlineMotorEpic = action$ => action$.pipe(
  ofType(fetchOnlineMotor.toString()),
  switchMap(action => {
    return ajax.getJSON(`${config.API.host}/onlineEquipments?id=${action.payload.pm}&equipment=${action.payload.equipment}`).pipe(
      map(response => {
        const normalized = normalize(response, [motorSchema]);
        const { motors } = normalized.entities;
        //todo when real api running, below need to remove
        let result = null;
        _.values(motors).filter(motor => {
          let list = motor.equipments
          _.values(list).filter(l => {
            if(l.equipment.id === action.payload.equipment) {
              result = l.motor;
            }
          })
        })
        return fetchOnlineMotorSuccess(result);
      }),
      catchError(err => of(fetchOnlineMotorFailed(err)))
    )
  })
);
