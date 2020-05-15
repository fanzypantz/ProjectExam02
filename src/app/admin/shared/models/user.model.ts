import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface Roles {
  customer?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  roles: Roles;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
