import {ofType} from "redux-observable";
import {
  fetchStorageWebSocket, fetchStorageWebSocketSuccess, fetchStorageWebSocketFailed,
  subscribeAndFetchStorage, subscribeAndFetchStorageFailed, fetchDetailsSuccess,
  fetchAllStorageListSuccess,
  fetchStorageDetailWebSocket, fetchStorageDetailWebSocketSuccess, fetchStorageDetailWebSocketFailed,
  subscribeAndFetchStorageDetail, subscribeAndFetchStorageDetailFailed, receiveStorageDetailSuccess,
  fetchStorageMotorDetailsSuccess, fetchStorageDetailSuccess, subscribeUpdateStorage,
  subscribeUpdateStorageFailed, fetchUpdateStorageWebSocket, fetchUpdateStorageWebSocketSuccess,
  fetchUpdateStorageWebSocketFailed, receiveUpdateStorageSuccess
} from "../../actions/storage";
import {
  fetchMotorsSuccess
} from "../../actions/motor";
import {merge} from 'rxjs';
import { map, switchMap} from "rxjs/operators";
import {normalize, schema} from "normalizr";
import {of} from "rxjs";
import {
  subscribeStorageTopic, fetchStorageEndpoints,
  fetchStorageDetailEndpoints, subscribeStorageDetailTopic,
  subscribeUpdateStorageTopic, updateStorageEndpoints
} from "../../topic/stoage";

const detailSchema = new schema.Entity('detail');
const motorSchema = new schema.Entity('motor', {
  detail: detailSchema
});
const storageSchema = new schema.Entity('storage', {
  motor: motorSchema
});

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
);

export const subscribeAndFetchStorageDetailEpic = (action$, state$) => action$.pipe(
  ofType(subscribeAndFetchStorageDetail.toString()),
  switchMap(({payload}) => {
    const {value: {stomp: {connectedClient}}} = state$;
    try {
      const source = connectedClient.subscribeBroadcast(subscribeStorageDetailTopic);
      return merge(
        source.pipe(
          map(message => {
            let motorObject = JSON.parse(message.body);
            const normalized = normalize(motorObject, storageSchema);
            const { storage, motor, detail } = normalized.entities;
            return merge(
              of(fetchStorageDetailSuccess(storage)),
              of(fetchMotorsSuccess(motor)),
              of(fetchDetailsSuccess(detail))
            )
          }),
          switchMap(action => action)
        ),
        of(fetchStorageDetailWebSocket()),
        action$.pipe(
          ofType(fetchStorageDetailWebSocket.toString()),
          map(() => {
            try {
              connectedClient.send(fetchStorageDetailEndpoints, payload);
              return fetchStorageDetailWebSocketSuccess()
            } catch (e) {
              return fetchStorageDetailWebSocketFailed(e)
            }
          })
        )
      )
    } catch (e) {
      return of(subscribeAndFetchStorageDetailFailed(e));
    }
  })
);

export const subscribeUpdateStorageEpic = (action$, state$) => action$.pipe(
  ofType(subscribeUpdateStorage.toString()),
  switchMap(({payload}) => {
    const {value: {stomp: {connectedClient}}} = state$;
    try {
      const source = connectedClient.subscribeBroadcast(subscribeUpdateStorageTopic);
      return merge(
        source.pipe(
          map(message => {
            let motorObject = JSON.parse(message.body);
            const normalized = normalize(motorObject, storageSchema);
            const { storage, motor, detail } = normalized.entities;
            return merge(
              of(receiveUpdateStorageSuccess(storage)),
              of(fetchMotorsSuccess(motor)),
              of(fetchDetailsSuccess(detail))
            );
          }),
          switchMap(action => action)
        ),
        of(fetchUpdateStorageWebSocket()),
        action$.pipe(
          ofType(fetchUpdateStorageWebSocket.toString()),
          map(() => {
            try {
              connectedClient.send(updateStorageEndpoints, JSON.stringify(payload));
              return fetchUpdateStorageWebSocketSuccess()
            } catch (e) {
              return of(fetchUpdateStorageWebSocketFailed(e))
            }
          })
        )
      )
    } catch (e) {
      return of(subscribeUpdateStorageFailed(e));
    }
  })
)
