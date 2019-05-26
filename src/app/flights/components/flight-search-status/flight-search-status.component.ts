import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-search-status',
  templateUrl: './flight-search-status.component.html',
  styleUrls: ['./flight-search-status.component.css']
})
export class FlightSearchStatusComponent implements OnInit {
  @Input() displayText: string;
  constructor() {}

  ngOnInit() {}
}
