import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Establishment } from '../admin/shared/models/establisment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PageTransitionsService } from '../shared/page-transitions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  private id: string;
  private accommodation: Observable<Establishment>;
  public data: Establishment;
  public zoom = 12;
  public bookingForm: FormGroup;
  private price: number;
  public displayPrice: number;

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
        this.price = this.data.price;
        // Lets assume the price in the DB is per person, default form has 2
        // There could be more advanced calculations like price per room and
        // Prices for different types of beds etc. But lets keep it simple
        this.displayPrice = this.data.price * 2;
      });
    });
  }

  ngOnInit(): void {
    this.bookingForm = new FormGroup({
      bookingEnd: new FormControl(''),
      bookingStart: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
        ),
      ]),
      name: new FormControl(''),
      rooms: new FormControl(1),
      persons: new FormControl(2),
    });
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.documentSubscription.unsubscribe();
  }

  onNumberChange(e) {
    this.displayPrice = e.target.value * this.price;
  }

  onSubmit(data) {
    const bookingStartDate = this.bookingStartElement.nativeElement.valueAsDate;
    const bookingEndDate = this.bookingEndElement.nativeElement.valueAsDate;

    if (bookingStartDate > bookingEndDate) {
      this.bookingForm.controls.bookingStart.setErrors({ startDate: true });
    }

    if (this.bookingForm.get('bookingStart').value === '') {
      this.bookingForm.controls.bookingStart.setErrors({ incorrect: true });
    }

    if (this.bookingForm.get('bookingEnd').value === '') {
      this.bookingForm.controls.bookingEnd.setErrors({ incorrect: true });
    }

    if (this.bookingForm.valid) {
      // Add in the required data before creating new document
      // This is where you would add in payment logic like stripe or whatnot
      data.establishmentId = this.id;
      data.createdAt = firebase.firestore.Timestamp.fromDate(new Date());
      data.updatedAt = firebase.firestore.Timestamp.fromDate(new Date());
      this.createNewEntry(data).then((r) => {
        this.pageTransition.navigate('/');
      });
    }
  }

  private createNewEntry(data) {
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection('enquiries')
        .add(data)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  get bookingEnd() {
    return this.bookingForm.get('bookingEnd');
  }

  get bookingStart() {
    return this.bookingForm.get('bookingStart');
  }

  get email() {
    return this.bookingForm.get('email');
  }

  get name() {
    return this.bookingForm.get('name');
  }

  get rooms() {
    return this.bookingForm.get('rooms');
  }

  get persons() {
    return this.bookingForm.get('persons');
  }

  @ViewChild('bookingStartElement')
  bookingStartElement: ElementRef;

  @ViewChild('bookingEndElement')
  bookingEndElement: ElementRef;
}
