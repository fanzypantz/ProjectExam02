import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-read-date',
  template: ` {{ date.toDate() | date: 'yyyy/MM/dd' }} `,
  styles: [],
})
export class DateComponent implements OnInit {
  @Input() date: firebase.firestore.Timestamp;

  constructor() {}

  ngOnInit(): void {}
}
