import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PageTransitionsService } from '../page-transitions.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() isMobile: boolean;
  private isAnimating: boolean;
  public hideMenu: boolean;

  constructor(
    public auth: AuthService,
    public pageTransition: PageTransitionsService
  ) {}

  ngOnInit(): void {
    this.hideMenu = this.isMobile;
  }

  toggleMenu() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.hideMenu = !this.hideMenu;
      setTimeout(() => {
        this.isAnimating = false;
      }, 250);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.hideMenu = window.innerWidth < 768;
  }
}
