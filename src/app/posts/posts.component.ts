import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageTransitionsService } from '../shared/page-transitions.service';

import { Post } from '../admin/shared/models/post.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  private documentSubscription: Subscription;
  private document: Observable<Array<Post>>;
  public data: Array<Post>;

  constructor(
    private route: ActivatedRoute,
    public pageTransition: PageTransitionsService
  ) {}

  ngOnInit(): void {
    this.document = this.route.snapshot.data.collections;
    this.documentSubscription = this.document.subscribe((data) => {
      this.data = data;
      this.pageTransition.toggleOpenClose(0);
    });
  }

  ngOnDestroy(): void {
    this.documentSubscription.unsubscribe();
  }
}
