import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IOffer, IApplicationState } from '../../interfaces/IFlightTypes';
import { getFlightOffers } from '../../store/reducers/selectors';

@Component({
  selector: 'app-flight-offer-list',
  templateUrl: './flight-offer-list.component.html',
  styleUrls: ['./flight-offer-list.component.css']
})
export class FlightOfferListComponent implements OnInit {
  offers$: Observable<Array<IOffer>>;

  constructor(private store: Store<{ flightsStore: IApplicationState }>) {}

  ngOnInit() {
    this.offers$ = this.store.select(getFlightOffers());
  }
}
