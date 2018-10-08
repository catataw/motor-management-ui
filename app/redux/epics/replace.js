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
  setMotorDetail,
  setMotor,
  setOffLineMotorDetail,
  setOffLineMotor,
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
const detailSchema = new schema.Entity('detail');
const workerSchema = new schema.Entity('workers');
const equipmentSchema = new schema.Entity('equipment');

const motorSchema = new schema.Entity('motor', {
  detail: detailSchema
});

const offLineMotorDetailSchema = new schema.Entity('offLineMotorDetail');
const offLineMotorSchema = new schema.Entity('offLineMotor', {
  detail: offLineMotorDetailSchema
});

const replaceSchema = new schema.Entity('replaceMotor', {
  motor: motorSchema,
  worker: workerSchema,
  pm: pmSchema,
  equipment: equipmentSchema,
  detail: [motorSchema],
  offLineMotor: offLineMotorSchema,
  offLineMotorDetail: [offLineMotorSchema]
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
        const { replaceMotor, workers, pm, motor, equipment, detail, offLineMotor, offLineMotorDetail}  = normalized.entities;
        console.log(offLineMotor)
        return merge(
          of(fetchReplacedDetailSuccess(replaceMotor)),
          of(fetchUsersSuccess(workers)),
          of(fetchPMListSuccess(pm)),
          of(setMotorDetail(detail)),
          of(setMotor(motor)),
          of(fetchEquipmentListSuccess(equipment)),
          of(setOffLineMotor(offLineMotor)),
          of(setOffLineMotorDetail(offLineMotorDetail))
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
