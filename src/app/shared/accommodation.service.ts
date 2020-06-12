import { Injectable } from '@angular/core';
import { Establishment } from '../admin/shared/models/establisment.model';
import { Reservation } from '../admin/shared/models/reservation.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private establishments: Observable<Establishment[]>;
  private reservations: Observable<Reservation[]>;
  private establishmentsData: Establishment[];
  private reservationsData: Reservation[];

  constructor(private afs: AngularFirestore) {}

  getEstablishments(params) {
    return new Promise((resolve) => {
      // filter the establishments that have enough open rooms
      this.establishments = this.afs
        .collection<Establishment>('establishments', (ref) =>
          ref.where('maxGuests', '>', parseInt(params.adults, 10))
        )
        .valueChanges({ idField: 'id' });
      this.establishments.subscribe((establishmentsSnapshot) => {
        this.establishmentsData = establishmentsSnapshot;
        if (this.checkIfQueryExists(params)) {
          // Get all reservations
          this.reservations = this.afs
            .collection<Reservation>('reservations')
            .valueChanges({ idField: 'id' });
          this.reservations.subscribe((reservationsSnapshot) => {
            this.reservationsData = reservationsSnapshot;
            // Filter the data and assign it to an array of Establishments that can be displayed
            // First check if the user came to this page with an already filled in form
            return resolve(
              this.filterData(
                this.establishmentsData,
                this.reservationsData,
                params
              )
            );
          });
        } else {
          return resolve(this.establishmentsData);
        }
      });
    });
  }

  filterData(
    establishments: Establishment[],
    reservations: Reservation[],
    params
  ) {
    if (establishments && reservations) {
      const filtered = establishments.filter((el) => {
        return (
          el.area.toLowerCase() === params.area.toLowerCase() &&
          this.checkBooking(el, reservations, params)
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

  checkBooking(el: Establishment, reservations: Reservation[], params) {
    const reservationFilter = reservations.filter((reservation) => {
      return el.id === reservation.establishmentId;
    });

    if (reservationFilter.length > 0) {
      const bookingStart = reservationFilter[0].bookingStart.toMillis();
      const bookingEnd = reservationFilter[0].bookingEnd.toMillis();

      // If the checkOut date is within the range of the already booked time frame return false
      if (params.checkOut > bookingStart && params.checkOut < bookingEnd) {
        return false;
      }
      // If the checkIn date is within the range of the already booked time frame return false
      if (params.checkIn < bookingEnd && params.checkIn > bookingStart) {
        return false;
      }
    }
    return true;
  }

  checkIfQueryExists(params) {
    return !!(
      params.area &&
      params.checkIn &&
      params.checkOut &&
      params.adults &&
      params.rooms
    );
  }
}
