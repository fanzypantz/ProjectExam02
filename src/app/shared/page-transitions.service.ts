import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
  isOpen$: boolean;
  isDisplayable$: boolean;
  isAnimating$: boolean;
  delay: number;

  constructor(private router: Router) {
    this.isOpen$ = false;
    this.isDisplayable$ = false;
    this.isAnimating$ = false;
    this.delay = 0;
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

  public navigate(route: string, options?: OptionsInterface): void {
    if (this.router.url !== route) {
      this.toggleOpenClose(0);
      setTimeout(() => {
        if (options) {
          if (options.id) {
            this.router.navigate([route, options.id]);
          } else if (
            options.queryParams &&
            !this.router.url.includes(options.queryParams.model)
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
