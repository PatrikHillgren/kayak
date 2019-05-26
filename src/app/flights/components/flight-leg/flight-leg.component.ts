import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../interfaces/IFlightTypes';
import { getSegment } from '../../store/reducers/selectors';
import { take } from 'rxjs/operators';
import { ISegment } from '../../interfaces/IFlightTypes';
import { ILegInfo } from '../flight-location/flight-location.component';

@Component({
  selector: 'app-flight-leg',
  templateUrl: './flight-leg.component.html',
  styleUrls: ['./flight-leg.component.css']
})
export class FlightLegComponent implements OnInit {
  @Input() flightSegmentIndex: number;
  segment: ISegment;

  constructor(private store: Store<{ flightsStore: IApplicationState }>) {}
  ngOnInit() {
    this.store
      .select(getSegment(this.flightSegmentIndex))
      .pipe(take(1))
      .subscribe((segment: ISegment) => {
        this.segment = segment;
      });
  }
  getOriginLegIndex(): ILegInfo {
    return {
      index: this.segment.LegIndexes[0],
      arrival: false
    };
  }
  getDestinationLegIndex(): ILegInfo {
    const lengthOfLegs = this.segment.LegIndexes.length;
    return lengthOfLegs > 1
      ? {
          index: this.segment.LegIndexes[lengthOfLegs - 1],
          arrival: true
        }
      : {
          index: this.segment.LegIndexes[0],
          arrival: true
        };
  }
}
