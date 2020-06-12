import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageTransitionsService } from '../shared/page-transitions.service';
import { Post } from '../admin/shared/models/post.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
  styleUrls: ['./posts-details.component.scss'],
})
export class PostsDetailsComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;
  private postSubscription: Subscription;
  private postsSubscription: Subscription;
  id: string;
  private post: Observable<any>;
  private posts: Observable<Post[]>;
  public postData: Post;
  public postsData: Post[];

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    public pageTransition: PageTransitionsService
  ) {
    this.paramSub = route.params.subscribe((p) => {
      this.id = p.id;

      this.post = this.afs
        .collection<Post>('posts')
        .doc(this.id)
        .valueChanges();

      this.posts = this.afs
        .collection<Post>('posts', (ref) =>
          ref.orderBy('createdAt', 'desc').limit(3)
        )
        .valueChanges({ idField: 'id' });

      this.postSubscription = this.post.subscribe((snapshot) => {
        this.goUp();
        this.pageTransition.toggleOpenClose(0);
        this.postData = snapshot;
      });

      this.postsSubscription = this.posts.subscribe((snapshot) => {
        this.postsData = snapshot;
      });
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }

  goUp() {
    const element = document.querySelector('#nav');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
