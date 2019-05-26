import { ActionTypes } from '../actions/flights';
import {
  IApplicationState,
  IActionWithPayload
} from '../../interfaces/IFlightTypes';

export const initialState: IApplicationState = {
  hasStartedFetchingFlights: false,
  isFlightScanComplete: false,
  isSomethingBroken: false,
  isLoading: false,
  Offers: [],
  Legs: [],
  Segments: [],
  Flights: [],
  uuid: ''
};

export function flightReducer(
  state: IApplicationState = initialState,
  action: IActionWithPayload<any>
) {
  switch (action.type) {
    case ActionTypes.StartFlightSearch:
      return {
        ...initialState,
        hasStartedFetchingFlights: true,
        isSomethingBroken: false,
        isLoading: true,
        uuid: action.payload
      };
    case ActionTypes.GetNextFlights:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.GetFlightsFailed:
      return {
        ...state,
        isSomethingBroken: true,
        hasStartedFetchingFlights: false,
        isLoading: false,
        uuid: ''
      };
    case ActionTypes.StartFlightSearchSuccess:
    case ActionTypes.GetNextFlightsSuccess:
      if (!action.payload.Offers) {
        return state;
      }
      return {
        ...state,
        isLoading: false,
        Offers: [...state.Offers, ...action.payload.Offers],
        Legs: [...state.Legs, ...action.payload.Legs],
        Segments: [...state.Segments, ...action.payload.Segments],
        Flights: [...state.Flights, ...action.payload.Flights]
      };
    case ActionTypes.GetFlightsFinished: {
      return {
        ...state,
        isLoading: false,
        isFlightScanComplete: true,
        hasStartedFetchingFlights: false
      };
    }
    default:
      return state;
  }
}
