import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';

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
  @Input() dateStart: firebase.firestore.Timestamp;
  @Input() dateEnd: firebase.firestore.Timestamp;

  constructor() {}

  ngOnInit(): void {}
}
