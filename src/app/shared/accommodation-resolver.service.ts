import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Establishment } from '../admin/shared/models/establisment.model';
import { Reservation } from '../admin/shared/models/reservation.model';
import { AccommodationService } from './accommodation.service';

@Injectable({
  providedIn: 'root',
})
export class AccommodationResolverService implements Resolve<any> {
  private area: any;
  private checkIn: number;
  private checkOut: number;
  private adults: string;
  private rooms: string;

  constructor(private accommodationService: AccommodationService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.area = route.queryParams.area;
    this.checkIn = Date.parse(route.queryParams.checkIn);
    this.checkOut = Date.parse(route.queryParams.checkIn);
    this.adults = route.queryParams.adults;
    this.rooms = route.queryParams.rooms;
    if (!this.adults) {
      this.adults = '1';
    }
    // Firebase has no great filtering that is similar to SQL
    // There are probably better ways of doing this, but this is quick and easy
    // hardcoded filtering on client-side.
    // Get all establishments and its data
    return await this.accommodationService.getEstablishments({
      area: this.area,
      checkIn: this.checkIn,
      checkOut: this.checkIn,
      adults: this.adults,
      rooms: this.rooms,
    });
  }
}
