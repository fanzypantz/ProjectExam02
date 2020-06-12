import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  defaultReservations,
  defaultEstablishments,
  defaultMessages,
  defaultPosts,
} from '../shared/app.config';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

import 'firebase/firestore';
import { Establishment } from './shared/models/establisment.model';
import { PageTransitionsService } from '../shared/page-transitions.service';

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

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private router: Router,
    public pageTransition: PageTransitionsService
  ) {}

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

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  newDocument() {
    let data;

    switch (this.model) {
      case 'reservations':
        data = {
          establishmentId: '',
          name: '',
          email: '',
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
          bookingStart: firebase.firestore.Timestamp.fromDate(new Date()),
          bookingEnd: firebase.firestore.Timestamp.fromDate(new Date()),
        };
        break;
      case 'messages':
        data = {
          name: '',
          email: '',
          message: '',
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        };
        break;
      case 'posts':
        data = {
          title: '',
          text: '',
          imageUrl: '',
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        };
        break;
      case 'users':
        data = {
          uid: '',
          email: '',
          displayName: '',
          photoURL: '',
          roles: {
            customer: true,
          },
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        };
        break;
      default:
        data = {
          establishmentName: '',
          establishmentEmail: '',
          area: '',
          imageUrl: [],
          price: 0,
          maxGuests: 0,
          rating: 0,
          location: new firebase.firestore.GeoPoint(
            defaultEstablishments[60.3913].googleLat,
            defaultEstablishments[5.3221].googleLong
          ),
          description: '',
          selfCatering: false,
          highlight: false,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        };
        break;
    }

    this.createNewEntry(this.model, data).then((r) => {
      // TODO: save confirmation instead of this
      this.router.navigate(['/admin'], {
        queryParams: {
          model: this.model,
          mode: 'edit',
          id: r.id,
        },
      });
    });
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

  // Everything bellow is debug only
  seedEstablishments() {
    // Seed establishments
    for (let i = 0; i < 100; i++) {
      const randomGeoIndex = this.getRandomInt(
        0,
        defaultEstablishments.length - 1
      );

      const data = {
        establishmentName:
          defaultEstablishments[
            this.getRandomInt(0, defaultEstablishments.length - 1)
          ].establishmentName,
        establishmentEmail:
          defaultEstablishments[
            this.getRandomInt(0, defaultEstablishments.length - 1)
          ].establishmentEmail,
        area:
          defaultEstablishments[
            this.getRandomInt(0, defaultEstablishments.length - 1)
          ].area,
        imageUrl: [
          defaultEstablishments[
            this.getRandomInt(0, defaultEstablishments.length - 1)
          ].imageUrl,
        ],
        price: this.getRandomInt(50, 300),
        maxGuests: this.getRandomInt(1, 10),
        rating: this.getRandomInt(3, 5),
        location: new firebase.firestore.GeoPoint(
          defaultEstablishments[randomGeoIndex].googleLat,
          defaultEstablishments[randomGeoIndex].googleLong
        ),
        description:
          defaultEstablishments[
            this.getRandomInt(0, defaultEstablishments.length - 1)
          ].description,
        selfCatering:
          defaultEstablishments[
            this.getRandomInt(0, defaultEstablishments.length - 1)
          ].selfCatering,
        highlight:
          defaultEstablishments[
            this.getRandomInt(0, defaultEstablishments.length - 1)
          ].highlight,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };
      this.createNewEntry('establishments', data).then((r) => {});
    }
  }

  seedReservations() {
    // Re-fetch the new establishments to use in reservations
    const establishment = this.afs
      .collection<Establishment>('establishments')
      .valueChanges({ idField: 'id' });

    establishment.subscribe((establishments) => {
      const bookingStart = new Date(
        new Date().getTime() + 60 * 60 * this.getRandomInt(24, 200) * 1000
      );
      const bookingEnd = new Date(
        new Date().getTime() + 60 * 60 * this.getRandomInt(24, 200) * 1000
      );
      for (const [i, item] of defaultReservations.entries()) {
        const data = {
          establishmentId: establishments[i].id,
          establishmentName: establishments[i].establishmentName,
          name: item.name,
          email: item.email,
          persons: item.persons,
          rooms: item.rooms,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
          bookingStart: firebase.firestore.Timestamp.fromDate(bookingStart),
          bookingEnd: firebase.firestore.Timestamp.fromDate(bookingEnd),
        };
        this.createNewEntry('reservations', data).then((r) => {});
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
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
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
}
