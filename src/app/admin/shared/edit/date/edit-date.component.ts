import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-date',
  template: `
    <div class="admin-edit-card-container">
      <p>
        date works!
      </p>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditDateComponent implements OnInit {
  @Input() date: firebase.firestore.Timestamp;

  constructor() {}

  ngOnInit(): void {}
}
