import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface Enquiry {
  id: string;
  establishmentId: string;
  name: string;
  email: string;
  rooms: number;
  persons: number;
  bookingStart: firebase.firestore.Timestamp;
  bookingEnd: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
