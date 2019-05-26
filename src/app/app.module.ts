import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StartButtonComponent } from './flights/components/start-button/start-button.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { flightReducer } from './flights/store/reducers/flights';
import { FlightEffects } from './flights/store/effects/flightEffects';
import { FlightLegComponent } from './flights/components/flight-leg/flight-leg.component';
import { FlightLocationComponent } from './flights/components/flight-location/flight-location.component';
import { FlightDurationComponent } from './flights/components/flight-duration/flight-duration.component';
import { BookingComponent } from './flights/components/booking/booking.component';
import { FlightListComponent } from './flights/components/flight-list/flight-list.component';
import { FlightOfferListComponent } from './flights/components/flight-offer-list/flight-offer-list.component';
import { FlightSearchStatusComponent } from './flights/components/flight-search-status/flight-search-status.component';
@NgModule({
  declarations: [
    AppComponent,
    StartButtonComponent,
    FlightLegComponent,
    FlightLocationComponent,
    FlightDurationComponent,
    BookingComponent,
    FlightListComponent,
    FlightOfferListComponent,
    FlightSearchStatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ flightsStore: flightReducer }),
    EffectsModule.forRoot([FlightEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 20
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
