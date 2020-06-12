import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface Establishment {
  id: string;
  establishmentName: string;
  establishmentEmail: string;
  area: string;
  imageUrl: string[];
  price: number;
  maxGuests: number;
  rating: number;
  location: firebase.firestore.GeoPoint;
  description: string;
  selfCatering: boolean;
  highlight: boolean;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  booking?: {
    // reservationId: string;
    bookingStart: firebase.firestore.Timestamp;
    bookingEnd: firebase.firestore.Timestamp;
  }[];
}
