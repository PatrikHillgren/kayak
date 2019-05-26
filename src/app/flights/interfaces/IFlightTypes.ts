import { Action } from '@ngrx/store';

export interface IFlight {
  SegmentIndexes: Array<number>;
  TicketClass: string;
}
export interface IAirport {
  Iata: string;
  Name: string;
}
export interface ILeg {
  AirlineName: string;
  Arrival: string;
  Departure: string;
  Destination: IAirport;
  Duration: number;
  Origin: IAirport;
}

export interface IOffer {
  Deeplink: string;
  FlightIndex: number;
  Supplier: string;
  Price: number;
}
export interface ISegment {
  Duration: number;
  LegIndexes: Array<number>;
}
export default interface IFlightResult {
  Done: boolean;
  ResultNumber: number;
  Flights?: Array<IFlight>;
  Legs?: Array<ILeg>;
  Offers?: Array<IOffer>;
  Segments?: null;
}

export interface IApplicationState {
  hasStartedFetchingFlights: boolean;
  isFlightScanComplete: boolean;
  isSomethingBroken: boolean;
  isLoading: boolean;
  Offers: Array<IOffer>;
  Legs: Array<ILeg>;
  Segments: Array<ISegment>;
  Flights: Array<IFlight>;
  uuid: string;
}

export interface IActionWithPayload<T> extends Action {
  type: string;
  payload?: T;
}
