import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-date',
  template: `
    {{ dateStart.toDate() | date: 'yyyy/MM/dd' }}-{{
      dateEnd.toDate() | date: 'yyyy/MM/dd'
    }}
  `,
  styles: [],
})
export class BookingDateComponent implements OnInit {
  @Input() dateStart: string;
  @Input() dateEnd: string;

  constructor() {}

  ngOnInit(): void {}
}
