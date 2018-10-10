import {ofType} from 'redux-observable';
import {map, switchMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs/observable/of';
import {normalize, schema} from 'normalizr';
import config from '../../config/environment';
import {
  fetchEquipmentList,
  fetchEquipmentListSuccess,
  fetchEquipmentListFailed
} from '../../redux/actions/equipment'

const equipmentSchema = new schema.Entity('equipment');


export const fetchEquipmentListEpic = action$ => action$.pipe(
  ofType(fetchEquipmentList.toString()),
  switchMap(() => {
    return ajax.getJSON(`${config.API.host}/equipmentList`).pipe(
      map(response => {
        const normalized = normalize(response, [equipmentSchema]);
        const { equipment } = normalized.entities;
        return fetchEquipmentListSuccess(equipment)
      }),
      catchError(err => of(fetchEquipmentListFailed(err)))
    )
})
)
