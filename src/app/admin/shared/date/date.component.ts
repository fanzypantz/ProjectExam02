import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  template: ` {{ date.toDate() | date: 'yyyy/MM/dd' }} `,
  styles: [],
})
export class DateComponent implements OnInit {
  @Input() date: string;

  constructor() {}

  ngOnInit(): void {}
}
