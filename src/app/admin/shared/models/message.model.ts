import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
