import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss'],
})
export class AccommodationsComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;
  public area: string;
  public checkIn: string;
  public checkOut: string;
  public adults: string;
  public rooms: string;

  constructor(private route: ActivatedRoute) {
    this.paramSub = route.queryParams.subscribe((p) => {
      // Get all data from the query string
      this.area = p.area;
      this.checkIn = p.checkIn;
      this.checkOut = p.checkOut;
      this.adults = p.adults;
      this.rooms = p.rooms;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }
}
