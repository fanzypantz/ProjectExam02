import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Establishment } from '../admin/shared/models/establisment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PageTransitionsService } from '../shared/page-transitions.service';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: [
    '../accommodations/accommodations.component.scss',
    './accommodation-details.component.scss',
  ],
})
export class AccommodationDetailsComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;
  private documentSubscription: Subscription;
  id: string;
  private accommodation: Observable<Establishment>;
  public data: Establishment;
  public zoom = 12;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private pageTransition: PageTransitionsService
  ) {
    this.paramSub = route.params.subscribe((p) => {
      this.id = p.id;

      // @ts-ignore
      this.accommodation = this.afs
        .collection<Establishment>('establishments')
        .doc(this.id)
        .valueChanges();

      this.documentSubscription = this.accommodation.subscribe((snapshot) => {
        this.pageTransition.toggleOpenClose(0);
        this.data = snapshot;
      });
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }
}
