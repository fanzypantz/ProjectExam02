import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  public position = 0;
  public innerWidth: any;
  private interval: number;

  constructor() {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.interval = window.setInterval(() => {
      if (this.position < 3) {
        this.position++;
      } else {
        this.position = 0;
      }
    }, 10000);
  }

  goToImage(id) {
    this.position = id;
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
