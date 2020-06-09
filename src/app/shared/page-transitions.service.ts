import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface OptionsInterface {
  queryParams?: {
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

  constructor(private router: Router) {
    this.isOpen$ = true;
    this.isDisplayable$ = true;
    this.isAnimating$ = false;
  }

  public toggleOpenClose(delay) {
    if (!this.isAnimating$) {
      this.isAnimating$ = true;
      setTimeout(() => {
        this.isAnimating$ = false;
        this.isOpen$ = !this.isOpen$;
      }, delay);
    }
  }

  public toggleDisplayable(delay) {
    if (!this.isAnimating$) {
      this.isAnimating$ = true;
      setTimeout(() => {
        this.isAnimating$ = false;
        this.isDisplayable$ = !this.isDisplayable$;
      }, delay);
    }
  }

  public navigate(route: string, options?: OptionsInterface): void {
    if (
      this.router.url !== route &&
      !this.router.url.includes(options.queryParams.model)
    ) {
      this.toggleOpenClose(0);
      setTimeout(() => {
        if (options) {
          if (options.id) {
            this.router.navigate([route, options.id]);
          } else if (options.queryParams) {
            this.router.navigate([route], {
              queryParams: options.queryParams,
            });
          }
        } else {
          this.router.navigate([route]);
        }
      }, 250);
    }
  }
}
