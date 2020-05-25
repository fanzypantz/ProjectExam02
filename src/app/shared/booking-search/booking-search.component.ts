import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, SubscriptionLike } from 'rxjs';
import { Establishment } from '../../admin/shared/models/establisment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-search',
  templateUrl: './booking-search.component.html',
  styleUrls: ['./booking-search.component.scss'],
})
export class BookingSearchComponent implements OnInit, OnDestroy {
  private collections: Observable<Establishment[]>;
  private documentSubscription: SubscriptionLike;
  private bookingForm: FormGroup;
  private data: Establishment[];
  private matchingAreas: Establishment[];
  private showSearch: boolean;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.showSearch = false;

    this.bookingForm = this.formBuilder.group({
      area: '',
      checkIn: '',
      checkOut: '',
      roomData: this.formBuilder.group({
        adults: 2,
        rooms: 1,
      }),
    });
  }

  ngOnInit(): void {
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
    console.log('data: ', data);
    if (this.bookingForm.valid) {
      this.router.navigate(['/accommodations'], {
        queryParams: {
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
    this.bookingForm.patchValue({ area: area });
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
}
