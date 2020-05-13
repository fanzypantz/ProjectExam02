import * as firebase from 'firebase/app';

export interface Establishment {
  id: string;
  establishmentName: string;
  establishmentEmail: string;
  imageUrl: string[];
  price: number;
  maxGuests: number;
  rating: number;
  location: firebase.firestore.GeoPoint;
  description: string;
  selfCatering: boolean;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  bookingStart: firebase.firestore.Timestamp;
  bookingEnd: firebase.firestore.Timestamp;
}
