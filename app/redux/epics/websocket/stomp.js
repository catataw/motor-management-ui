import {of} from "rxjs/observable/of";
import {
  openWebSocketConnection,
  openWebSocketConnectionSuccess,
  openWebSocketConnectionFailed,
  closeWebSocketConnection
} from "../../actions/stomp"

import {stompobservable} from 'webstomp-obs';
import {ofType} from "redux-observable";
import {catchError, map, switchMap, takeUntil, delay, mapTo} from "rxjs/operators";
// import config from '../../../../config/environment'
import config from '../../../config/environment';

const stompURL = config.Stomp.url;
const createWS = () => new SockJS(stompURL);
const client = stompobservable.over(createWS, {debug: true});

export const openWebSocketConnectionEpic = (action$) => action$.pipe(
  ofType(openWebSocketConnection.toString()),
  switchMap((/*action*/) => {
      const conn = client.connect({});
      return conn.pipe(
        map(connectedClient => openWebSocketConnectionSuccess(connectedClient)),
        delay(3000),
        takeUntil(action$.ofType(closeWebSocketConnection.toString())),
        catchError(/*err*/() => of(openWebSocketConnectionFailed("Retry connect websocket server when 10 s after."))),
      )
    }
  )
);


// auto refresh ws connect when ws closed or connect failed.
export const openWebSocketConnectionFailedRetryEpic = (action$, state$) => action$.pipe(
  ofType(openWebSocketConnectionFailed.toString() || closeWebSocketConnection.toString()),
  switchMap(() => {
      // const {value: {stomp: {connectedClient}}} = state$; // connectedClient = "state$.value.stomp.connectedClient"
      const {value: {currentUser}} = state$; // currentUser = "state$.value.currentUser"
      console.log('current login user = ',currentUser);
      if(currentUser){
        return of(null).pipe(
          mapTo(openWebSocketConnection()),
          delay(10000)
        );
      }else{
        return {type:"REQUIRE_LOGIN"};
      }

    }
  )
);

// const interval$ = interval(1000).pipe(take(10));
// export const openWebSocketConnectionFailedRetryEpic = (action$) => action$.pipe(
//   ofType(openWebSocketConnectionFailed.toString() || closeWebSocketConnection.toString()),
//   merge(
//     interval(1000).pipe(
//       take(10),
//       map(data => {
//         // data = data / 10;
//         console.log('data = ', data);
//         return showRetrySecond(data);
//       })
//     ),
//     of(null).pipe(
//       mapTo(openWebSocketConnection()),
//       delay(10000)
//     )
//   )
// );
