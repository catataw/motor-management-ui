import {ofType} from 'redux-observable';
import {map, switchMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs/observable/of';
import {
  deleteMotorById, deleteMotorByIdFailed, deleteMotorByIdSuccess,
  fetchAllStorageList,
  fetchAllStorageListFailed,
  fetchAllStorageListSuccess,
  fetchStorageDetail,
  fetchStorageDetailFailed,
  fetchStorageDetailSuccess,
  updateMotorSuccess,
  updateMotorFailed,
  updateMotor,
  sendCreateMotor,
  createMotorSuccess,
  createMotorFailed
} from '../../redux/actions/storage';
import {normalize, schema} from 'normalizr';
import config from '../../config/environment'

const motorsSchema = new schema.Entity('motors');

export const fetchAllStorageEpic = action$ => action$.pipe(
  ofType(fetchAllStorageList.toString()),
  switchMap(() => {
    return ajax.getJSON(`${config.apiHost}/storage`).pipe(
      map(response => {
        const normalized = normalize(response, [motorsSchema]);
        const { motors } = normalized.entities;
        return fetchAllStorageListSuccess(motors);
      }),
      catchError(err => of(fetchAllStorageListFailed(err)))
    )
  })
);

export const fetchStorageDetailEpic = action$ => action$.pipe(
  ofType(fetchStorageDetail.toString()),
  switchMap(action => {
    return ajax.getJSON(`${config.apiHost}/storage/${action.payload}`).pipe(
      map(response => {
        const normalized = normalize(response, motorsSchema);
        const { motors }  = normalized.entities;
        return fetchStorageDetailSuccess(motors);
      }),
      catchError(err => of(fetchStorageDetailFailed(err))
      )
    )
  })
);

export const deleteMotorByIdEpic = action$ => action$.pipe(
  ofType(deleteMotorById.toString()),
  switchMap(action => {
    return ajax.delete(`${config.apiHost}/storage/${action.payload}`).pipe(
      map(() => deleteMotorByIdSuccess(action.payload)),
      catchError(err => of(deleteMotorByIdFailed(err)))
    )
  })
);

export const updateMotorEpic = action$ => action$.pipe(
  ofType(updateMotor.toString()),
  switchMap(action => {
    let motor = action.payload;
    return ajax.put(`${config.apiHost}/storage/${motor.id}`,JSON.stringify(motor) , {'Content-Type': 'application/json'}).pipe(
      map(() => updateMotorSuccess(motor)),
      catchError(err => of(updateMotorFailed(err)))
    )
  })
);

export const saveMotorEpic = action$ => action$.pipe(
  ofType(sendCreateMotor.toString()),
  switchMap(action => {
    let motor =action.payload;
    return ajax.post(`${config.API.host}/storage`, JSON.stringify(motor), {'Content-Type': 'application/json'}).pipe(
      map(response => createMotorSuccess(response.status)
      ),
      catchError(err => of(createMotorFailed(err)))
    )
  })
);
