import {ofType} from "redux-observable";
import {
  fetchStorageWebSocket, fetchStorageWebSocketSuccess, fetchStorageWebSocketFailed,
  subscribeAndFetchStorage, subscribeAndFetchStorageFailed, fetchDetailsSuccess,
  fetchAllStorageListSuccess
} from "../../actions/storage";
import {
  fetchMotorsSuccess
} from "../../actions/motor";
import {merge} from 'rxjs';
import { map, switchMap} from "rxjs/operators";
import {normalize, schema} from "normalizr";
import {of} from "rxjs";
import {subscribeStorageTopic, fetchStorageEndpoints} from "../../topic/stoage";

const detailSchema = new schema.Entity('detail');
const motorSchema = new schema.Entity('motor', {
  detail: detailSchema
});
const storageSchema = new schema.Entity('storage', {
  motor: motorSchema
})

export const subscribeAndFetchStorageEpic = (action$, state$) => action$.pipe(
  ofType(subscribeAndFetchStorage.toString()),
  switchMap(() => {
    const {value: {stomp: {connectedClient}}} = state$;
    try {
      const source = connectedClient.subscribeBroadcast(subscribeStorageTopic);
      return merge(
        source.pipe(
          map(message => {
            let motorObject = JSON.parse(message.body);
            const normalized = normalize(motorObject, [storageSchema]);
            const { storage, motor, detail } = normalized.entities;
            return merge(
              of(fetchAllStorageListSuccess(storage)),
              of(fetchMotorsSuccess(motor)),
              of(fetchDetailsSuccess(detail))
            )
          }),
          switchMap(action => action)
        ),
        of(fetchStorageWebSocket()),
        action$.pipe(
          ofType(fetchStorageWebSocket.toString()),
          map(() => {
            try {
              connectedClient.send(fetchStorageEndpoints);
              return fetchStorageWebSocketSuccess()
            } catch (e) {
              return fetchStorageWebSocketFailed(e)
            }
          })
        )
      )
    } catch (e) {
     return of(subscribeAndFetchStorageFailed(e));
    }
  })
)