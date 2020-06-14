import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface Post {
  id: string;
  title: string;
  text: string;
  imageDetails: string;
  imageUrl: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
