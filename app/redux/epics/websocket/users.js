import {ofType} from "redux-observable";
import {
  subscribeToUsersFailed, receiveUsersSuccess,
  subscribeAndFetchUsers, fetchUsersWebSocket,
  fetchUsersWebSocketSuccess, fetchUsersWebSocketFailed
} from "../../actions/users";
import {merge} from 'rxjs';
import { map, switchMap} from "rxjs/operators";
import {normalize, schema} from "normalizr";
import {of} from "rxjs";
import {subscribeUsersTopic, fetchUsersEndpoints} from '../../topic/users';

const userSchema = new schema.Entity('users');

export const subscribeAndFetchUsersEpic = (action$, state$) => action$.pipe(
  ofType(subscribeAndFetchUsers.toString()),
  switchMap(() => {
    const {value: {stomp: {connectedClient}}} = state$;
    try {
      const source = connectedClient.subscribeBroadcast(subscribeUsersTopic);
      return merge(
        source.pipe(
          map(message => {
            let usersObject = JSON.parse(message.body);
            const normalized = normalize(usersObject, [userSchema]);
            const { users } = normalized.entities;
            return receiveUsersSuccess(users)
          })
        ),
        of(fetchUsersWebSocket()),
        action$.pipe(
          ofType(fetchUsersWebSocket.toString()),
          map(() => {
            try {
              connectedClient.send(fetchUsersEndpoints);
              return fetchUsersWebSocketSuccess();
            } catch (err) {
              return fetchUsersWebSocketFailed(err);
            }
          }),
        ),
      )
    } catch (err) {
      return of(subscribeToUsersFailed(err))
    }
  })
);

