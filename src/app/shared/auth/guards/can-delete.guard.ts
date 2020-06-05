import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { tap, map, take } from 'rxjs/operators';
import { PageTransitionsService } from '../../page-transitions.service';

@Injectable()
export class CanDeleteGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private pageTransition: PageTransitionsService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map((user) => user && user.roles.admin),
      tap((isAdmin) => {
        if (!isAdmin) {
          this.pageTransition.navigate('/');
        }
      })
    );
  }
}
