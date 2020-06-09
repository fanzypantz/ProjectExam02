import { Component, OnInit } from '@angular/core';
import { PageTransitionsService } from '../shared/page-transitions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private pageTransition: PageTransitionsService) {}

  ngOnInit(): void {
    this.pageTransition.toggleOpenClose(250);
  }
}
