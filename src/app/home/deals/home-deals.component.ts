import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Establishment } from '../../admin/shared/models/establisment.model';
import { PageTransitionsService } from '../../shared/page-transitions.service';

@Component({
  selector: 'app-home-deals',
  templateUrl: './home-deals.component.html',
  styleUrls: ['./home-deals.component.scss'],
})
export class HomeDealsComponent implements OnInit, OnDestroy {
  private documentSubscription: Subscription;
  private document: Observable<Array<Establishment>>;
  public data: Array<Establishment>;
  public isMobile: boolean;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    public pageTransition: PageTransitionsService
  ) {}

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;

    // Was not able to order this by date even with an index in firebase
    this.document = this.afs
      .collection<Establishment>('establishments', (ref) =>
        ref.where('highlight', '==', true).limit(3)
      )
      .valueChanges({ idField: 'id' });
    this.documentSubscription = this.document.subscribe((snapshot) => {
      this.data = snapshot;
    });
  }

  ngOnDestroy(): void {
    this.documentSubscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }
}
