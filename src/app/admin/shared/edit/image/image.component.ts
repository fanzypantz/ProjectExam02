import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-image',
  template: `
    <div class="admin-edit-card-container">
      <p>
        image works!
      </p>
    </div>
  `,
  styleUrls: ['../edit.component.scss'],
  styles: [],
})
export class EditImageComponent implements OnInit {
  @Input() image: string;

  constructor() {}

  ngOnInit(): void {}
}
