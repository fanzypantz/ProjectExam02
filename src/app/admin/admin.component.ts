import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  defaultEnquiries,
  defaultEstablishments,
  defaultMessages,
  defaultPosts,
} from '../shared/app.config';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

import 'firebase/firestore';
import { Establishment } from './shared/models/establisment.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  model: string;
  mode: string;
  id: string;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe((params) => {
      this.model = params.model;
      this.mode = params.mode;
      if (params.id) {
        this.id = params.id;
      }
    });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  // Everything bellow is debug only
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  seedEstablishments() {
    // Seed establishments
    for (const item of defaultEstablishments) {
      const data = {
        establishmentName: item.establishmentName,
        establishmentEmail: item.establishmentEmail,
        imageUrl: [item.imageUrl],
        price: item.price,
        maxGuests: item.maxGuests,
        rating: this.getRandomInt(3, 5),
        location: new firebase.firestore.GeoPoint(
          item.googleLat,
          item.googleLong
        ),
        description: item.description,
        selfCatering: item.selfCatering,
        highlight: item.highlight,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };
      this.createNewEntry('establishments', data).then((r) => {});
    }
  }

  seedEnquiries() {
    // Re-fetch the new establishments to use in enquiries
    const establishment = this.afs
      .collection<Establishment>(this.model)
      .valueChanges({ idField: 'id' });

    establishment.subscribe((establishments) => {
      const bookingStart = new Date(
        new Date().getTime() + 60 * 60 * this.getRandomInt(24, 200) * 1000
      );
      const bookingEnd = new Date(
        new Date().getTime() + 60 * 60 * this.getRandomInt(24, 200) * 1000
      );

      for (const [i, item] of defaultEnquiries.entries()) {
        const data = {
          establishmentId: establishments[i].id,
          name: item.name,
          email: item.email,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
          bookingStart: firebase.firestore.Timestamp.fromDate(bookingStart),
          bookingEnd: firebase.firestore.Timestamp.fromDate(bookingEnd),
        };
        this.createNewEntry('enquiries', data).then((r) => {});

        // Update the establishments with the new booking
        this.afs
          .collection('establishments')
          .doc(establishments[i].id)
          .collection('booking')
          .add({
            bookingStart,
            bookingEnd,
          });
      }
    });
  }

  seedPosts(files) {
    for (const [i, item] of defaultPosts.entries()) {
      const storageRef = firebase
        .storage()
        .ref()
        .child(`posts/${files[i].name}`);

      const uploadTask = storageRef.put(files[i]);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        (err) => {
          console.log('error: ', err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const data = {
              title: item.title,
              text: item.text,
              imageUrl: downloadURL,
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
              updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
            };
            this.createNewEntry('posts', data).then((r) => {});
          });
        }
      );
    }
  }

  seedMessages() {
    for (const item of defaultMessages) {
      const data = {
        name: item.name,
        email: item.email,
        message: item.message,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };
      this.createNewEntry('messages', data).then((r) => {});
    }
  }

  private createNewEntry(model: string, data: object) {
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection(model)
        .add(data)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }
}
