import { Component, OnInit } from '@angular/core';
import { PageTransitionsService } from '../shared/page-transitions.service';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Post } from '../admin/shared/models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  private documentSubscription: Subscription;
  private document: Observable<Array<Post>>;
  public data: Array<Post>;

  constructor(
    private afs: AngularFirestore,
    public pageTransition: PageTransitionsService
  ) {}

  ngOnInit(): void {
    this.document = this.afs
      .collection<Post>('posts')
      .valueChanges({ idField: 'id' });
    this.documentSubscription = this.document.subscribe((snapshot) => {
      this.pageTransition.toggleOpenClose(500);
      this.data = snapshot;
    });
  }
}
