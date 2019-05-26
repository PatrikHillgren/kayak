import { Action } from '@ngrx/store';
import IFlightResult from '../../interfaces/IFlightTypes';

export enum ActionTypes {
  StartFlightSearch = '[Flight Feature] StartFlightSearch',
  StartFlightSearchSuccess = '[Flight Feature] StartFlightSearchSuccess',
  GetFlightsFailed = '[Flight Feature] GetFlightsFailed',
  GetFlightsSuccess = '[Flight Feature] GetFlightsSuccess',
  GetNextFlights = '[Flight Feature] GetNextFlights',
  GetNextFlightsSuccess = '[Flight Feature] GetNextFlightsSuccess',
  GetFlightsFinished = '[Flight Feature] GetFlightsFinished'
}

export class StartFlightSearch implements Action {
  readonly type = ActionTypes.StartFlightSearch;
  constructor(public payload: string) {}
}

export class StartFlightSearchSuccess implements Action {
  readonly type = ActionTypes.StartFlightSearchSuccess;
  constructor(public payload: IFlightResult) {}
}

export class GetNextFlights implements Action {
  readonly type = ActionTypes.GetNextFlights;
}

export class GetFlightsFailed implements Action {
  readonly type = ActionTypes.GetFlightsFailed;
}

export class GetNextFlightsSuccess implements Action {
  readonly type = ActionTypes.GetNextFlightsSuccess;
  constructor(public payload: IFlightResult) {}
}

export class GetFlightsFinished implements Action {
  readonly type = ActionTypes.GetFlightsFinished;
}
