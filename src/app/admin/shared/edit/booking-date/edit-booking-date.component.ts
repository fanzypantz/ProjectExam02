import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-booking-date',
  template: `
    <div [formGroup]="adminForm" class="admin-edit-card-container">
      <label [for]="key">{{ name }}</label>
      <p>booking date work</p>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditBookingDateComponent implements OnInit {
  @Input() adminForm: FormGroup;
  @Input() key: string;
  @Input() name: string;
  @Input() editAble: boolean;

  constructor() {}

  ngOnInit(): void {}
}
