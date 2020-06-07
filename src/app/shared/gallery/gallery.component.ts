import {
  Component,
  Input,
  ElementRef,
  OnInit,
  ViewChild,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-gallery',
  template: `
    <div #galleryContainer class="gallery-container">
      <div
        class="gallery-images"
        [ngStyle]="{
          transform: 'translateX(-' + position * containerWidth + 'px)'
        }"
      >
        <img
          [ngStyle]="{
            height: containerHeight + 'px',
            width: containerWidth + 'px'
          }"
          *ngFor="let image of images"
          [src]="image"
          alt=""
        />
      </div>
    </div>
    <div *ngIf="images.length > 1" class="gallery-control">
      <svg
        *ngFor="let n of images; index as i"
        (click)="goToImage(i)"
        class="gallery-control-line"
        [class.gallery-control-line-active]="position === i"
        viewBox="0 0 53.9 10"
      >
        <g transform="matrix(1, 0, 0, 1, 0, 0)">
          <line id="Line_7-2_1_" class="st0" x1="5" y1="5" x2="48.9" y2="5" />
        </g>
      </svg>
    </div>
  `,
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() images: string[];
  public position = 0;
  public containerWidth: number;
  public containerHeight: number;
  private interval: number;
  private isAnimating: boolean;

  constructor() {
    this.containerHeight = 270;
    this.containerWidth = 566;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.containerHeight = this.galleryContainer.nativeElement.offsetHeight;
      this.containerWidth = this.galleryContainer.nativeElement.offsetWidth;
    });

    if (this.images.length > 1) {
      this.interval = window.setInterval(() => {
        if (this.position < this.images.length - 1) {
          this.goToImage(this.position + 1);
        } else {
          this.goToImage(0);
        }
      }, 10000);
    }
  }

  @ViewChild('galleryContainer')
  galleryContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.containerHeight = this.galleryContainer.nativeElement.offsetHeight;
    this.containerWidth = this.galleryContainer.nativeElement.offsetWidth;
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
}
