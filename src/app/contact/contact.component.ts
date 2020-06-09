import { Component, OnInit } from '@angular/core';
import { PageTransitionsService } from '../shared/page-transitions.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private pageTransition: PageTransitionsService) {}

  ngOnInit(): void {
    this.pageTransition.toggleOpenClose(250);
  }
}
