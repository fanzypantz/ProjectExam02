import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-location',
  template: `
    <div class="admin-edit-card-container">
      <p>
        location works!
      </p>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditLocationComponent implements OnInit {
  @Input() location: firebase.firestore.GeoPoint;

  constructor() {}

  ngOnInit(): void {}
}
