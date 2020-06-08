import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Establishment } from '../admin/shared/models/establisment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PageTransitionsService } from '../shared/page-transitions.service';
import 'firebase/firestore';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss'],
})
export class AccommodationsComponent implements OnInit, OnDestroy {
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
  ) {}

  ngOnInit(): void {
    this.searchResults = this.route.snapshot.data.collections;
    this.pageTransition.toggleOpenClose(0);
  }

  ngOnDestroy(): void {}
}
