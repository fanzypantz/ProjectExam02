import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
  styleUrls: ['./posts-details.component.scss'],
})
export class PostsDetailsComponent implements OnInit, OnDestroy {
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
