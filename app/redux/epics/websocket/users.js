import {ofType} from "redux-observable";
import {
  subscribeToUsersSuccess, subscribeToUsersFailed,
  receiveUsersSuccess, unsubscribeFromUsers, unsubscribeFromUsersSuccess,
  subscribeAndFetchUsers, fetchUsersWebSocket, fetchUsersWebSocketSuccess,
  fetchUsersWebSocketFailed
} from "../../actions/users";
import {merge} from 'rxjs';
import { map, switchMap, takeUntil} from "rxjs/operators";
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
        of(subscribeToUsersSuccess()),
        source.pipe(
          map(message => {
            let usersObject = JSON.parse(message.body);
            const normalized = normalize(usersObject, [userSchema]);
            const { users } = normalized.entities;
            return receiveUsersSuccess(users);
          }),
          takeUntil(action$.pipe(
            ofType(unsubscribeFromUsers.toString())
          ))
        ),
        of(fetchUsersWebSocket()),
        action$.pipe(
          ofType(fetchUsersWebSocket.toString()),
            map(() => {
            const {value: {stomp: {connectedClient}}} = state$;
            try {
              connectedClient.send(fetchUsersEndpoints);
              return fetchUsersWebSocketSuccess();
            } catch (err) {
              return fetchUsersWebSocketFailed(err);
            }
          })
          ),
        action$.pipe(
          ofType(unsubscribeFromUsers.toString()),
          map(() => {
            console.log('test123 unsubscribe')
            connectedClient.unsubscribe(subscribeUsersTopic);
            return unsubscribeFromUsersSuccess()
          })
        )
      )
    } catch (err) {
      return of(subscribeToUsersFailed(err))
    }
  })
);

// export const fetchUsersWebSocketEpic = (action$, state$) => action$.pipe(
//   ofType(fetchUsersWebSocket.toString()),
//   map(() => {
//     const {value: {stomp: {connectedClient}}} = state$;
//     try {
//       connectedClient.send(fetchUsersEndpoints);
//       return fetchUsersWebSocketSuccess();
//     } catch (err) {
//       return fetchUsersWebSocketFailed(err);
//     }
//   })
// );
