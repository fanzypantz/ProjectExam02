import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Establishment } from '../admin/shared/models/establisment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Enquiry } from '../admin/shared/models/enquiry.model';
import { PageTransitionsService } from '../shared/page-transitions.service';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { log } from 'util';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss'],
})
export class AccommodationsComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;
  private establishmentSub: Subscription;
  private enquiriesSub: Subscription;
  public area: string;
  public checkIn: number;
  public checkOut: number;
  public adults: string;
  public rooms: string;
  private establishments: Observable<Establishment[]>;
  private enquiries: Observable<Enquiry[]>;
  private establishmentsData: Establishment[];
  private enquiriesData: Enquiry[];
  public searchResults: Establishment[];

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    public pageTransition: PageTransitionsService
  ) {
    this.paramSub = route.queryParams.subscribe((p) => {
      // Get all data from the query string
      this.area = p.area;
      this.checkIn = Date.parse(p.checkIn);
      this.checkOut = Date.parse(p.checkOut);
      this.adults = p.adults;
      this.rooms = p.rooms;

      if (
        this.establishmentsData &&
        this.enquiriesData &&
        this.checkIfQueryExists()
      ) {
        this.searchResults = this.filterData(
          this.establishmentsData,
          this.enquiriesData
        );
      } else {
        this.searchResults = this.establishmentsData;
      }
    });
  }

  ngOnInit(): void {
    // Firebase has no great filtering that is similar to SQL
    // There are probably better ways of doing this, but this is quick and easy
    // hardcoded filtering on client-side.
    // Get all establishments and its data
    this.establishments = this.afs
      .collection<Establishment>('establishments')
      .valueChanges({ idField: 'id' });
    this.establishmentSub = this.establishments.subscribe(
      (establishmentsSnapshot) => {
        this.establishmentsData = establishmentsSnapshot;
        if (this.checkIfQueryExists()) {
          // Get all enquiries
          this.enquiries = this.afs
            .collection<Enquiry>('enquiries')
            .valueChanges({ idField: 'id' });
          this.enquiriesSub = this.enquiries.subscribe((enquiriesSnapshot) => {
            this.enquiriesData = enquiriesSnapshot;
            // Filter the data and assign it to an array of Establishments that can be displayed
            // First check if the user came to this page with an already filled in form
            this.searchResults = this.filterData(
              this.establishmentsData,
              this.enquiriesData
            );
            this.pageTransition.toggleOpenClose(0);
          });
        } else {
          this.pageTransition.toggleOpenClose(0);
          this.searchResults = this.establishmentsData;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.establishmentSub.unsubscribe();
  }

  filterData(establishments: Establishment[], enquiries: Enquiry[]) {
    if (establishments && enquiries) {
      const filtered = establishments.filter((el) => {
        return (
          el.area.toLowerCase() === this.area.toLowerCase() &&
          this.checkBooking(el, enquiries)
        );
      });

      // If there are no matching accommodations just return them all
      if (filtered.length > 0) {
        return filtered;
      } else {
        return establishments;
      }
    }
  }

  checkBooking(el: Establishment, enquiries: Enquiry[]) {
    const enquiryFilter = enquiries.filter((enquiry) => {
      return el.id === enquiry.establishmentId;
    });

    if (enquiryFilter.length > 0) {
      const bookingStart = enquiryFilter[0].bookingStart.toMillis();
      const bookingEnd = enquiryFilter[0].bookingEnd.toMillis();

      // If the checkOut date is within the range of the already booked time frame return false
      if (this.checkOut > bookingStart && this.checkOut < bookingEnd) {
        return false;
      }
      // If the checkIn date is within the range of the already booked time frame return false
      if (this.checkIn < bookingEnd && this.checkIn > bookingStart) {
        return false;
      }
    }
    return true;
  }

  checkIfQueryExists() {
    return !!(
      this.area &&
      this.checkIn &&
      this.checkOut &&
      this.adults &&
      this.rooms
    );
  }
}
