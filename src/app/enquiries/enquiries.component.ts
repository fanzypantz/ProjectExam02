import { Component, OnInit } from '@angular/core';
import { PageTransitionsService } from '../shared/page-transitions.service';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.scss'],
})
export class EnquiriesComponent implements OnInit {
  constructor(private pageTransition: PageTransitionsService) {}

  ngOnInit(): void {
    this.pageTransition.toggleOpenClose(500);
  }
}
