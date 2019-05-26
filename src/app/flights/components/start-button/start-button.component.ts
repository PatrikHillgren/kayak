import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { getStatus } from '../../store/reducers/selectors';
import { StartFlightSearch } from '../../store/actions/flights';
import uuid from 'uuid/v4';

export interface ISearchStatus {
  isComplete: boolean;
  hasStarted: boolean;
  isSomethingBroken: boolean;
  isLoading: boolean;
}
@Component({
  selector: 'app-start-button',
  templateUrl: './start-button.component.html',
  styleUrls: ['./start-button.component.css']
})
export class StartButtonComponent implements OnInit {
  searchStatus: ISearchStatus;

  constructor(private store: Store<{ flightsStore: object }>) {}

  ngOnInit() {
    this.store.select(getStatus()).subscribe((searchStatus: ISearchStatus) => {
      this.searchStatus = searchStatus;
    });
  }
  startNewFlightSearch() {
    const flightScanId = uuid();
    this.store.dispatch(new StartFlightSearch(flightScanId));
  }

  displayButton(): boolean {
    return this.searchStatus.isComplete || !this.searchStatus.hasStarted;
  }

  getStatusText(): string {
    if (this.searchStatus.isSomethingBroken) {
      return 'Something is broken :( ';
    }
    if (this.searchStatus.isLoading) {
      return 'Loading flights...';
    }

    if (!this.searchStatus.hasStarted) {
      return 'Start a new flight search by pressing the button! :)';
    }

    if (this.searchStatus.isComplete) {
      return 'Search completed, in order to search again press search! :)';
    }

    return '';
  }
}
