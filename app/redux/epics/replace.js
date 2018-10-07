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
  setMotor
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
const motorSchema = new schema.Entity('motor', {
  detail: detailSchema
});
const equipmentSchema = new schema.Entity('equipment');


const replaceSchema = new schema.Entity('replaceMotor', {
  motor: motorSchema,
  worker: workerSchema,
  pm: pmSchema,
  equipment: equipmentSchema,
  detail: [motorSchema]
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
        const { replaceMotor, workers, pm, motor, equipment, detail}  = normalized.entities;
        return merge(
          of(fetchReplacedDetailSuccess(replaceMotor)),
          of(fetchUsersSuccess(workers)),
          of(fetchPMListSuccess(pm)),
          of(setMotorDetail(detail)),
          of(setMotor(motor)),
          of(fetchEquipmentListSuccess(equipment))
        )
      }),
      switchMap(action => action),
      catchError(err => of(fetchReplacedDetailFailed(err))
      )
    )
  })
);
