import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Enquiry } from './models/enquiry.model';
import { Message } from './models/message.model';
import { Post } from './models/post.model';
import { User } from './models/user.model';
import { Establishment } from './models/establisment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminResolverService implements Resolve<any> {
  private collections:
    | Observable<Enquiry[]>
    | Observable<Message[]>
    | Observable<Post[]>
    | Observable<User[]>
    | Observable<Establishment[]>;
  constructor(private afs: AngularFirestore) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const model = route.queryParams.model;
    const mode = route.queryParams.mode;

    if (mode === 'read') {
      return new Promise((resolve) => {
        return resolve(this.getCollection(model));
      });
    } else {
      return undefined;
    }
  }

  getCollection(model) {
    // Use the queryParam and Model to force type declaration in the document
    // No invalid data can be displayed
    switch (model) {
      case 'enquiries':
        return this.afs
          .collection<Enquiry>(model)
          .valueChanges({ idField: 'id' });
      case 'messages':
        return this.afs
          .collection<Message>(model)
          .valueChanges({ idField: 'id' });
      case 'posts':
        return this.afs.collection<Post>(model).valueChanges({ idField: 'id' });
      case 'users':
        return this.afs.collection<User>(model).valueChanges();
      default:
        return this.afs
          .collection<Establishment>(model)
          .valueChanges({ idField: 'id' });
    }
  }
}
