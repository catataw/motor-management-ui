import {
  fetchPMListWebSocket, fetchPMListWebSocketSuccess,
  fetchPMListWebSocketFailed, subscribeAndFetchPMList,
  subscribeAndFetchPMListFailed, receivePMListSuccess
} from "../../actions/pm";
import {ofType} from "redux-observable";
import {merge} from 'rxjs';
import { map, switchMap} from "rxjs/operators";
import {normalize, schema} from "normalizr";
import {of} from "rxjs";
import {fetchPMListEndpoints, subscribePMListTopic} from "../../topic/pm";

const pmSchema = new schema.Entity('pm');

export const subscribeAndFetchPMListEpic = (action$, state$) => action$.pipe(
  ofType(subscribeAndFetchPMList.toString()),
  switchMap(() => {
    const {value: {stomp: {connectedClient}}} = state$;
    try {
      const source = connectedClient.subscribeBroadcast(subscribePMListTopic);
      return merge(
        source.pipe(
          map(message => {
            let pmObject = JSON.parse(message.body);
            const normalized = normalize(pmObject, [pmSchema]);
            const { pm } = normalized.entities;
            return receivePMListSuccess(pm)
          })
        ),
        of(fetchPMListWebSocket()),
        action$.pipe(
          ofType(fetchPMListWebSocket.toString()),
          map(() => {
            try {
              connectedClient.send(fetchPMListEndpoints);
              return fetchPMListWebSocketSuccess()
            } catch (e) {
              return fetchPMListWebSocketFailed(e)
            }
          })
        )
      )
    } catch (e) {
      return of(subscribeAndFetchPMListFailed(e))
    }
  })
)
