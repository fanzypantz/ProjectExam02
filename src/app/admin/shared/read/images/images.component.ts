import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-images',
  template: `
    <img
      class="admin-form-img-small"
      *ngFor="let image of images"
      [src]="image"
      alt=""
    />
  `,
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  @Input() images: Array<string>;

  constructor() {}

  ngOnInit(): void {}
}
