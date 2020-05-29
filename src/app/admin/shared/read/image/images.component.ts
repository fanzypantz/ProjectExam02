import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-image',
  template: ` <img class="admin-form-img-small" [src]="image" alt="" /> `,
  styleUrls: ['./images.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() image: Array<string>;

  constructor() {}

  ngOnInit(): void {}
}
