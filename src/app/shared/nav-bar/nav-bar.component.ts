import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PageTransitionsService } from '../page-transitions.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public pageTransition: PageTransitionsService
  ) {}

  ngOnInit(): void {}
}
