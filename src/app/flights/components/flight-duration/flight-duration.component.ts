import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flight-duration',
  templateUrl: './flight-duration.component.html',
  styleUrls: ['./flight-duration.component.css']
})
export class FlightDurationComponent {
  @Input() flightDuration: number;

  timeConverter() {
    const minutesOfTravel = this.flightDuration % 60;
    const hoursInMinutes = this.flightDuration - minutesOfTravel;
    const hours = hoursInMinutes / 60;
    return hours + 'h ' + minutesOfTravel + 'm';
  }
}
