import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Post } from '../../admin/shared/models/post.model';

@Component({
  selector: 'app-home-posts',
  templateUrl: './home-posts.component.html',
  styleUrls: ['./home-posts.component.scss'],
})
export class HomePostsComponent implements OnInit, OnDestroy {
  private documentSubscription: Subscription;
  document: Observable<Array<Post>>;
  data: any;

  constructor(private afs: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    this.document = this.afs
      .collection<Post>('posts', (ref) => ref.limit(4))
      .valueChanges({ idField: 'id' });
    this.documentSubscription = this.document.subscribe((snapshot) => {
      this.data = snapshot;
    });
  }

  ngOnDestroy(): void {
    this.documentSubscription.unsubscribe();
  }

  goTo(id) {
    this.router.navigate(['/post', id]);
  }
}
