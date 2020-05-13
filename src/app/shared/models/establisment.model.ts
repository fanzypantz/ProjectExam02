import * as firebase from 'firebase/app';

export interface Establishment {
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
}
