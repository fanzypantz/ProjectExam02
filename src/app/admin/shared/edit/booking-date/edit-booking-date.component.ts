import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-booking-date',
  template: `
    <div class="admin-edit-card-container">
      <p>
        booking-date works!
      </p>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditBookingDateComponent implements OnInit {
  @Input() id: string;

  constructor() {}

  ngOnInit(): void {}
}
