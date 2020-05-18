import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Establishment } from '../../admin/shared/models/establisment.model';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],
})
export class DealsComponent implements OnInit, OnDestroy {
  private documentSubscription: Subscription;
  document: Observable<Array<Establishment>>;
  data: any;

  constructor(private afs: AngularFirestore) {}

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
}
