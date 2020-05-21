import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  public position = 0;
  public innerWidth: number;
  private interval: number;
  private isAnimating: boolean;

  constructor() {
    this.isAnimating = false;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.interval = window.setInterval(() => {
      if (this.position < 3) {
        this.goToImage(this.position + 1);
      } else {
        this.goToImage(0);
      }
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  goToImage(id) {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.position = id;
      setTimeout(() => {
        this.isAnimating = false;
      }, 1000);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    console.log('width: ', this.innerWidth);
  }
}
