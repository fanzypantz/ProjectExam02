import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Establishment } from '../admin/shared/models/establisment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PageTransitionsService } from '../shared/page-transitions.service';
import 'firebase/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss'],
})
export class AccommodationsComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;
  public area: string;
  public checkIn: number;
  public checkOut: number;
  public adults: string;
  public rooms: string;
  public searchResults: Establishment[];

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    public pageTransition: PageTransitionsService
  ) {
    this.paramSub = route.queryParams.subscribe((p) => {
      // Get all data from the query string
      this.area = p.area;
      this.checkIn = Date.parse(p.checkIn);
      this.checkOut = Date.parse(p.checkOut);
      this.adults = p.adults;
      this.rooms = p.rooms;
    });
  }

  ngOnInit(): void {
    this.searchResults = this.route.snapshot.data.collections;
    this.pageTransition.toggleOpenClose(0);
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }
}
