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
}
