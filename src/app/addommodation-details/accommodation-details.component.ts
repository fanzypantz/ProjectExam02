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
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
        ),
      ]),
      name: new FormControl(''),
    });
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.documentSubscription.unsubscribe();
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
      console.log('valid: ');
    }

    // // Save the document based on it's model and ID.
    // this.isSaving = true;
    // const documentRef = this.afs.doc(`${this.model}/${this.id}`);
    // documentRef.set(data, { merge: true }).then((r) => (this.isSaving = false));
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

  @ViewChild('bookingStartElement')
  bookingStartElement: ElementRef;

  @ViewChild('bookingEndElement')
  bookingEndElement: ElementRef;
}
