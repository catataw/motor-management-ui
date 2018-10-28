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
  fetchReplacedDetail,
  setOnlineMotorDetail,
  setOnlineMotor,
  setOfflineMotorDetail,
  setOfflineMotor,
  saveReplacedMotorAction,
  saveReplacedMotorActionSuccess,
  saveReplacedMotorActionFailed
} from '../../redux/actions/replace';
import { fetchPMListSuccess } from "../../redux/actions/pm";
import { fetchEquipmentListSuccess} from '../../redux/actions/equipment';
import {fetchUsersSuccess} from "../actions/users";
import {normalize, schema} from 'normalizr';
import config from '../../config/environment';
import {merge} from 'rxjs';

const pmSchema = new schema.Entity('pm');
const onlineMotorDetailSchema = new schema.Entity('onlineMotorDetail');
const workerSchema = new schema.Entity('workers');
const equipmentSchema = new schema.Entity('equipment');

const onlineMotorSchema = new schema.Entity('onlineMotor', {
  detail: onlineMotorDetailSchema
});

const offlineMotorDetailSchema = new schema.Entity('offlineMotorDetail');
const offlineMotorSchema = new schema.Entity('offlineMotor', {
  detail: offlineMotorDetailSchema
});

const replaceSchema = new schema.Entity('replaceMotor', {
  onlineMotor: onlineMotorSchema,
  worker: workerSchema,
  pm: pmSchema,
  equipment: equipmentSchema,
  onlineMotorDetail: onlineMotorDetailSchema,
  offlineMotor: offlineMotorSchema,
  offlineMotorDetail: offlineMotorDetailSchema
});

export const fetchReplacedListEpic = action$ => action$.pipe(
  ofType(fetchReplacedList.toString()),
  switchMap(() => {
    return ajax.getJSON(`${config.API.host}/replacedList`).pipe(
      map(response => {
        const normalized = normalize(response, [replaceSchema]);
        const {replaceMotor, workers, pm, equipment} = normalized.entities;
        return merge(
          of(fetchReplacedListSuccess(replaceMotor)),
          of(fetchUsersSuccess(workers)),
          of(fetchPMListSuccess(pm)),
          of(fetchEquipmentListSuccess(equipment))
        )
      }),
      switchMap(action => action),
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
        const { replaceMotor, workers, pm, onlineMotor, equipment, onlineMotorDetail, offlineMotor, offlineMotorDetail}  = normalized.entities;
        console.log('test', onlineMotor, onlineMotorDetail)
        return merge(
          of(fetchReplacedDetailSuccess(replaceMotor)),
          of(fetchUsersSuccess(workers)),
          of(fetchPMListSuccess(pm)),
          of(setOnlineMotorDetail(onlineMotorDetail)),
          of(setOnlineMotor(onlineMotor)),
          of(fetchEquipmentListSuccess(equipment)),
          of(setOfflineMotor(offlineMotor)),
          of(setOfflineMotorDetail(offlineMotorDetail))
        )
      }),
      switchMap(action => action),
      catchError(err => of(fetchReplacedDetailFailed(err))
      )
    )
  })
);

export const saveReplacedMotorActionEpic = action$ => action$.pipe(
  ofType(saveReplacedMotorAction.toString()),
  switchMap(action => {
    let replacedMotorId = action.payload.id;
    let result = action.payload.action;
    return ajax.patch(`${config.API.host}/replacedList/${replacedMotorId}`,
      JSON.stringify({action: result}),
      {'Content-Type': 'application/json'}).pipe(
      map(() => saveReplacedMotorActionSuccess()),
      catchError(err => of(saveReplacedMotorActionFailed(err))
      ))
  })
);
