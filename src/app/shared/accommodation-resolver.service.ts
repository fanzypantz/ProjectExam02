import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Establishment } from '../admin/shared/models/establisment.model';
import { Enquiry } from '../admin/shared/models/enquiry.model';

@Injectable({
  providedIn: 'root',
})
export class AccommodationResolverService implements Resolve<any> {
  private establishments: Observable<Establishment[]>;
  private enquiries: Observable<Enquiry[]>;
  private establishmentsData: Establishment[];
  private enquiriesData: Enquiry[];
  private area: any;
  private checkIn: number;
  private checkOut: number;
  private adults: string;
  private rooms: string;

  constructor(private afs: AngularFirestore) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.area = route.queryParams.area;
    this.checkIn = Date.parse(route.queryParams.checkIn);
    this.checkOut = Date.parse(route.queryParams.checkIn);
    this.adults = route.queryParams.adults;
    this.rooms = route.queryParams.rooms;

    // Firebase has no great filtering that is similar to SQL
    // There are probably better ways of doing this, but this is quick and easy
    // hardcoded filtering on client-side.
    // Get all establishments and its data
    return await this.getEstablishments();
  }

  getEstablishments() {
    return new Promise((resolve) => {
      this.establishments = this.afs
        .collection<Establishment>('establishments')
        .valueChanges({ idField: 'id' });
      this.establishments.subscribe((establishmentsSnapshot) => {
        this.establishmentsData = establishmentsSnapshot;
        if (this.checkIfQueryExists()) {
          // Get all enquiries
          this.enquiries = this.afs
            .collection<Enquiry>('enquiries')
            .valueChanges({ idField: 'id' });
          this.enquiries.subscribe((enquiriesSnapshot) => {
            this.enquiriesData = enquiriesSnapshot;
            // Filter the data and assign it to an array of Establishments that can be displayed
            // First check if the user came to this page with an already filled in form
            return resolve(
              this.filterData(this.establishmentsData, this.enquiriesData)
            );
          });
        } else {
          return resolve(this.establishmentsData);
        }
      });
    });
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
