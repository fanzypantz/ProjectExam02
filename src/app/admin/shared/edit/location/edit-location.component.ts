import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as firebase from 'firebase';
import 'firebase/firestore';
import GeoPoint = firebase.firestore.GeoPoint;

@Component({
  selector: 'app-edit-location',
  template: `
    <div [formGroup]="adminForm" class="admin-edit-card-container">
      <label [for]="key">{{ name }}</label>
      <div class="admin-edit-map">
        <agm-map
          [latitude]="geoPoint.latitude"
          [longitude]="geoPoint.longitude"
          [zoom]="zoom"
        >
          <agm-marker
            (dragEnd)="markerMoved($event)"
            [latitude]="geoPoint.latitude"
            [longitude]="geoPoint.longitude"
            [markerDraggable]="editAble"
          ></agm-marker>
        </agm-map>
      </div>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditLocationComponent implements OnInit {
  @Input() adminForm: FormGroup;
  @Input() key: string;
  @Input() name: string;
  @Input() editAble: boolean;
  public geoPoint: firebase.firestore.GeoPoint;
  public zoom = 12;

  constructor() {}

  ngOnInit(): void {
    this.geoPoint = this.adminForm.controls[this.key].value;
  }

  markerMoved(e) {
    // Update the geoPoint in the formGroup
    const geoObject = {};
    geoObject[this.key] = new GeoPoint(e.coords.lat, e.coords.lng);
    this.adminForm.patchValue(geoObject);
  }
}
