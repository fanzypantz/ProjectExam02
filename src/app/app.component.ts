import { Component, HostListener } from '@angular/core';
import { PageTransitionsService } from './shared/page-transitions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isMobile: boolean;
  private innerWidth: number;

  title = 'Visit Bergen';
  constructor(public pageTransition: PageTransitionsService) {
    this.innerWidth = window.innerWidth;
    this.isMobile = this.innerWidth <= 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.isMobile = this.innerWidth <= 768;
  }
}
