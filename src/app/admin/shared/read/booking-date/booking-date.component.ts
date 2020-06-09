import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-read-booking-date',
  template: `
    <div *ngIf="dateEnd && dateStart">
      {{ dateStart.toDate() | date: 'yyyy/MM/dd' }}-{{
        dateEnd.toDate() | date: 'yyyy/MM/dd'
      }}
    </div>
  `,
  styles: [],
})
export class BookingDateComponent implements OnInit {
  @Input() dateStart: firebase.firestore.Timestamp;
  @Input() dateEnd: firebase.firestore.Timestamp;

  constructor() {}

  ngOnInit(): void {}
}
