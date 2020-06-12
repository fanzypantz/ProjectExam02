import { Component, OnInit } from '@angular/core';
import { PageTransitionsService } from '../shared/page-transitions.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';
import { Reservation } from '../admin/shared/models/reservation.model';
import { User } from '../admin/shared/models/user.model';
import { Establishment } from '../admin/shared/models/establisment.model';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  private userSubscription: Subscription;
  private reservationsSubscription: Subscription;
  private collections: Observable<Reservation[]>;
  public data: Reservation[];
  private user: User;

  constructor(
    private afs: AngularFirestore,
    private pageTransition: PageTransitionsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.auth.user$.subscribe((userSnapshot) => {
      this.user = userSnapshot;

      this.collections = this.afs
        .collection<Reservation>('reservations', (ref) =>
          ref.where('email', '==', this.user.email)
        )
        .valueChanges({ idField: 'id' });

      this.reservationsSubscription = this.collections.subscribe((snapshot) => {
        this.data = snapshot;
        this.pageTransition.toggleOpenClose(0);
      });
    });
  }

  formatDate(date) {
    return `${date.getYear()}-${date.getMonth()}-${date.getDay()}`;
  }
}
