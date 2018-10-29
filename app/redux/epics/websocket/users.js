import {ofType} from "redux-observable";
import {fetchUsers, fetchUsersFailed, fetchUsersSuccess,
  subscribeToUsersSuccess, subscribeToUsersFailed,
  receiveUsersSuccess, unsubscribeFromUsers, unsubscribeFromUsersSuccess
} from "../../actions/users";
import {merge} from 'rxjs';
import { map, switchMap, takeUntil} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {normalize} from "normalizr";
import {of} from "rxjs";
import {subscribeUsersTopic, fetchUsersEndpoints} from '../../topic/users'

export const fetchUsersEpic = (action$, state$) => action$.pipe(
  ofType(fetchUsers.toString()),
  switchMap(() => {
    const {value: {stomp: {connectedClient}}} = state$;
    try{
      const source = connectedClient.subscribeBroadcast(subscribeUsersTopic);
      return merge(
        of(subscribeToUsersSuccess()),
        source.pipe(
          map(message => {
            return receiveUsersSuccess(message)
          }),
          takeUntil(action$.pipe(
            ofType(unsubscribeFromUsers().toString()),
            map(() => unsubscribeFromUsersSuccess())
          ))
        ),
        action$.pipe( // emit "UNSUBSCRIBE_SUCCESS" after receiving "UNSUBSCRIBE" action
          ofType(unsubscribeFromUsers.toString()),
          map(() => unsubscribeFromUsersSuccess())
        )
      ),

      // return merge(
      //   of(subscribeToSalesOrdersSuccess()), // emit "SUBSCRIBE_SUCCESS" action after subscribeBroadCast() call
      //   source.pipe( // handle subscription stream
      //     map(message => {
      //       return receiveSalesOrdersSuccess(message);
      //     }),
      //     takeUntil(action$.pipe( // stop subscription stream after receiving "UNSUBSCRIBE" action
      //       ofType(unsubscribeFromSalesOrders.toString())
      //     ))
      //   ),
      //   action$.pipe( // emit "UNSUBSCRIBE_SUCCESS" after receiving "UNSUBSCRIBE" action
      //     ofType(unsubscribeFromSalesOrders.toString()),
      //     map(() => unsubscribeFromSalesOrdersSuccess())
      //   )
      // );
      //
      // );
      switchMap(action => action)
    } catch(err) {
      console.log('test123', err)
      return of(subscribeToUsersFailed(err));
    }

    // return ajax.getJSON(`${config.API.host}/users`).pipe(
    //   map(response => {
    //     const normalized = normalize(response, [userSchema]);
    //     const { users } = normalized.entities;
    //     return fetchUsersSuccess(users);
    //   }),
    //   catchError(err => of(fetchUsersFailed(err)))
    // );
  })
)
