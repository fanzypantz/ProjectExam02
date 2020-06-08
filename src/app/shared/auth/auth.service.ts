import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Firebase imports
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../admin/shared/models/user.model';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { PageTransitionsService } from '../page-transitions.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Main user variable for the app
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private pageTransition: PageTransitionsService
  ) {
    // Get the user from firebase
    this.user$ = this.afAuth.authState.pipe(
      // If the user exists, find the firebase database entry for this user
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignIn(redirect?: string) {
    // Use google to sign in, shouldn't be hard to add more
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    if (redirect) {
      this.pageTransition.navigate(redirect);
    } else {
      this.pageTransition.navigate('/');
    }
  }

  async signOut() {
    // Call the auth api to log out and navigate to index again
    await this.afAuth.signOut();
    return this.pageTransition.navigate('/');
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    // Default data
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        customer: true,
      },
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
    };

    // Update the data on firebase server, merge: true will just update instead
    // of overwriting the data
    return userRef.set(data, { merge: true });
  }

  // Role methods
  // Check if the current user has the correct roles assigned for access
  // Simply by checking if the role field in the document match
  canRead(user: User): boolean {
    // Everyone can read
    const allowed = ['admin', 'editor', 'customer'];
    return this.checkAuth(user, allowed);
  }

  canEdit(user: User): boolean {
    // Only admins and editors can edit
    const allowed = ['admin', 'editor'];
    return this.checkAuth(user, allowed);
  }

  isAdmin(user: User): boolean {
    // Only admins can delete, hence the different name of method
    // Method is used often to check if user is admin instead of if it can delete
    const allowed = ['admin'];
    return this.checkAuth(user, allowed);
  }

  checkAuth(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}
