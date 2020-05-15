import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { defaultEstablishments } from '../shared/app.config';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  model: string;
  mode: string;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.model = params.model;
      this.mode = params.mode;
    });
  }

  seedDatabase() {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Seed establishments
    for (const item of defaultEstablishments) {
      const data = {
        establishmentName: item.establishmentName,
        establishmentEmail: item.establishmentEmail,
        imageUrl: [item.imageUrl],
        price: item.price,
        maxGuests: item.maxGuests,
        rating: getRandomInt(3, 5),
        location: new firebase.firestore.GeoPoint(
          item.googleLat,
          item.googleLong
        ),
        description: item.description,
        selfCatering: item.selfCatering,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        bookingStart: firebase.firestore.Timestamp.fromDate(new Date()),
        bookingEnd: firebase.firestore.Timestamp.fromDate(
          new Date(new Date().getTime() + 60 * 60 * 24 * 1000)
        ),
      };
      this.createNewEntry(data).then((r) => {});
    }
  }

  private createNewEntry(data) {
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection(this.model)
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }
}
