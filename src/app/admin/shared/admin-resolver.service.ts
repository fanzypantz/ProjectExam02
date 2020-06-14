import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reservation } from './models/reservation.model';
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
    | Observable<Reservation[]>
    | Observable<Message[]>
    | Observable<Post[]>
    | Observable<User[]>
    | Observable<Establishment[]>;
  constructor(private afs: AngularFirestore) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const model = route.queryParams.model;
    const mode = route.queryParams.mode;

    if (mode === 'read') {
      return new Promise((resolve, reject) => {
        this.collections = this.getCollection(model);
        if (this.collections) {
          return resolve(this.collections);
        } else {
          return reject('Could not get collections');
        }
      });
    } else {
      return undefined;
    }
  }

  getCollection(model) {
    // Use the queryParam and Model to force type declaration in the document
    // No invalid data can be displayed
    switch (model) {
      case 'reservations':
        return this.afs
          .collection<Reservation>(model, (ref) => ref.orderBy('updatedAt'))
          .valueChanges({ idField: 'id' });
      case 'messages':
        return this.afs
          .collection<Message>(model, (ref) => ref.orderBy('updatedAt'))
          .valueChanges({ idField: 'id' });
      case 'posts':
        return this.afs
          .collection<Post>(model, (ref) => ref.orderBy('updatedAt'))
          .valueChanges({ idField: 'id' });
      case 'users':
        return this.afs
          .collection<User>(model, (ref) => ref.orderBy('displayName'))
          .valueChanges();
      default:
        return this.afs
          .collection<Establishment>(model, (ref) => ref.orderBy('updatedAt'))
          .valueChanges({ idField: 'id' });
    }
  }
}
