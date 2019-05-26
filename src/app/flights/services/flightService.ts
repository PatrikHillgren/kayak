import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import IFlightResult from '../interfaces/IFlightTypes';

@Injectable({ providedIn: 'root' })
export class FlightService {
  constructor(private http: HttpClient) {}
  private flightUrl =
    'https://stjxo8vo34.execute-api.eu-west-1.amazonaws.com/prod/flight-search/1.2';
  private uuid = '';

  getOffers(uuid?: string): Observable<IFlightResult> {
    if (uuid) {
      this.uuid = uuid;
    }
    return this.http.get<IFlightResult>(`${this.flightUrl}/${this.uuid}`);
  }
}
