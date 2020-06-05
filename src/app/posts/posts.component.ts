import { Component, OnInit } from '@angular/core';
import { PageTransitionsService } from '../shared/page-transitions.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private pageTransition: PageTransitionsService) {}

  ngOnInit(): void {
    this.pageTransition.toggleOpenClose(500);
  }
}
