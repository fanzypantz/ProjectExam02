import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  user;

  // subscribe to the user value in the auth service as it is an observable
  constructor(public auth: AuthService) {
    this.auth.user$.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}
}
