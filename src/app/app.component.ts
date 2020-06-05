import { Component } from '@angular/core';
import { PageTransitionsService } from './shared/page-transitions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Visit Bergen';
  constructor(public pageTransition: PageTransitionsService) {}
}
