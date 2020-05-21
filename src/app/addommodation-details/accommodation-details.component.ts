import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.scss'],
})
export class AccommodationDetailsComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;
  id: string;

  constructor(private route: ActivatedRoute) {
    this.paramSub = route.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }
}
