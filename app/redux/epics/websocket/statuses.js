import {
  fetchStatusesWebSocket, fetchStatusesWebSocketSuccess,
  receiveStatusesSuccess, fetchStatusesWebSocketFailed,
  subscribeAndFetchStatuses, subscribeAndFetchStatusesFailed
} from "../../actions/statuses";
import {ofType} from "redux-observable";
import {merge} from 'rxjs';
import { map, switchMap} from "rxjs/operators";
import {normalize, schema} from "normalizr";
import {of} from "rxjs";
import {fetchStatusesEndpoints, subscribeStatusesTopic} from "../../topic/statuses";

const statusesSchema = new schema.Entity('statuses');

export const fetchStatusesWebSocketEpic = (action$, state$) => action$.pipe(
  ofType(subscribeAndFetchStatuses.toString()),
  switchMap(() => {
    const {value: {stomp: {connectedClient}}} = state$;
    try {
      const source = connectedClient.subscribeBroadcast(subscribeStatusesTopic);
      return merge(
        source.pipe(
          map(message => {
            let statusesObject = JSON.parse(message.body);
            const normalized = normalize(statusesObject, [statusesSchema]);
            const { statuses } = normalized.entities;
            return receiveStatusesSuccess(statuses)
          })
        ),
        of(fetchStatusesWebSocket()),
        action$.pipe(
          ofType(fetchStatusesWebSocket.toString()),
          map(() => {
            try {
              connectedClient.send(fetchStatusesEndpoints);
              return fetchStatusesWebSocketSuccess()
            } catch (e) {
              return fetchStatusesWebSocketFailed(e)
            }
          })
        )
      )
    } catch (e) {
      return of(subscribeAndFetchStatusesFailed(e))
    }
  })
);
