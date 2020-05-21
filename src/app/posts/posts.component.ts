import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
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
