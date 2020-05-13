import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-date',
  template: ` {{ date.toDate() | date: 'yyyy/MM/dd' }} `,
  styles: [],
})
export class DateComponent implements OnInit {
  @Input() date: firebase.firestore.Timestamp;

  constructor() {}

  ngOnInit(): void {}
}
