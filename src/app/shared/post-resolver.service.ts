import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../admin/shared/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostResolverService implements Resolve<any> {
  private collections: Observable<Post[]>;
  constructor(private afs: AngularFirestore) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      this.collections = this.afs
        .collection<Post>('posts')
        .valueChanges({ idField: 'id' });
      if (this.collections) {
        return resolve(this.collections);
      } else {
        return reject('Could not get collections');
      }
    });
  }
}
