import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PageTransitionsService } from '../page-transitions.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Input() isMobile: boolean;
  private paramSub: Subscription;
  private isAnimating: boolean;
  public hideMenu: boolean;

  constructor(
    public auth: AuthService,
    private router: Router,
    public pageTransition: PageTransitionsService
  ) {}

  ngOnInit(): void {
    this.paramSub = this.router.events.subscribe((p) => {
      if (this.isMobile) {
        this.hideMenu = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
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
