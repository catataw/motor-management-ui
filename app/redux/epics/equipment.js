import {ofType} from 'redux-observable';
import {map, switchMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs/observable/of';
import {normalize, schema} from 'normalizr';
import _ from 'lodash';
import config from '../../config/environment';
import {
  fetchEquipmentList,
  fetchEquipmentListSuccess,
  fetchEquipmentListFailed
} from '../../redux/actions/equipment';

const equipmentSchema = new schema.Entity('equipment');


export const fetchEquipmentListEpic = action$ => action$.pipe(
  ofType(fetchEquipmentList.toString()),
  switchMap(action => {
    return ajax.getJSON(`${config.API.host}/equipmentList?pm=${action.payload}`).pipe(
      map(response => {
        let res = _.last(response);
        const normalized = normalize(res, equipmentSchema);
        const { equipment } = normalized.entities;
        return fetchEquipmentListSuccess(equipment)
      }),
      catchError(err => of(fetchEquipmentListFailed(err)))
    )
})
)
