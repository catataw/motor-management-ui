import {ofType} from 'redux-observable';
import {map, switchMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs/observable/of';
import {
  fetchUsers, fetchUsersSuccess, fetchUsersFailed,
  fetchUserDetails, fetchUserDetailsSuccess, fetchUserDetailsFailed
} from '../../redux/actions/users';
import {normalize, schema} from 'normalizr';
import config from '../../config/environment';

// Define a users schema
const userSchema = new schema.Entity('users');

// export const fetchUsersEpic = (action$) => action$.pipe(
//   ofType(fetchUsers.toString()),
//   switchMap((/*action*/) =>
//     ajax.getJSON("https://jsonplaceholder.typicode.com/users").pipe(
//       map(response => { // array of users
//         const normalized = normalize(response, [userSchema]);
//         const { users } = normalized.entities; // users map keyed by id
//         return fetchUsersSuccess(users);
//       }),
//       catchError(err => of(fetchUsersFailed(err)))
//     )
//   )
// );
//
// export const fetchUserDetailsEpic = (action$) => action$.pipe(
//   ofType(fetchUserDetails.toString()),
//   switchMap(({ payload }) =>
//     ajax.getJSON(`https://jsonplaceholder.typicode.com/users/${payload}`).pipe(
//       map(response => { // single user object
//         const normalized = normalize(response, userSchema);
//         const { users } = normalized.entities; // users map with one entry
//         return fetchUserDetailsSuccess(users);
//       }),
//       catchError(err => of(fetchUserDetailsFailed(err)))
//     )
//   )
// );

export const fetchUsersEpic = action$ => action$.pipe(
  ofType(fetchUsers.toString()),
  switchMap(() => {
    return ajax.getJSON(`${config.API.host}/users`).pipe(
      map(response => {
        const normalized = normalize(response, [userSchema]);
        const { users } = normalized.entities;
        return fetchUsersSuccess(users);
      }),
      catchError(err => of(fetchUsersFailed(err)))
    );
  })
)
