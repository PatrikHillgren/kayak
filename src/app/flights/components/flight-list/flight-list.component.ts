import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getFlightSegments } from '../../store/reducers/selectors';
import { IApplicationState, ISegment } from '../../interfaces/IFlightTypes';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  @Input() flightIndex: number;
  segmentIndexes$: Observable<Array<number>>;
  segment$: Observable<ISegment>;
  constructor(private store: Store<{ flightsStore: IApplicationState }>) {}
  ngOnInit() {
    this.segmentIndexes$ = this.store.select(
      getFlightSegments(this.flightIndex)
    );
  }
}
