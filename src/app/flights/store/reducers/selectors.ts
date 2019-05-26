import { IApplicationState, IOffer } from '../../interfaces/IFlightTypes';
import { createSelector } from '@ngrx/store';
import { IFlight, ISegment, ILeg } from '../../interfaces/IFlightTypes';
import { pathOr } from 'ramda';

export interface IApplicationStore {
  flightsStore: IApplicationState;
}
export const selectFlightState = (state: IApplicationStore) =>
  state.flightsStore;

export const getIsSomethingBroken = createSelector(
  selectFlightState,
  (flightsStore: IApplicationState) => flightsStore.isSomethingBroken
);

export const getHasSearchStarted = createSelector(
  selectFlightState,
  (flightsStore: IApplicationState) => flightsStore.hasStartedFetchingFlights
);

export const getIsComplete = createSelector(
  selectFlightState,
  (flightsStore: IApplicationState) => flightsStore.isFlightScanComplete
);

export const getIsLoading = createSelector(
  selectFlightState,
  (flightsStore: IApplicationState) => flightsStore.isLoading
);

export const getSegments = createSelector(
  selectFlightState,
  (flightsStore: IApplicationState) => {
    return flightsStore.Segments;
  }
);

export const getFlights = createSelector(
  selectFlightState,
  (flightsStore: IApplicationState) => {
    return flightsStore.Flights;
  }
);

export const getLegs = createSelector(
  selectFlightState,
  (flightsStore: IApplicationState) => {
    return flightsStore.Legs;
  }
);

export const getFlightOffers = () =>
  createSelector(
    selectFlightState,
    (flightsStore: IApplicationState) => {
      return flightsStore.Offers;
    }
  );

export const getSegment = (index: number) =>
  createSelector(
    getSegments,
    (Segments: Array<ISegment>) => {
      return Segments[index];
    }
  );
export const getStatus = () =>
  createSelector(
    getIsSomethingBroken,
    getHasSearchStarted,
    getIsComplete,
    getIsLoading,
    (
      broken: boolean,
      started: boolean,
      complete: boolean,
      isLoading: boolean
    ) => {
      return {
        isComplete: complete,
        hasStarted: started,
        isSomethingBroken: broken,
        isLoading
      };
    }
  );

export const getFlightSegments = (index: number) =>
  createSelector(
    getFlights,
    (Flights: Array<IFlight>) => {
      return pathOr([], ['SegmentIndexes'], Flights[index]);
    }
  );

export const getLeg = (index: number) =>
  createSelector(
    getLegs,
    (Legs: Array<ILeg>) => {
      return Legs[index];
    }
  );
