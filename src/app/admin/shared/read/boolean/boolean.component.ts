import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-boolean',
  template: ` {{ yesNo(bool) }} `,
  styleUrls: ['./boolean.component.scss'],
})
export class BooleanComponent implements OnInit {
  @Input() bool: boolean;

  constructor() {}

  ngOnInit(): void {}

  yesNo(bool: boolean) {
    if (bool) {
      return 'Yes';
    } else {
      return 'No';
    }
  }
}
