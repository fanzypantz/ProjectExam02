import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class CanReadGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map((user) => user && this.auth.canRead(user)),
      tap((canView) => {
        if (!canView) {
          console.log('Access Denied. Must have permission to read this.');
        }
      })
    );
  }
}
