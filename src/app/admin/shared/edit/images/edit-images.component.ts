import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-images',
  template: `
    <div class="admin-edit-card-container">
      <p>
        images works!
      </p>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditImagesComponent implements OnInit {
  @Input() images: string[];

  constructor() {}

  ngOnInit(): void {}
}
