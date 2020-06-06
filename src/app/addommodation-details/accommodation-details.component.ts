import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Establishment } from '../admin/shared/models/establisment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PageTransitionsService } from '../shared/page-transitions.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: [
    '../accommodations/accommodations.component.scss',
    './accommodation-details.component.scss',
  ],
})
export class AccommodationDetailsComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;
  private documentSubscription: Subscription;
  id: string;
  private accommodation: Observable<Establishment>;
  public data: Establishment;
  public zoom = 12;
  public bookingForm: FormGroup;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private pageTransition: PageTransitionsService
  ) {
    this.paramSub = route.params.subscribe((p) => {
      this.id = p.id;

      // @ts-ignore
      this.accommodation = this.afs
        .collection<Establishment>('establishments')
        .doc(this.id)
        .valueChanges();

      this.documentSubscription = this.accommodation.subscribe((snapshot) => {
        this.pageTransition.toggleOpenClose(0);
        this.data = snapshot;
      });
    });
  }

  ngOnInit(): void {
    this.bookingForm = new FormGroup({
      bookingEnd: new FormControl(''),
      bookingStart: new FormControl(''),
      email: new FormControl(''),
      name: new FormControl(''),
    });
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.documentSubscription.unsubscribe();
  }

  onSubmit(data) {
    console.log('data: ', data);
    // // Save the document based on it's model and ID.
    // this.isSaving = true;
    // const documentRef = this.afs.doc(`${this.model}/${this.id}`);
    // documentRef.set(data, { merge: true }).then((r) => (this.isSaving = false));
  }
}
