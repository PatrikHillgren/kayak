import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  ActionTypes,
  StartFlightSearch,
  GetFlightsFailed,
  GetNextFlights,
  GetFlightsFinished,
  StartFlightSearchSuccess,
  GetNextFlightsSuccess
} from '../actions/flights';
import { mergeMap, switchMap, delay, catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { FlightService } from '../../services/flightService';
import IFlightResult from '../../interfaces/IFlightTypes';
export interface IAction {
  type: string;
  payload?: any;
}
@Injectable()
export class FlightEffects {
  constructor(
    private actions$: Actions,
    private flightService: FlightService
  ) {}

  @Effect()
  startFlightSearchEffect: Observable<Action> = this.actions$.pipe(
    ofType<StartFlightSearch>(ActionTypes.StartFlightSearch),
    switchMap(action =>
      this.flightService.getOffers(action.payload).pipe(
        switchMap((resp: IFlightResult) => {
          const actionList = [];
          actionList.push(new StartFlightSearchSuccess(resp));
          if (resp.Done) {
            actionList.push(new GetFlightsFinished());
          } else {
            actionList.push(new GetNextFlights());
          }
          return actionList;
        }),
        catchError(e => of(new GetFlightsFailed()))
      )
    ),
    catchError(e => of(new GetFlightsFailed()))
  );

  @Effect()
  getNextFlightSearchEffect = this.actions$.pipe(
    ofType<GetNextFlights>(ActionTypes.GetNextFlights),
    delay(2000),
    switchMap(() =>
      this.flightService.getOffers().pipe(
        switchMap((resp: IFlightResult) => {
          const actionList = [];
          actionList.push(new GetNextFlightsSuccess(resp));
          if (resp.Done) {
            actionList.push(new GetFlightsFinished());
          } else {
            actionList.push(new GetNextFlights());
          }
          return actionList;
        }),
        catchError(e => of(new GetFlightsFailed()))
      )
    ),
    catchError(e => of(new GetFlightsFailed()))
  );
}
