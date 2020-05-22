import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Establishment } from '../../admin/shared/models/establisment.model';

@Component({
  selector: 'app-home-deals',
  templateUrl: './home-deals.component.html',
  styleUrls: ['./home-deals.component.scss'],
})
export class HomeDealsComponent implements OnInit, OnDestroy {
  private documentSubscription: Subscription;
  document: Observable<Array<Establishment>>;
  data: any;

  constructor(private afs: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    this.document = this.afs
      .collection<Establishment>('establishments', (ref) =>
        ref.where('highlight', '==', true)
      )
      .valueChanges({ idField: 'id' });
    this.documentSubscription = this.document.subscribe((snapshot) => {
      this.data = snapshot;
    });
  }

  ngOnDestroy(): void {
    this.documentSubscription.unsubscribe();
  }

  goTo(id) {
    this.router.navigate(['/accommodation-details', id]);
  }
}