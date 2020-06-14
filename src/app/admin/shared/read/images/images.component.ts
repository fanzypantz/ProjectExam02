import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-images',
  template: `
    <div class="admin-form-img-small-container">
      <img
        class="admin-form-img-small"
        *ngFor="let image of images"
        [src]="image"
        alt=""
      />
    </div>
  `,
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  @Input() images: Array<string>;

  constructor() {}

  ngOnInit(): void {}
}
