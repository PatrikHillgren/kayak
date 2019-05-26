import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { ILeg, IApplicationState } from '../../interfaces/IFlightTypes';
import { getLeg } from '../../store/reducers/selectors';

export interface ILegInfo {
  index: number;
  arrival: boolean;
}
@Component({
  selector: 'app-flight-location',
  templateUrl: './flight-location.component.html',
  styleUrls: ['./flight-location.component.css']
})
export class FlightLocationComponent implements OnInit {
  @Input() legInfo: ILegInfo;
  leg: ILeg;
  airportDetails: object;
  constructor(private store: Store<{ flightsStore: IApplicationState }>) {}
  ngOnInit() {
    this.store
      .select(getLeg(this.legInfo.index))
      .pipe(take(1))
      .subscribe((leg: ILeg) => {
        this.leg = leg;
        this.airportDetails = this.getAirPortDetails(leg);
      });
  }
  getAirPortDetails(leg) {
    return this.legInfo.arrival
      ? {
          Iata: leg.Destination.Iata,
          Name: leg.Destination.Name,
          Time: leg.Arrival
        }
      : {
          Iata: leg.Origin.Iata,
          Name: leg.Origin.Name,
          Time: leg.Departure
        };
  }
}
