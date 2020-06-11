import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { adminConfig } from '../admin/admin.config';
import { Subscription } from 'rxjs';

interface OptionsInterface {
  queryParams?: {
    id?: string;
    page?: number;
    area?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    rooms?: number;
    model?: string;
    mode?: string;
  };
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PageTransitionsService {
  private paramSub: Subscription;
  isOpen$: boolean;
  isDisplayable$: boolean;
  isAnimating$: boolean;
  delay: number;
  private model: string;
  private mode: string;
  private id: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.isOpen$ = false;
    this.isDisplayable$ = false;
    this.isAnimating$ = false;
    this.delay = 0;

    this.paramSub = route.queryParams.subscribe((p) => {
      this.model = p.model;
      this.mode = p.mode;
      this.id = p.id;
    });
  }

  public toggleOpenClose(delay) {
    if (!this.isAnimating$ && this.isDisplayable$) {
      this.isAnimating$ = true;
      setTimeout(() => {
        this.isAnimating$ = false;
        this.isOpen$ = !this.isOpen$;
      }, delay);
    }
  }

  // This function is completely redundant until the pageTransition is working
  public navigate(route: string, options?: OptionsInterface): void {
    if (this.router.url !== route) {
      this.toggleOpenClose(0);
      setTimeout(() => {
        if (options) {
          if (options.id) {
            this.router.navigate([route, options.id]);
          } else if (
            options.queryParams &&
            (this.model !== options.queryParams.model ||
              this.mode !== options.queryParams.mode ||
              options.queryParams)
          ) {
            this.router.navigate([route], {
              queryParams: options.queryParams,
            });
          }
        } else {
          this.router.navigate([route]);
        }
      }, this.delay);
    }
  }
}
