import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  @Input() url: string;
  @Input() price: number;
  @Input() currency: string;
  @Input() supplier: string;
}
