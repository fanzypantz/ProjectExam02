import { Component, OnInit } from '@angular/core';
import { PageTransitionsService } from '../shared/page-transitions.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';
import { Enquiry } from '../admin/shared/models/enquiry.model';
import { User } from '../admin/shared/models/user.model';
import { Establishment } from '../admin/shared/models/establisment.model';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.scss'],
})
export class EnquiriesComponent implements OnInit {
  private userSubscription: Subscription;
  private enquiriesSubscription: Subscription;
  private collections: Observable<Enquiry[]>;
  public data: Enquiry[];
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
        .collection<Enquiry>('enquiries', (ref) =>
          ref.where('email', '==', this.user.email)
        )
        .valueChanges({ idField: 'id' });

      this.enquiriesSubscription = this.collections.subscribe((snapshot) => {
        console.log('snapshot: ', snapshot);
        this.data = snapshot;
        this.pageTransition.toggleOpenClose(0);
      });
    });
  }

  formatDate(date) {
    return `${date.getYear()}-${date.getMonth()}-${date.getDay()}`;
  }
}
