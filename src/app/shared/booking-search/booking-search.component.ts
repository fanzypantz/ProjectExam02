import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, SubscriptionLike } from 'rxjs';
import { Establishment } from '../../admin/shared/models/establisment.model';
import { Router } from '@angular/router';
import { PageTransitionsService } from '../page-transitions.service';

@Component({
  selector: 'app-booking-search',
  templateUrl: './booking-search.component.html',
  styleUrls: ['./booking-search.component.scss'],
})
export class BookingSearchComponent implements OnInit, OnDestroy {
  @Input() areaInput: string;
  @Input() checkInInput: number;
  @Input() checkOutInput: number;
  @Input() adultsInput: string;
  @Input() roomsInput: string;

  private collections: Observable<Establishment[]>;
  private documentSubscription: SubscriptionLike;
  public bookingForm: FormGroup;
  private data: Establishment[];
  public matchingAreas: Establishment[];
  public showSearch: boolean;
  public checkInDateRender: string;
  public checkOutDateRender: string;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private formBuilder: FormBuilder,
    private pageTransition: PageTransitionsService
  ) {
    this.showSearch = false;
  }

  ngOnInit(): void {
    // Does not look like default date on the default HTML input works
    this.checkInDateRender = '';
    this.checkOutDateRender = '';

    if (this.checkInInput) {
      this.checkInDateRender = this.formatDate(new Date(this.checkInInput));
    }

    if (this.checkOutInput) {
      this.checkOutDateRender = this.formatDate(new Date(this.checkOutInput));
    }

    this.bookingForm = this.formBuilder.group({
      area: this.areaInput || '',
      checkIn: this.checkInDateRender,
      checkOut: this.checkOutDateRender,
      roomData: this.formBuilder.group({
        adults: parseInt(this.adultsInput, 10) || 2,
        rooms: parseInt(this.roomsInput, 10) || 1,
      }),
    });

    this.onChanges();

    this.collections = this.afs
      .collection<Establishment>('establishments')
      .valueChanges({ idField: 'id' });

    this.documentSubscription = this.collections.subscribe((snapshot) => {
      this.data = snapshot;
    });
  }

  ngOnDestroy(): void {
    this.documentSubscription.unsubscribe();
  }

  formatDate(inputDate): string {
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  searchByString(query: string) {
    // For now just filter all the establishments directly by the string,
    // This is the most basic kind of search and it has to match exactly.
    if (query !== '' && this.data !== undefined) {
      // Get all the area names
      const newSearch = this.data.filter((el) => {
        return el.area.toLowerCase().includes(query.toLowerCase());
      });
      // Remove duplicates
      const unique = [
        ...new Map(newSearch.map((item) => [item.area, item])).values(),
      ];
      // Sort alphabetically
      return unique.sort((a, b) => {
        return a.area < b.area ? -1 : 1;
      });
    } else {
      return [];
    }
  }

  onChanges() {
    this.bookingForm.get('area').valueChanges.subscribe((val) => {
      // show the dropdown menu every time the player types
      this.showSearch = true;
      this.matchingAreas = this.searchByString(val);
      setTimeout(() => {
        // remove the dropdown menu after x seconds
        this.showSearch = false;
      }, 10000);
    });
  }

  onSubmit(data) {
    const bookingStartDate = this.bookingStartElement.nativeElement.valueAsDate;
    const bookingEndDate = this.bookingEndElement.nativeElement.valueAsDate;

    if (bookingStartDate > bookingEndDate) {
      this.bookingForm.controls.checkIn.setErrors({ startDate: true });
    }

    if (this.bookingForm.get('checkIn').value === '') {
      this.bookingForm.controls.checkIn.setErrors({ incorrect: true });
    }

    if (this.bookingForm.get('checkOut').value === '') {
      this.bookingForm.controls.checkOut.setErrors({ incorrect: true });
    }

    if (this.bookingForm.valid) {
      this.pageTransition.navigate('/accommodations', {
        queryParams: {
          page: 1,
          area: data.area,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          adults: data.roomData.adults,
          rooms: data.roomData.rooms,
        },
      });
    }
  }

  onAreaClick(area: string) {
    this.bookingForm.patchValue({ area });
  }

  get area() {
    return this.bookingForm.get('area');
  }

  get checkIn() {
    return this.bookingForm.get('checkIn');
  }

  get checkOut() {
    return this.bookingForm.get('checkOut');
  }

  @ViewChild('bookingStartElement')
  bookingStartElement: ElementRef;

  @ViewChild('bookingEndElement')
  bookingEndElement: ElementRef;
}
